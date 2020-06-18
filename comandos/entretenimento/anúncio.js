const Discord = require("discord.js"); // puxando a livraria 'discord.js'
const { color } = require('../../config.json')

exports.run = (client, message, args) => { // setando a base
 // requisitando uma permissao, no caso, 'ADMINISTRADOR'
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<:space_x:714329904547889172> » Você deve possuir a permissão de: \`ADMINISTRATOR\` para utilizar este comando.`) // caso o autor nao possua, vamos dar o erro
             
  const embed1 = new Discord.RichEmbed()
  .setDescription(`digite o título desse anúncio.`)
  .setColor(color);
  
               message.reply(embed1).then(msg2 => { // adicionando o then, setaremos um nome para o evento
                 let cj = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1}) // criando um messageCollector
                 .on('collect', c => { // iniciando um evento
                   titulo = c.content // puxando o conteudo que o membro digitou
             
                   const embed2 = new Discord.RichEmbed()
                   .setDescription(`digite a mensagem desse anúncio.`) 
                   .setColor(color);
                   
               message.reply(embed2).then(msg3 => { // criando mais um then, com nome do evento
                   let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1}) // criando um messageCollector
                   .on('collect', c => { // mais um evento
                       mensagem = c.content // um conteudo da mensagem

                            let embed = new Discord.RichEmbed()

                            .setTitle(titulo)
                            .setDescription(mensagem)
                            .setFooter(`Anúncio feito por: ${message.author.username}`, message.author.avatarURL)
                            .setColor('RANDOM')

                            message.channel.send(`@everyone`, embed)
                 })
              })
                 })
           })
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'anuncio',
    aliases: ['anúncio', 'anunciar']
}
