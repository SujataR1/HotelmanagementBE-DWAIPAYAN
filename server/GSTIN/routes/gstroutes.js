const express=require("express");
const router=express.Router();
const {validateGST}=require("../utils/gstValidator");
const {gstAPI} = require("../utils/gstApi");
const GST=require("../model/gstModel");
router.post("/check-gst", async(req, res) => {
  const {  email , gst } = req.body;

  const result = validateGST(gst);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: result.error
    });
  }

  try {
    // Get GST data
    const gstData = await gstAPI(gst);

    // Save to MongoDB
    const savedGST = await GST.create({
      email:email,
      gstin: gstData.taxpayerInfo.gstin,
      companyName: gstData.taxpayerInfo.lgnm,
      location: gstData.taxpayerInfo.stj,
      registrationdate: gstData.taxpayerInfo.rgdt,
      status: gstData.taxpayerInfo.sts,
      lastupdate: gstData.taxpayerInfo.lstupdt
    });

    console.log("Saved GST:", savedGST);

    // Fetch saved record
    const record = await GST.findOne({ email });

    if (record) {
      console.log(
        `GST ${record.gstin}, Location ${record.location}, Company ${record.companyName}`
      );
    }

    return res.status(200).json({
      success: true,
      message: "GST number is valid",
      data: gstData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch GST data",
      error: error.message
    });
  }
});

module.exports = router;
