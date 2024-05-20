/*const {model, Schema, Types} = require("mongoose")

module.exports = model("LogCreate", new Schema(
    {
        guildId: { type: String, required: true },
        hasUsedLogCommand: { type: Boolean, default: false }
    }
))*/

const { model, Schema, Types } = require("mongoose")

module.exports = model("LogCreate", new Schema(
    {
        guildId: { type: String, required: true },
        hasUsedLogCommand: { type: Boolean, default: false },

        data: { type: Object, default: {} }
    }
))