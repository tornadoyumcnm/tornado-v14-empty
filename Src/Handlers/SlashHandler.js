const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');

module.exports = (client) => {


    client.slashCommands = new Discord.Collection();
    client.registerdCommands = new Discord.Collection();

    client.slashCommands = new Discord.Collection();
    client.registeredCommands = new Discord.Collection();

    const loadCommands = (folderPath) => {
        const commandFolders = fs.readdirSync(folderPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${folderPath}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`${folderPath}/${folder}/${file}`)

                if (!command.config || !command.config.name) {
                    console.error(`Slash komut dosyası boş! ${folder}/${file}`);
                    continue;
                }

                client.slashCommands.set(command.config.name, command);
                client.registeredCommands.set(command.config.name, command.config);
            }
        }
    }

    const loadEvents = () => {
        const Eventsss = path.join(__dirname, '../Functions/');
        for (const event of fs.readdirSync(Eventsss).filter(file => file.endsWith(".js"))) {
            const evt = require(`${Eventsss}${event}`);

            if (evt.config.once) {
                client.once(evt.config.name, (...args) => {
                    evt.execute(client, ...args);
                });
            } else {
                client.on(evt.config.name, (...args) => {
                    evt.execute(client, ...args);
                });
            }
        }
    }

    const slashCommandsRegister = () => {
        const { REST } = require("@discordjs/rest");
        const { Routes } = require("discord-api-types/v10");

        client.once("ready", async () => {
            const rest = new REST({ version: "10" }).setToken(process.env.Token);
            try {
                await rest.put(Routes.applicationCommands(process.env.BotID), {
                    body: client.registeredCommands.toJSON(),
                }).then(() => {
                    console.log(`Toplam slash komut sayısı ${client.registeredCommands.size}`)
                });
            } catch (error) {
                throw error;
            }
        })
    };
    const commandFolderPath = path.join(__dirname, '../Commands/SlashCommands');
    loadCommands(commandFolderPath);
    loadEvents();
    slashCommandsRegister();

}