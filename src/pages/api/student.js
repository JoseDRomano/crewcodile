import connectMongoDB from "../../libs/mongodb";
import Students from "../../DB/models/Students"


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //some code...
            await connectMongoDB();
            res.status(200).json(await Students.findOne({_id: req.query?.id}));
            break;

    }
}


