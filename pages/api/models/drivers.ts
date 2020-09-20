import { model, models, Schema } from "mongoose";
import timestamps from "constants/timestamps";

const name = "drivers";
const DriverSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Driver's Full Name is required!"],
    },
    driversLicense: {
      type: String,
      required: [true, "Driver's License Id is required!"],
    },
  },
  {
    timestamps,
  }
);

export default models[name] || model(name, DriverSchema);
