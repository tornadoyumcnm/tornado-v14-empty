const {model, Schema, Types} = require("mongoose")

module.exports = model("LogDelete", new Schema(
    {
        guildId: { type: String, required: true },
        hasUsedLogCommand: { type: Boolean, default: false }
    }
))