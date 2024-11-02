import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';
import logAdminAction from '../middleware/logger.js';

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

const registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ msg: "Todos los campos (nombre, email, password) son obligatorios" });
  }

  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    return res.status(400).json({ msg: "El usuario ya está registrado" });
  }

  try {
    const usuario = new Usuario({ nombre, email, password, role: "user" });
    await usuario.save();

    // Simular autenticación para establecer req.user
    req.user = { nombre: 'Admin', role: 'admin' }; // Esto es solo para pruebas

    logAdminAction(req, res, () => {}); // Registrar acción del administrador

    res.json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log("Error al registrar el usuario:", error);
    res.status(500).json({ msg: "Hubo un error al registrar el usuario" });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(404).json({ msg: "El usuario no existe" });
  }

  if (await usuario.comprobarPassword(password)) {
    console.log("Inicio de sesión exitoso");

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Simular autenticación para establecer req.user
    req.user = { nombre: usuario.nombre, role: usuario.role }; // Esto es solo para pruebas

    logAdminAction(req, res, () => {}); // Registrar acción del administrador

    return res.json({
      msg: `Bienvenido ${usuario.nombre}`,
      token,
      role: usuario.role,
      nombre: usuario.nombre,
    });
  } else {
    return res.status(403).json({ msg: "Contraseña incorrecta" });
  }
};

export { registrar, autenticar, registrarAdminsPredefinidos };