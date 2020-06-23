const Discord = require('discord.js'); // Puxando a livraria discord.js
const db = require('quick.db'); // Puxando a livraria quick.db
const config = require('../../config.json'); // Puxando a pasta config.json44

exports.run = async (client, message, args) => {
  
  
  //Puxando um usuario pelo id
  
  let member = await client.users.cache.get(args[0]) 
  
  //Se não mencionar nenhum usuario.
  if (!member) {
    return message.channel.send('Vocẽ deve me indicar o id de um usuario valido!')
  }
  
  //Criando um embed que será enviada
  const embed = new Discord.MessageEmbed()
  .setDescription(`O usuario: ${member.tag} foi aprovado na botlist?`)
  .setFooter(`${member.tag}`)
  .setTimestamp()
  .setColor(config.color);
                            //Criando um then
  message.channel.send(embed).then(msg => {

    //adicionando as reações
    msg.react('708102263901782028').then(() => msg.react('708102338807726092'))

    const filter = (reaction, user) => {                   //Se voce quiser adicionar um emoji nao personalizado altere isso
          //Adicionando as reações                          //Troque reaction.emoji.id para reaction.emoji.name
      return ['708102263901782028', '708102338807726092'].includes(reaction.emoji.id) && user.id === message.author.id;
    };
    //Definindo, o maximo de usos da reação, o tempo que o usuario poderá mencionar
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) 
      .then(collected => {
        const reaction = collected.first();
      
      //Se o usuario reajir 
      if (reaction.emoji.id === '708102263901782028') {
        msg.delete(); //deleta a outra embed
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`O usuario: ${member.tag} foi definido como aprovado!`)
        .setColor(config.color);
        message.channel.send(embed);
        
        db.set(`add_${member.id}`, true)
       } //Se o usuario mencionar outra reação a não ser a de cima ele retornara isto
      else {
        // Deleta a outra embed
         msg.delete()
         message.channel.send(':x: Comando cancelado')
       }
      
      })
    //Apos o tempo la em cima acabar ele avisara
      .catch(collected => {
        message.reply('O tempo de reações acabou!, utilize o comando novamente ;)');
      });
    })
}
exports.help = {
  name: 'aprove',
  aliases: ['aprovado']
}