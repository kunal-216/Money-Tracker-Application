import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    datetime: { type: Date, required: true },
    price: { type: String, required: true },
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

export default TransactionModel;