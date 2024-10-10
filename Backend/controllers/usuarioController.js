import Usuario from '../models/Usuario.js';

// Predefinir los administradores quemados en el código
const adminsPredefinidos = [
  {
    nombre: "Nicolas Urazan Padilla",
    email: "nicolasurazanp@gmail.com",
    password: "nicolasurazan2016",
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
  const { nombre, email, password } = req.body;  // No permitimos que el cliente especifique el rol
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Crear nuevo usuario con el rol de 'user'
    const usuario = new Usuario({ nombre, email, password, role: "user" });
    await usuario.save();

    res.json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
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

    // Verificar el rol del usuario
    if (usuario.role === "admin") {
      // Si es admin, mostrar una alerta con el nombre del usuario y el rol
      return res.json({
        msg: `Administrador ${usuario.nombre} ha iniciado sesión`,
      });
    } else {
      // Si es un usuario común, solo dejar un mensaje en la consola
      console.log(`Usuario ${usuario.nombre} ha iniciado sesión`);
      return res.json({
        msg: "Autenticación exitosa",
      });
    }
  } else {
    return res.status(403).json({ msg: "Contraseña incorrecta" });
  }
};

export { registrar, autenticar, registrarAdminsPredefinidos };
