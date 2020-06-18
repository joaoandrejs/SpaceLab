const Discord = require('discord.js');
const c = require('../../config.json')

exports.run = (client, message, args) => {
// Embed de explicação do comando
  let erro = new Discord.RichEmbed()

  .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
  .setDescription(`\`say\` - Deixe-me replicar o que tu falar`)
  .addField(`:hammer: **Uso**`, `\`${c.prefix}say <texto>\``)
  .addField(`:book: **Exemplo**`, `\`${c.prefix}say Young is lindo\``)
  .addField(`:bookmark: **Permissão**`, `\`ADMINISTRATOR\``)
  .setColor('#8c0046') 
 // Para não deixarmos que abusem, iremos definir que apenas ADMINISTRADORES podem utilizar
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`apenas ADMINISTRADORES podem utilizar esse comando!`)

    var fala = args.slice(0).join(' '); // Puxando um argumento, que seria o que o usuário irá escrever
    if (!fala) return message.reply(erro) // Caso ele não escreva, iremos enviar a embed e explicação
  
    let embed = new Discord.RichEmbed() // Enviando em embed
    
    .setDescription(fala)
    .setColor('#00000')
    
    message.channel.send(embed)
    message.delete() // Deletando o pedido do comando (dl.say)

}

exports.help = {
    name: 'say',
    aliases: ['falar']
}
