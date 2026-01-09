const express=require("express");
const router=express.Router();
const {validateGST}=require("../utils/gstValidator");
const {gstAPI} = require("../utils/gstApi");
router.post("/check-gst", async(req, res) => {
  const { gst } = req.body;

  const result = validateGST(gst);
  // ✅ VALID GST
 if (result.valid) {
  try {
    // await the API call to get real data
    const gstData = await gstAPI(gst);

    console.log(gstData);  // ✅ This is the actual data now

    return res.status(200).json({
      data: gstData,       // actual API response
      success: true,
      message: "GST number is valid",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch GST data",
      error: error.message
    });
  }
}
 // ❌ INVALID GST
  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: result.error
    });
  }
});

module.exports = router;