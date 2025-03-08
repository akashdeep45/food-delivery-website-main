import mongoose from "mongoose";
import moment from "moment-timezone";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: {
    type: String,
    default: () => {
      // Get the current date and time in IST and format it to 12-hour format
      return moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A");
    },
  },
  payment: { type: Boolean, default: false },
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
