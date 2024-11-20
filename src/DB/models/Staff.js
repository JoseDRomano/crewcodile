import mongoose, {Schema} from "mongoose";

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    restaurant: { type: String },
    photo: { type: String }, // URL to the staff photo
    createdAt: { type: Date, default: Date.now },
});

const Staff = mongoose.models?.Staff || mongoose.model("Staff", StaffSchema, "staffs");

export default Staff;
