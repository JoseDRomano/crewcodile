import mongoose, {Schema} from "mongoose";
/*
{
    "student": "Paulo",
    "workoutPlan": "Leg Day",
    "location": "123",
    "submit": null
}
 */
const workoutHistorySchema = new Schema(
    {
        workoutPlan: String,
        date: String,
        student: String,
        duration: Number,
        localization: String,
    },
    {
        timestamps: true,
    }
);

const WorkoutHistory = mongoose.models?.WorkoutHistory || mongoose.model("WorkoutHistory", workoutHistorySchema);

export default WorkoutHistory;
