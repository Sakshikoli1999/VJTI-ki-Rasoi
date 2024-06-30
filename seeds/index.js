const mongoose = require('mongoose');
const { breakfast,lsabji,dsabji,sweets,weekDay} = require('./dishes');
const Menu = require('../models/menu');

mongoose.connect('mongodb://127.0.0.1/mess-management');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Menu.deleteMany({});
    for (let i = 0; i < 7; i++) {
        const random1000 = Math.floor(Math.random() * 10);
        const camp = new Menu({
            breakfast: {
                fixed:['Tea','Coffee','Milk'],
                variable_breakfast:breakfast[i]
            },
            lunch: {
                fixed:['Roti','Sabji','Salad','Dal','Plain Rice'],
                variable_sabji:lsabji[i]
            },
            price:300,
            dinner:{
                fixed:['Roti','Sabji','Salad','Dal','Plain Rice'],
                variable_sabji:dsabji[i],
                variable_sweets:sweets[i]
            },
            weekday: `${weekDay[i]}`,
        });
    await camp.save();
}
}

seedDB();
