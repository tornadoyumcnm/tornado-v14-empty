const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildEmojisAndStickers, Discord.GatewayIntentBits.GuildMessageReactions, Discord.GatewayIntentBits.GuildVoiceStates], messages: { interval: 3600, lifetime: 1800, }, users: { interval: 3600, filter: () => user => user.bot && user.id !== client.user.id, } })

require('dotenv').config();
require("./Events/Ready.js")(client);
require("./Utils/ButtonUtils.js")(client);
require("./Handlers/PrefixHandler.js")(client);
require("./Handlers/SlashHandler.js")(client);
require("./Handlers/MongoHandler.js")(client);
require("./Handlers/LoginHandler.js")(client);