import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";


const inquirySchema = new mongoose.Schema({
    user: { type: String, required: true },
    email:{type:String, required:true}, 
    message: { type: String, required: true },
    status: { type: String, default: "pending" },
    response: { type: String }, 
}, {
    timestamps: true,
});



const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
