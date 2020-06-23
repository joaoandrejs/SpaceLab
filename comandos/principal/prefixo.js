const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json');

exports.run = (client, message, args) => {
  //Mesma coisa dos outros comandos (Sim e tudo igual pq e a mesma base :V)
  let mensagem = args.slice(0).join(' ');
  const erro = new Discord.MessageEmbed()
  .setDescription(`Você deve inserir uma nova mensagem!`)
  .setColor(config.color)
  
  if (!mensagem) {
    message.channel.send(erro)
  }
  
  let add = db.get(`add_${message.author.id}`);
  if (add === null) return message.reply(`Você deve possuir um bot para alterar o prefixo!`);
  
  const embed = new Discord.MessageEmbed()
  .setDescription(`Você deseja alterar o prefixo de seu bot para:\n ${mensagem} ?`)
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
        .setDescription(`Prefixo alterada com sucesso!\n\nUtilize SL!perfil novamente para ver a alteração`)
        .setColor(config.color);
        message.channel.send(embed);
        
        db.set(`prefix_${message.author.id}`, mensagem);
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
  name: 'prefixo',
  aliases: []
}