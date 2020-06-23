const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const c = require('../../config.json')

exports.run = (client, message, args) => { // setando a base

    var replies = ["Sim", "Não"]; // criando uma 'tabela' com Sim e Não
    var result = Math.floor((Math.random() * replies.length)); // puxando aquela tabela, vamos criar um sistema random, que pode cair em uma ou outra
    
    var duvida = args.slice(0).join(" "); // aqui, a pergunta do membro, partindo do argumento 0 (!args zero um)
    if (!duvida) return message.reply('<:space_x:714329904547889172> » Voce deve me perguntar algo')
  
    let embed = new Discord.MessageEmbed()
    
    .setColor('GOLD')
    .addField(`Pergunta`, `${duvida}`)
    .addField(`Resposta`, `${replies [result]}`)
    
    message.channel.send(embed)
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'pergunta',
    aliases: ['dúvida']
}
