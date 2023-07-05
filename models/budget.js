const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the budget schema
const budgetSchema = new Schema(
  {
    name: String,
    startDate: Date,
    endDate: Date,
    totalAmount: { type: Number },
    participantsId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// Create & export the Budget model based on the budget schema
module.exports = mongoose.model("Budget", budgetSchema);
