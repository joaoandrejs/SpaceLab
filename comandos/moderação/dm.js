const Discord = require('discord.js'); // Puxando a livraria Discord.js

exports.run = (client, message, args) => {
    // Requisitando a permissão Administrador (Pode colocar outra, mas prefiro essa)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`apenas administradores podem utilizar esse comando!`)
    // Agora, iremos criar a famosa função 'then'
     message.channel.send(`Mencione o membro para quem eu devo enviar.`).then(m => { // Nesse caso, nomeada de m 
        let ck = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}) // Vamos verificar se o ID do usuário que clicou é compativel com o do autor
        .on('collect', c => {
            membro = c.mentions.users.first() // Puxando o usuário que ele irá mencionar
            if (!membro){ // Caso não mencione, iremos retornar com o erro
                message.reply(`mencione um membro!`)  
            } else { // Caso ele mencione, iremos dar continuidade
                message.channel.send(`Qual a mensagem?`).then(m2 => { // E tudo se repete!
                    let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
                    .on('collect', c => {
                        mensagem = c.content
                        // Essa é uma parte importante, definindo se o usuário decida enviar em embed ou nãoi
                        message.channel.send(`Deseja que a mensagem seja em uma embed?\n**Com** - Envio em EMBED\n**Sem** - Envio sem EMBED`).then(m3 => {
                            let cd = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
                            .on('collect', c => {
                                result = c.content

                                if (result === 'Com'){ // Caso seja "Com", iremos enviar com embed
                                    let embedi = new Discord.RichEmbed()

                                    .setDescription(`${mensagem}`)
                                    .setFooter(`Staff responsável: ${message.author.username}`)
                                    .setColor('#042a59')

                                    membro.send(embedi)
                                    message.reply(`EMBED enviada na **DM** do ${membro} com sucesso!`)
                                } 

                                if (result === 'Sem'){ // Caso ele escreva 'sem' iremos enviar sem
                                    membro.send(`${mensagem}\n\nStaff responsável: \`${message.author.username}\``)
                                    message.reply(`Mensagem enviada na **DM** do ${membro} com sucesso!`)
                                }
                            })
                        })
                    })
                })
            }
        })
    })
}

exports.help = {
    name: 'dm',
    aliases: ['directmessage', 'pv']
}
