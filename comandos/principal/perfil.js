const Discord = require("discord.js");
const config = require('../../config.json');
const db = require('quick.db');

exports.run = (client, message, args) => {
  let member = message.mentions.users.first() || message.author// Se não mencionar nenhum usuario mostrara o saldo do autor.
  
  //Puxando o nome do bot setado...
  let bot = db.get(`bot_${member.id}`);
  //Para não mostrar null no comando
  if (bot === null) bot = '`Não possui nenhum bot`';
  
  //Puxando a descrição setada
  let descrição = db.get(`desc_${member.id}`);
  //para não mostrar null no comando
  if (descrição === null) descrição = '`Nenhuma descrição`';
  
  //Puxando o prefixo que o usuario setou...
  let prefixo = db.get(`prefix_${member.id}`);
  //Para nao mostrar null no comando
  if (prefixo === null) prefixo = '`Nenhum prefixo`'
  
  //Puxando se o usuario possui um bot no servidor...
  let add = db.get(`add_${member.id}`)
  //Se for null ele mostraá false
  if (add === null) add = false;
  
  //Se o usuario possuir um bot ele mostrára tudo certinho...
  if (add === true ) {
    const embed = new Discord.MessageEmbed()
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
         
        const embed1 = new Discord.MessageEmbed()
        .setDescription(`Para alterar sua descrição utilize: \`${config.prefix}descrição [nova mensagem]\``)
        .setFooter('O mau uso deste comando pode resultar em ban ou warn')
        .setColor(config.color);
        
        message.channel.send(embed1);
        }
      
      if (reaction.emoji.name === '2️⃣') {
         
        
        const embed1 = new Discord.MessageEmbed()
        .setDescription(`Para alterar o prefixo do seu bot utilize: \`${config.prefix}prefixo [novo prefixo]\``)
        .setFooter('O mau uso deste comando pode resultar em ban ou warn')
        .setColor(config.color);
        
        message.channel.send(embed1);
        }
      
      if (reaction.emoji.name === '3️⃣') {
         
        
        const embed1 = new Discord.MessageEmbed()
        .setDescription(`Para alterar o nome do seu bot utilize: \`${config.prefix}nome [novo nome]\``)
        .setFooter('O mau uso deste comando pode resultar em ban ou warn')
        .setColor(config.color);
        
        message.channel.send(embed1);
        }
    })
  })
  } else { // Se não possuir ele retornará isto...
    return message.channel.send(`O usuario ${member.tag} não possui um bot aprovado!`)
  }
  
}

exports.help = { 
  name: 'perfil',
  aliases: ['profile']
}