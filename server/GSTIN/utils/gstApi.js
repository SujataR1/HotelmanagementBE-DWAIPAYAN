const axios=require("axios");

const gstAPI=async(gst)=>{
const response = await axios.get(`https://cleartax.in/f/compliance-report/${gst}/`);
const ans = response.data;
console.log(ans);
}
module.exports={gstAPI};