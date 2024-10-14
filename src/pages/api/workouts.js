import connectMongoDB from "../../libs/mongodb";
import Workout from "../../DB/models/Workout"


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //some code...
            await connectMongoDB();
            res.status(200).json(await Workout.find())
            break;
        case 'POST':
            addWorkout(req)
            res.status(200).json({message: "Workout Created"})
            break
        case 'PUT':
            updateWorkout(req)
            res.status(200).json({message: "Workout Updated"})
            break;
        case 'DELETE':
            deleteWorkout(req)
            res.status(200).json({message: "Workout Deleted"})
            break;

    }
}

async function addWorkout(req) {
    const {name, exerciseList, students, duration} = await req.body;
    await connectMongoDB();
    await Workout.create({name, exerciseList, students, duration});
}

async function updateWorkout(req){
    const {id, name, exerciseList, students, duration} = await req.body;
    await connectMongoDB();
    await Workout.findByIdAndUpdate({_id: id}, {name, exerciseList, students, duration});
}

async function deleteWorkout(req) {
    const {id} = await req.body;
    await connectMongoDB();
    await Workout.findByIdAndDelete({_id: id});
}




