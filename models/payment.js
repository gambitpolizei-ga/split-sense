const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    totalAmount: { type: Schema.Types.Decimal128 },
    paymentDate: Date,
    budgetId: { type: Schema.Types.ObjectId, ref: "Budget" },
    participantsId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
