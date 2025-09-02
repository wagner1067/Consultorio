import mongoose from "mongoose";

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
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          v
        );
      },
      message: (props) =>
        `${props.value}Password is not strong enough. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.`,
    },
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
        return /\d{2} 9\d{4}-\d{4}/.test(v);
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

const doctor = mongoose.model("Doctor", doctorSchema);

export default doctor;
