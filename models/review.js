const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: {
        type: String,
       // required: true
    },
    feedback:{
        type:String,
       // required: true
       // unique:true
    } 
});

module.exports=mongoose.model('Reviews',reviewSchema);