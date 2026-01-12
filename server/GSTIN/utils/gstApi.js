const axios=require("axios");

const gstAPI=async(gst)=>{
const response = await axios.get(`https://cleartax.in/f/compliance-report/${gst}/`);
const ans = response.data;
//console.log(ans);
//console.log("Hello you have a good day");
//console.log(response);
return ans;
}
module.exports={gstAPI};