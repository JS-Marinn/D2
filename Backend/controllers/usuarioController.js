import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken'; // Importar el paquete jwt

// Predefinir los administradores quemados en el código
const adminsPredefinidos = [
  {
    nombre: "Nicolas Urazan Padilla",
    email: "nicolasurazanp@gmail.com",
    password: "nicolasurazan2018",
    role: "admin"
  },
  {
    nombre: "Admin2",
    email: "admin2@example.com",
    password: "adminpass2",
    role: "admin"
  }
];

// Registrar los administradores predefinidos al iniciar el servidor
const registrarAdminsPredefinidos = async () => {
  for (const admin of adminsPredefinidos) {
    const existeAdmin = await Usuario.findOne({ email: admin.email });
    if (!existeAdmin) {
      const nuevoAdmin = new Usuario(admin);
      await nuevoAdmin.save();
      console.log(`Administrador ${admin.nombre} registrado correctamente.`);
    }
  }
};

// Registrar un usuario con rol 'user'
const registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  // Validación básica para campos vacíos
  if (!nombre || !email || !password) {
    return res.status(400).json({ msg: "Todos los campos (nombre, email, password) son obligatorios" });
  }

  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    return res.status(400).json({ msg: "El usuario ya está registrado" });
  }

  try {
    // Crear nuevo usuario con el rol de 'user'
    const usuario = new Usuario({ nombre, email, password, role: "user" });
    await usuario.save();

    res.json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log("Error al registrar el usuario:", error);
    res.status(500).json({ msg: "Hubo un error al registrar el usuario" });
  }
};

// Autenticar un usuario
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(404).json({ msg: "El usuario no existe" });
  }

  // Comprobar la contraseña
  if (await usuario.comprobarPassword(password)) {
    console.log("Inicio de sesión exitoso"); // Mensaje por consola al iniciar sesión exitosamente

    // Crear un token con el id del usuario y su rol
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      msg: `Bienvenido ${usuario.nombre}`,
      token,
      role: usuario.role, // Devolver el rol del usuario
      nombre: usuario.nombre, // Devolver el nombre del usuario
    });
  } else {
    return res.status(403).json({ msg: "Contraseña incorrecta" });
  }
};

export { registrar, autenticar, registrarAdminsPredefinidos };
