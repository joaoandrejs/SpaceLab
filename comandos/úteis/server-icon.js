const Discord = require('discord.js') // Puxando a livraria Discord.js

exports.run = (client, message, args) => {

   // Definindo o usuário que iremos pegar o avatar
    let member = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()

    .setColor('#FFFF')
    .setTitle(`${message.author.username}`)
    .setDescription("**[Clique aqui para baixar](" + message.guild.iconURL+ ")**")
    .setImage(message.guild.iconURL)

    message.reply(embed)
}

exports.help = {
    name: 'servericon',
    aliases: ['ícone']
}
