const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const articleSchema = mongoose.Schema({
    title : { type : String , required : true},
    author : { type : String , required : true},
    body : { type : String , required : true},
    tags : { type : String , required : true},
} , { timestamps : true });

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('article' , articleSchema);