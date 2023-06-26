const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    totalAmount: {type:Schema.Types.Decimal128},
    participantsId: [{type:Schema.Types.ObjectId, ref:'User'}],
    userId: {type:Schema.Types.ObjectId, ref:'User'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);