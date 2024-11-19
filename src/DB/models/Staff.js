import mongoose, {Schema} from "mongoose";

const staffSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        objective: String,
        photo: String,
    },
    {
        timestamps: true,
    }
);

const Staff = mongoose.models?.Staff || mongoose.model("Staff", staffSchema);

export default Staff;
