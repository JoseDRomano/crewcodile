import connectMongoDB from "../../libs/mongodb";
import Students from "../../DB/models/Students"

import nodemailer from 'nodemailer';


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            //some code...
            await connectMongoDB();
            res.status(200).json(await Students.find())
            break;
        case 'POST':
            addStudent(req)
            res.status(200).json({message: "Student Created"})
            break;
        case 'DELETE':
            deleteStudent(req)
            res.status(200).json({message: "Student Deleted"})
            break;
        case 'PUT':
            updateStudent(req)
            res.status(200).json({message: "Student Updated"})
            break;

    }
}

async function sendEmail(name,email){
    
    function genereatePass(comprimento) {
        const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

        let senha = "";
        for (let i = 0; i < comprimento; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            senha += caracteres.charAt(indice);
        }

        return senha;
    }

    const password = genereatePass(15)

    const transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        auth: {
          user: 'help@trainwith.me',
          pass: '7C6B99110DEAF8F0C7566E416D7F113A9254',
        },
      });
    
      const options = {
        from: 'p.grilo@campus.fct.unl.pt',
        to: email,
        subject: 'Bem-vindo(a) à TrainWith.Me',
        html: `<!DOCTYPE html>
        <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TrainWith.Me - Novo Registo</title>
        </head>
        <body style="font-family: 'Arial', sans-serif;">
        
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; border-collapse: collapse;">
            <tr>
            <td style="background-color: rgb(198, 156, 109); padding: 20px; text-align: center; color: #ffffff;">
                <img src='https://trainwithme.vercel.app/_next/image?url=%2Flogo192.png&w=128&q=75' alt="Train With Me Logo" style="max-width: 100px; height: auto;">
                <h2>TrainWith.Me</h2>
                <p>O seu novo registo foi bem-sucedido!</p>
            </td>
        </tr>   
                <tr>
                    <td style="padding: 20px;">
                        <p>Olá ${name},</p>
                        <p>Parabéns! O seu registo na aplicação "TrainWith.Me" foi concluído com sucesso. A seguir, encontrará os detalhes da sua conta:</p>
                        <ul>
                            <li><strong>Email:</strong>${email}</li>
                            <li><strong>Palavra-passe:</strong>${password}</li>
                        </ul>
                        <p>Agora, podes utilizar estas credenciais para fazer o login na app <a href="https://trainwithme.vercel.app/">aqui</a>. Recomendamos que altere a sua palavra-passe após o primeiro acesso.</p>
                        <p>Se precisar de ajuda ou tiver alguma dúvida, não hesite em contactar-nos.</p>
                        <p>Obrigado por escolher o "TrainWith.Me"!</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #f2f2f2; padding: 20px; text-align: center;">
                        <p>&copy; 2023 TrainWith.Me. Todos os direitos reservados.</p><br>
                        <p>Ps: é apenas placeholder, pois o client ainda não está implementado</p>
                    </td>
                </tr>
            </table>
        
        </body>
        </html>
        `,
      };
    await transporter.sendMail(options);
    return password;
}

async function addStudent(req) {
    const {name, email, objective, weight, height, bodyFat, photo} = await req.body;
    await connectMongoDB();
    const password = await sendEmail(name,email);
    await Students.create({name, email, password: password, objective, weight, height, bodyFat, photo});
}

async function deleteStudent(req) {
    const {id} = await req.body;
    await connectMongoDB();
    await Students.findByIdAndDelete(id);
}

async function updateStudent(req) {
    const {id, name, email, password, objective, weight, height, bodyFat, photo} = await req.body;
    await connectMongoDB();
    await Students.findByIdAndUpdate(id, {name, email, password, objective, weight, height, bodyFat, photo});
}


