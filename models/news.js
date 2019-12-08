var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    headline: {
        type: String
    },
    summary: {
        type: String
    },
    link: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    memos: [{
        type: Schema.Types.ObjectId,
        ref: "Memo"
    }]
})

var News = mongoose.model("News", NewsSchema);

module.exports = News;