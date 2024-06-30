const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewMemberSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    email:{
        type:String,
        required: true,
       // unique:true
    },
    card:{
        type:Number,
       // required:true,
       // unique:true
    }
});

module.exports=mongoose.model('NewMember',NewMemberSchema);
