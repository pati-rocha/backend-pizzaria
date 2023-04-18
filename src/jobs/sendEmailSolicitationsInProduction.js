import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER_CREDENTIAL_SERVICE_EMAIL ,
      pass: process.env.PASSWORD_CREDENTIAL_SERVICE_EMAIL,
    },
  });

export function sendEmailSolicitationsInProduction() {
  //console.log("1 minuto!");
    solicitationsRoutes.forEach((solicitation) => {
        if (solicitation.order == "EM PRODUÇÂO") {
          transporter.sendMail(
            {
              from: "testepizzaria@teste.com",
              to: "receberteste@teste.com",
              subject: "Sua pizza está chegando!", //título do email
              html: `<p> Olá ${solicitation.name_client}, seu pedido está a caminho! </p>` 
              // html com texto do corpo do email, pode formatar
            },
            (err, info) => {
              if (err)
              console.log(err);
              else 
              console.log(info);
            }
          );
        }
      });
}