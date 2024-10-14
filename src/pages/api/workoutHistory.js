import connectMongoDB from "../../libs/mongodb";
import WorkoutHistory from "../../DB/models/WorkoutHistory"


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //some code...
            await connectMongoDB();
            res.status(200).json(await WorkoutHistory.find())
            break;
        case 'POST':
            addWorkoutHistory(req)
            res.status(200).json({message: "Workout History Created"})
            break
        case 'PUT':
            updateWorkoutHistory(req)
            res.status(200).json({message: "Workout Updated"})
            break;
        case 'DELETE':
            deleteWorkoutHistory(req)
            res.status(200).json({message: "Workout History Deleted"})
            break;

    }
}

async function addWorkoutHistory(req) {
    const {workoutPlan, date, student, duration, localization} = await req.body;
    await connectMongoDB();
    await WorkoutHistory.create({workoutPlan,date, student,duration, localization});
}


async function updateWorkoutHistory (req) {
    const {id, workoutPlan, date, student, duration, localization} = await req.body;
    await connectMongoDB();
    await WorkoutHistory.findByIdAndUpdate({_id: id}, {workoutPlan, date, student, duration, localization});
}

async function deleteWorkoutHistory(req){
    const {id} = await req.body;
    await connectMongoDB();
    await WorkoutHistory.findByIdAndDelete({_id: id});
}

