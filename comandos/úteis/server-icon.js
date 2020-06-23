const Discord = require("discord.js"); // Puxando a livraria Discord.js

exports.run = (client, message, args) => {
  
  // Puxando um usuario mencionavel, caso não mencione ninguém será o autor
  let member = message.mentions.users.first() || message.author;

  const embed = new Discord.MessageEmbed()
    .setColor("#FFFF")
    .setTitle(`${message.author.username}`)
    .setDescription(
      "**[Clique aqui para baixar](" + message.guild.iconURL() + ")**"
    )
    .setImage(message.guild.iconURL());

  message.reply(embed);
};

exports.help = {
  name: "servericon",
  aliases: ["ícone"]
};
