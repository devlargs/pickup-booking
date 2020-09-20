import { model, models, Schema } from "mongoose";
import timestamps from "constants/timestamps";
import enums from "constants/enums";
import Drivers from "./drivers";

const name = "booking";
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
    shippersContactNumber: {
      type: String,
      required: [true, "Shippers Contact Number is required!"],
    },
    receiversName: {
      type: String,
      required: [true, "Receiver's Name is required!"],
    },
    receiversContactNumber: {
      type: String,
      required: [true, "Receiver's Contact number is required!"],
    },
    receiversAddress: {
      type: String,
      required: [true, "Receiver's Address is required!"],
    },
    modeOfService: {
      type: String,
      enum: enums.modeOfService,
      required: [true, "Mode of Service is required!"],
    },
    paymentMode: {
      type: String,
      enum: enums.paymentMode,
      required: [true, "Payment Mode is required!"],
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "ACCEPTED"],
      default: "PENDING",
    },
    acceptedBy: {
      type: Schema.Types.ObjectId,
      ref: Drivers,
    },
  },
  {
    timestamps,
  }
);

export default models[name] || model(name, BookingSchema);
