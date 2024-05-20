module.exports = (client) => {

    require('dotenv').config();
    client.on("ready", () => {
        require("../DataBase/connect.js")(process.env.MongoDB)
        console.log(`MongoDB Başlatıldı.`)
    })

}
