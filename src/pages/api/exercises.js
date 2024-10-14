import connectMongoDB from "../../libs/mongodb";
import Exercises from "../../DB/models/Exercises"


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //some code...
            await connectMongoDB();
            res.status(200).json(await Exercises.find())
            break;
        case 'POST':
            addExercise(req)
            res.status(200).json({message: "Exercises Created"})
            break
        case 'PUT':
            updateExercise(req)
            res.status(200).json({message: "Exercises Updated"})
            break;
        case 'DELETE':
            deleteExercise(req)
            res.status(200).json({message: "Exercises Deleted"})
            break;

    }
}

async function addExercise(req) {
    await connectMongoDB();
    await Exercises.create(await req.body);
}

async function updateExercise(req) {
    const {id, name, force, primaryMuscles, instructions,category, photo} = req.body;
    await connectMongoDB();
    await Exercises.findByIdAndUpdate({_id: id}, {name, force, primaryMuscles, instructions,category, photo});
}

async function deleteExercise(req){
    const {id} = await req.body;
    await connectMongoDB();
    await Exercises.findByIdAndDelete({_id: id});
}

