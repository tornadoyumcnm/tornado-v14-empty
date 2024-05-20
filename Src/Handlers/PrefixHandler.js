const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    client.commands = new Map();
    client.aliases = new Map();

    let totalCommands = 0;
    
    const categories = fs.readdirSync(path.join(__dirname, '../Commands/PrefixCommands'));
    
    for (const category of categories) {
        const commandFiles = fs.readdirSync(path.join(__dirname, `../Commands/PrefixCommands/${category}`)).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(path.join(__dirname, `../Commands/PrefixCommands/${category}/${file}`));
            client.commands.set(command.name, command);
            totalCommands++;

            console.log(`${command.name} komutu yüklendi`)

            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    client.aliases.set(alias, command.name);
                });
            }
        }
    }

    console.log(`Toplam prefix komut sayısı: ${totalCommands}`);

    client.on('messageCreate', async (message) => {
        if (!message.guild || message.author.bot) return;

        const prefix = process.env.Prefix;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

        if (command) {
            command.execute(client, message, args);
        }
    });
};
