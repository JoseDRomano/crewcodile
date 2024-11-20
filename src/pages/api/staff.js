// /api/staff.js:

import connectMongoDB from "../../libs/mongodb";
import Staff from "../../DB/models/Staff"; // Assuming the Staff model is set up properly
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await connectMongoDB();
            res.status(200).json(await Staff.find());
            break;
        case "POST":
            await addStaff(req);
            res.status(200).json({ message: "Staff Created" });
            break;
        case "DELETE":
            await deleteStaff(req);
            res.status(200).json({ message: "Staff Deleted" });
            break;
        case "PUT":
            await updateStaff(req);
            res.status(200).json({ message: "Staff Updated" });
            break;
        default:
            res.status(405).json({ message: "Method Not Allowed" });
    }
}

async function sendEmail(name, email) {
    function generatePassword(length) {
        const chars =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            password += chars.charAt(index);
        }
        return password;
    }

    const password = generatePassword(15);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 2525,
        auth: {
            user: "rd.bernardino@campus.fct.unl.pt",
            pass: "FD63D076ECBB3C9D7D6B9A10EA529D43406F", // Use environment variables in production
        },
    });

    const options = {
        from: "rd.bernardino@campus.fct.unl.pt",
        to: email,
        subject: "Welcome to CrewCodille",
        html: `
    <html>
    <body>
      <h1>Hello, ${name}!</h1>
      <p>Your email has been added successfully to the restaurant's Crewcodile.</p>
    </body>
    </html>
    `,
    };

    await transporter.sendMail(options);
    return password;
}

async function addStaff(req) {
    const { name, email, role, restaurant, photo } = await req.body;
    await connectMongoDB();
    const password = await sendEmail(name, email);
    await Staff.create({ name, email, role, restaurant, photo });
}

async function deleteStaff(req) {
    const { id } = await req.body;
    await connectMongoDB();
    await Staff.findByIdAndDelete(id);
}

async function updateStaff(req) {
    const { id, name, email, role, restaurant, photo } = await req.body;
    await connectMongoDB();
    await Staff.findByIdAndUpdate(id, { name, email, role, restaurant, photo });
}
