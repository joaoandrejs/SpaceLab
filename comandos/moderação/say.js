const Discord = require('discord.js');
const c = require('../../config.json')

exports.run = (client, message, args) => {
  
 // Para não deixarmos que abusem, iremos definir que apenas ADMINISTRADORES podem utilizar
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Você deve possuir a permissão de: ADMINISTRADORES podem utilizar esse comando!`)

    var fala = args.slice(0).join(' '); // Puxando um argumento, que seria o que o usuário irá escrever
    if (!fala) return message.reply('<:space_x:714329904547889172> » Você deve me dizer algo para enviar') // Caso ele não escreva, iremos enviar a embed e explicação
  
    let embed = new Discord.MessageEmbed() // Enviando em embed
    
    .setDescription(fala)
    .setColor('#00000')
    
    message.channel.send(embed)
    message.delete() // Deletando o pedido do comando

}

exports.help = {
    name: 'say',
    aliases: ['falar']
}
