import { model, models, Schema } from "mongoose";
import timestamps from "constants/timestamps";
import enums from "constants/enums";

const name = "kanban_statuses";
const BookingSchema = new Schema(
  {
    shipmentType: {
      type: String,
      enum: enums.shipmentType,
      required: [true, "Shipment Type is required!"],
    },
    shippersName: {
      type: String,
      required: [true, "Shippers Name is required!"],
    },
    shippersAddress: {
      type: String,
      required: [true, "Shippers Address is required!"],
    },
    shippersEmailAddress: {
      type: String,
      required: [true, "Shippers Email Address is required"],
    },
    shippersContactNumber: {
      type: String,
      required: [true, "Shippers Contact Number is required"],
    },
    receiversName: {
      type: String,
      required: [true, "Receiver's Name is required!"],
    },
    receiversContactNumber: {
      type: String,
      required: [true, "Receiver's Contact number is required"],
    },
    modeOfService: {
      type: String,
      enum: enums.modeOfService,
    },
    paymentMode: {
      type: String,
      enum: enums.paymentMode,
    },
  },
  {
    timestamps,
  }
);

export default models[name] || model(name, BookingSchema);
