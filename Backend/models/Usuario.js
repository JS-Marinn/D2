import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, 'Por favor ingrese un correo electrónico válido']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Definimos los roles
    default: 'user'           // Por defecto, asignamos el rol de usuario
  }
}, {
  timestamps: true,
});

// Encriptar la contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comprobar si la contraseña ingresada es correcta
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
}

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
