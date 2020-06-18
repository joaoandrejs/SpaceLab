const Discord = require("discord.js");
const config = require('../../config.json');
const db = require('quick.db');

exports.run = (client, message, args) => {
  let member = message.author || message.mentions.users.first() // Se não mencionar nenhum usuario mostrara o saldo do autor.
  
  let bot = db.get(`bot_${member.id}`);
  if (bot === null) bot = '`Não possui nenhum bot`';
  
  let descrição = db.get(`desc_${member.id}`);
  if (descrição === null) descrição = '`Nenhuma descrição`';
  
  let prefixo = db.get(`prefix_${message.author.id}`);
  if (prefixo === null) prefixo = '`Nenhum prefixo`'
  
  let add = db.get(`add_${member.id}`)
  if (add === null) add = false;
  
  if (add === true ) {
    const embed = new Discord.RichEmbed()
  .setTitle(`perfil de: ${member.username}`)
  .addField(`**BOT:**`, `${bot}`, true)
  .addField(`**Prefixo**`, `${prefixo}`, true)
  .addField(`**Descrição**`, `${descrição}`, false)
  .setFooter(`1️⃣ - altera descrição | 2️⃣ -  altera prefixo | 3️⃣ - altera nome`)
  .setTimestamp()
  .setColor(config.color)
  
  message.channel.send(embed).then(msg => {

    msg.react('1️⃣').then(() => msg.react('2️⃣')).then(() => msg.react('3️⃣'))

    const filter = (reaction, user) => {
      return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id; // caso o ID do usuário que clicou, seja igual ao do que puxou, iremos fazer a ação
    };
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) 
      .then(collected => {
        const reaction = collected.first();
      
      if (reaction.emoji.name === '1️⃣') {
        msg.delete()
        const embed1 = new Discord.RichEmbed()
        .setDescription(`Para alterar sua descrição utilize: \`${config.prefix}descrição [nova mensagem]\``)
        .setFooter('O mau uso deste comando pode resultar em ban ou warn')
        .setColor(config.color);
        
        message.channel.send(embed1);
        }
      
      if (reaction.emoji.name === '2️⃣') {
        msg.delete()
        
        const embed1 = new Discord.RichEmbed()
        .setDescription(`Para alterar o prefixo do seu bot utilize: \`${config.prefix}prefixo [novo prefixo]\``)
        .setFooter('O mau uso deste comando pode resultar em ban ou warn')
        .setColor(config.color);
        
        message.channel.send(embed1);
        }
      
      if (reaction.emoji.name === '3️⃣') {
        msg.delete()
        
        const embed1 = new Discord.RichEmbed()
        .setDescription(`Para alterar o nome do seu bot utilize: \`${config.prefix}nome [novo nome]\``)
        .setFooter('O mau uso deste comando pode resultar em ban ou warn')
        .setColor(config.color);
        
        message.channel.send(embed1);
        }
    })
  })
  } else {
    return message.channel.send(`O usuario ${member.tag} não possui um bot aprovado!`)
  }
  
}

exports.help = { 
  name: 'perfil',
  aliases: ['profile']
}