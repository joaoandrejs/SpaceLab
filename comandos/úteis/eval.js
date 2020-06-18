const Discord = require("discord.js");
const db = require('quick.db');

const client = new Discord.Client()

exports.run = async (client, message, args) => {
    if (!['675439542110650399'].includes(message.author.id)) {
    return message.channel.send(`apenas meus desenvolvedores podem utilizar este comando!`)
    }
    const code = args.slice(0).join(" ")
    if (!code) return message.reply(`digite algum code!`)
    
        try {
        let ev = require('util').inspect(eval(code));
        if (ev.length > 1950) {
            ev = ev.substr(0, 1950);
        }
          let embed = new Discord.RichEmbed()
          .setDescription(`:inbox_tray: **ENTRADA**\n\`\`\`js\n${code}\`\`\`\n:outbox_tray: **SAÍDA**\n\`\`\`js\n${ev}\`\`\``)
        message.channel.send(embed)
        } catch(err) {
          let errorrr = new Discord.RichEmbed()
          .setDescription(`**Erro!**\n\`\`\`\n${err}\`\`\``)
            message.channel.send(errorrr)
        }
  }
 exports.help = {
      name: "eval",
     aliases: []
 }
