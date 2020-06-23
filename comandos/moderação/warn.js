const Discord = require('discord.js') // Puxando a livraria Discord.js

exports.run = (client, message, args) => {

    var canal = client.channels.cache.get('ID do Canal'); // Puxando o canal aonde iremos enviar que o usuário tomou um warn
   // Requisitando a permissão de Administrador
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`<:space_x:714329904547889172> » apenas administradores podem utilizar esse comando!`)
    // Puxando o usuário que iremos dar o Warn
    var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]); // puxando do argumento zero (0)
    if (!membro) return message.reply(`mencione um usuário!`) // caso ele não mencione ninguém
   if (membro === message.member) return message.reply(`<:space_x:714329904547889172> » mencione alguém que não seja você mesmo!`) // caso ele mencione a si memso

    var motivo = args.slice(1).join(' '); // Puxando o motivo do warn
    if (!motivo) return message.reply(`<:space_x:714329904547889172> » escreva alguma coisa para esse warn`); // Caso ele não escreva o motivo

// Embed do Warn, enviado no canal 
    let embedi = new Discord.MessageEmbed()

    .setTitle(`Warn`)
    .setDescription(`**${membro.user.username}** tomou um **Warn** de **${message.author.username}**!\n\n🔎 » Motivo: ${motivo}`)
 // Enviando no privado do usuário
    let embed = new Discord.MessageEmbed()

    .setTitle(`Warn`)
    .setDescription(`${motivo}`)
    .setFooter(`Staff responsável: ${message.author.username}`)

    membro.send(embed) // Enviando pro usuário
    canal.send(embedi) // Enviando no canal
    message.reply(`warn enviado com sucesso! :thumbsup:`)
}

exports.help = {
    name: 'warn',
      aliases: ['aviso']
}
