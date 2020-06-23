const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
  
  /*
  mesma coisa do aprove so que...
  
  
  Quando o usuario e reprovado ele fica 1 dia sem poder enviar o bot para analise... ent ele será na db date.now igual no daily ou work!
  */
  
  let member = await client.users.get(args[0])
  if (!member) {
    return message.channel.send('Vocẽ deve me indicar o id de um usuario valido!')
  }
  
  let reper = db.get(`reper_${member.id}`);
  if (reper === null) reper = 0;
  if (reper === 1) return message.channel.send('Este usuario ja foi reprovado hoje!');
  
  
  const embed = new Discord.MessageEmbed()
  .setDescription(`O usuario: ${member.tag} foi reprovado na botlist?`)
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
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`O usuario: ${member.tag} foi definido como reprovado!`)
        .setColor(config.color);
        message.channel.send(embed);
        
        db.add(`reprove_${member.id}`, 1)
        db.set(`reper_${member.id}`, Date.now())
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
  name: 'reprove',
  aliases: ['reprovado']
}