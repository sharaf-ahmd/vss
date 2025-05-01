
import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    service: { type: String, required: true },
    vendor:{type: String, required: true},
    price: { type: Number, required: true },
    customer: { type: String, required: true },
    email:{type:String, required:true},
    contact:{type:Number, required: true},
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'declined'] }
},{
    timestamps: true,
});



const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
