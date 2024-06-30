const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    card:{
        type:String,
        default:null,
        required:true
    },
    leaveStartDate:{
        type:String,
        default:null
    },
    leaveEndDate:{
        type:String,
        default:null
    },
    totalLeaves:{
        type:String,
        default:null
    }
});

module.exports=mongoose.model('Leave',leaveSchema);



