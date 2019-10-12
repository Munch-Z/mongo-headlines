const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
    title:{
        type: String
    },
    summary:{
        type: String
    },
    URL: {
        type: String
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
})

const Articles = mongoose.model('articles', ArticlesSchema);

module.exports = Articles;