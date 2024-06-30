const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    weekday: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required: true
    },
    breakfast: {
        fixed: [{
            type: String,
            required: true
        }],
        variable_breakfast: {
            type: String,
            required: true
        }
    },
    lunch: {
        fixed:[{
            type: String,
            required: true
        }],
        variable_sabji:{
            type:String,
            required:true
        }
    },
    dinner: {
        fixed: [{
            type: String,
            required: true
        }],
        variable_sabji: {
            type: String,
            required: true
        },
        variable_sweets: {
            type: String,
            required: true
        },
        variable: {
            type: String
        }
    }
});
module.exports = mongoose.model('Menu', MenuSchema);

