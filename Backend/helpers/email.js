import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  // Configurar el transporte de Nodemailer
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",  // Puedes usar el servidor SMTP de tu proveedor de correo
    port: 465,  // Puerto seguro
    secure: true,  // Usar TLS
    auth: {
      user: process.env.nicolasurazanp_gmail.com,  // Aquí va tu correo electrónico
      pass: process.env.nicolasurazan2016,  // Aquí va tu contraseña de aplicación
    },
  });

  // Configurar el contenido del email
  const info = await transport.sendMail({
    from: '"Nombre de Tu App" <tu_correo@gmail.com>',
    to: email,
    subject: "Confirma tu cuenta en TuApp",
    text: "Confirma tu cuenta",
    html: `<p>Hola ${nombre},</p>
           <p>Tu cuenta está casi lista, solo debes confirmarla en el siguiente enlace:</p>
           <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>`,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
