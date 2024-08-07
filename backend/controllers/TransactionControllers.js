import TransactionModel from "../models/Transaction.js"

const showTransactions = async (req, res) => {
    try {
        const transactions = await TransactionModel.find({});
        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const postTransactions = async (req, res) => {
    try {
        const { name, description, datetime, price } = req.body;
        if (!name || !description || !datetime || !price) {
            return res.status(400).json({ error: 'Invalid request' });
        }
        const transaction = await TransactionModel.create({ name, description, datetime, price });
        res.json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {showTransactions, postTransactions};