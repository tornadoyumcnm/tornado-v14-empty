module.exports = (client) => {

    client.login(process.env.Token).then(() => {
        console.log(`${process.env.BotName} Bot DC Girdi`);
    }).catch((err) => {
        console.log(`${process.env.BotName} Bot DC Giremedi: ${err}`);
    });

}