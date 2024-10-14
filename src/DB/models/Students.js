import mongoose, {Schema} from "mongoose";

const studentSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        objective: String,
        weight: Number,
        height: Number,
        bodyFat: Number,
        photo: String,
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.models?.Student || mongoose.model("Student", studentSchema);

export default Student;
