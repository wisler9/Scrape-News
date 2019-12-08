var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MemoSchema = new Schema({
    text: {
        Type: String
    }
    // news: [{
    //     Type: Schema.Types.ObjectId,
    //     ref: "News"
    // }]
});

var Memo = mongoose.model("Memo",MemoSchema);

module.exports = Memo;