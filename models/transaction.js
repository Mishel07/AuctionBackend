const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const transactionSchema = new Schema({
    bidderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    }, 
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    auctionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"auctions",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model("transaction", transactionSchema);