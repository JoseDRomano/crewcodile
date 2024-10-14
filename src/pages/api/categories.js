import connectMongoDB from "../../libs/mongodb";
import Exercises from "../../DB/models/Exercises"


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //some code...
            await connectMongoDB();
            res.status(200).json(await Exercises.find().distinct('category'))
            break;
    }
}


