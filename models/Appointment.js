import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Appointment date is required"],
  },
  doctorId: {
    type: String,
    required: [true, "Doctor ID is required"],
    validate: {
      validator: function (v) {
        const id = new mongoose.Types.ObjectId.isValid(v); //Convertendo uma string para objecto Id para ser encontrado no banco
        return Doctor.exists({ _id: id }); //Verificando se o ID existe no banco
      },
      message: (props) => `Doctor ID ${props.value} not found.`,
    },
  },
  pacientId: {
    type: String,
    required: [true, "Pacient ID is required"],
    validate: {
      validator: function (v) {
        const id = new mongoose.Types.ObjectId.isValid(v); //Convertendo uma string para objecto Id para ser encontrado no banco
        return Pacient.exists({ _id: id }); //Verificando se o ID existe no banco
      },
      message: (props) => `Pacient ID ${props.value} not found.`,
    },
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const appointment = mongoose.model("Appointment", appointmentSchema);

export default appointment;
