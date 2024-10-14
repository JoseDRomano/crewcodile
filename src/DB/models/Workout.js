import mongoose, {Schema} from "mongoose";

const workoutsSchema = new Schema(
    {
        name: String,
        exerciseList: Array,
        students: Array,
        duration: Number
    },
    {
        timestamps: true,
    }
);

const Workout = mongoose.models?.Workout || mongoose.model("Workout", workoutsSchema);

export default Workout;
