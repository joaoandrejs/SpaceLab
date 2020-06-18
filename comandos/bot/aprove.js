const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
  
  
  let member = await client.users.get(args[0])
  if (!member) {
    return message.channel.send('Vocẽ deve me indicar o id de um usuario valido!')
  }
  
  const embed = new Discord.RichEmbed()
  .setDescription(`O usuario: ${member.tag} foi aprovado na botlist?`)
  .setFooter(`${member.tag}`)
  .setTimestamp()
  .setColor(config.color);
  
  message.channel.send(embed).then(msg => {

    msg.react('708102263901782028').then(() => msg.react('708102338807726092'))

    const filter = (reaction, user) => {
      return ['708102263901782028', '708102338807726092'].includes(reaction.emoji.id) && user.id === message.author.id;
    };
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) 
      .then(collected => {
        const reaction = collected.first();
      
      if (reaction.emoji.id === '708102263901782028') {
        msg.delete();
        
        const embed = new Discord.RichEmbed()
        .setDescription(`O usuario: ${member.tag} foi definido como aprovado!`)
        .setColor(config.color);
        message.channel.send(embed);
        
        db.set(`add_${member.id}`, true)
       } else {
         msg.delete()
         message.channel.send('Comando cancelado')
       }
      
      })
      .catch(collected => { // Lembra da 'then' collected? Pois é! Caso o usuário não clique em 30s, iremos declarar como cancelado
        message.reply('o tempo para escolher excedeu! Tente utilizar novamente.');
      });
    })
}
exports.help = {
  name: 'aprove',
  aliases: ['aprovado']
}