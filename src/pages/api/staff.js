import connectMongoDB from "../../libs/mongodb";
import Staff from "../../DB/models/Staff";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await connectMongoDB();
            res.status(200).json(await Staff.find());
            break;
        case "POST":
            await addStaff(req, res);
            break;
        case "DELETE":
            await deleteStaff(req, res);
            break;
        case "PUT":
            await updateStaff(req, res);
            break;
        default:
            res.status(405).json({ message: "Method Not Allowed" });
    }
}

async function sendEmail(name, email) {
    function generatePassword(length) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    const password = generatePassword(15);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 2525,
        auth: {
            user: "rd.bernardino@campus.fct.unl.pt",
            pass: "FD63D076ECBB3C9D7D6B9A10EA529D43406F",
        },
    });

    const options = {
        from: "rd.bernardino@campus.fct.unl.pt",
        to: email,
        subject: "Welcome to CrewCodile",
        html: `<h1>Hello, ${name}!</h1><p>Your email has been added successfully to the restaurant's Crewcodile.</p>`,
    };

    await transporter.sendMail(options);
    return password;
}

async function addStaff(req, res) {
    try {
        const { name, email, role, restaurant, photo } = req.body;
        console.log("Request body received for adding staff:", { name, email, role, restaurant, photo });

        await connectMongoDB();
        const newStaff = await Staff.create({ name, email, role, restaurant, photo });
        console.log("New staff added to DB:", newStaff);

        res.status(200).json({ message: "Staff Created", staff: newStaff });
    } catch (error) {
        console.error("Error in addStaff:", error);
        res.status(500).json({ message: "Failed to create staff", error });
    }
}

async function deleteStaff(req, res) {
    try {
        const { id } = req.body;
        console.log("Request to delete staff with ID:", id);

        await connectMongoDB();
        await Staff.findByIdAndDelete(id);
        res.status(200).json({ message: "Staff Deleted" });
    } catch (error) {
        console.error("Error in deleteStaff:", error);
        res.status(500).json({ message: "Failed to delete staff", error });
    }
}

async function updateStaff(req, res) {
    try {
        const { id, name, email, role, restaurant, photo } = req.body;
        console.log("Request to update staff with ID:", id, { name, email, role, restaurant, photo });

        await connectMongoDB();
        const updatedStaff = await Staff.findByIdAndUpdate(id, { name, email, role, restaurant, photo }, { new: true });
        console.log("Staff updated:", updatedStaff);

        res.status(200).json({ message: "Staff Updated", staff: updatedStaff });
    } catch (error) {
        console.error("Error in updateStaff:", error);
        res.status(500).json({ message: "Failed to update staff", error });
    }
}
