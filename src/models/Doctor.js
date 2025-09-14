import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Doctor name is required"],
  },
  login: {
    type: String,
    required: [true, "Login is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  medicalSpecialty: {
    type: String,
    required: [true, "Medical Specialty is required"],
  },
  medicalRegistration: {
    type: String,
    required: [true, "Medical Registration is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    validate: {
      validator: function (v) {
        const normalizedPhone = v.replace(/\D/g, "");
        return /^\d{2}9\d{8}$/.test(normalizedPhone);
      },
      message: (props) =>
        `${props.value} This is not a valid phone value. Please use the following format: 99 91234-5678`,
    },
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/~`])[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/~`]{8,}$/;

  if (!passwordRegex.test(this.password)) {
    return next(
      new Error(
        "Password is not strong enough. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
    );
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const doctor = mongoose.model("Doctor", doctorSchema);

export default doctor;
