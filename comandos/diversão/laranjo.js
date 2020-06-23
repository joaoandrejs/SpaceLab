const Discord = require('discord.js'); // puxando a livraria 'discord.js'
var Jimp = require("jimp"); // puxando o NPM jimp (instale utilizando: npm i jimp)

exports.run = async (client, message, args) => { // setando a base com async

    if (message.content.split(' ').slice(1).join(' ').length < 1) { // definindo um argumento | caso os caracteres sejam menor q um
        message.reply(`<:space_x:714329904547889172> » você precisa escrever a primeira palavra do bebê`) // caso o membro nao escreva algo para por na imagem
    } else { 
        if (message.content.split(' ').slice(1).join(' ').length > 50) { // caso os caracteres sejam maior que 50
            message.reply(`<:space_x:714329904547889172> » você ultrapassou o limite de 50 caracteres.`)
        } else {
            if (message.member.hasPermission('ATTACH_FILES')) { // requisitando a permissao: ATTACH_FILES
                var authorMessage = message
                message.channel.send('Processando...').then(message => { // uma brincadeira, q iremos excluir essa mensagem e por outra
                    // imagem que puxaremos, no caso, do Laranjo
                    Jimp.read(`https://media.discordapp.net/attachments/689750456695914586/691077705071984710/295364123043211.png?width=540&height=482`, function (err, image) {
                        if (err) message.channel.send('Ocorreu um erro ao criar a imagem.') // caso ocorra um erro ao criar a imagem
                        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) { // setando o tipo da fonte
                            image.print(font, 23, 310, authorMessage.content.split(' ').slice(1).join(' '), 320) // mexendo no local da fonte
                            var aguardeMessage = message // criando umaa nova mensagem
                            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => { // mudando para PNG a imagem e botando um buffer
                                const attachment = new Discord.Attachment(buffer, 'laranjo.png') // o nome da imagem gerada
                                message.channel.send(attachment).then(message => { // e por fim, a imagem
                                    aguardeMessage.delete() // deletando a mensagem do inicio
                                })
                            })
                        })
                    })
                })
            } else {
                message.channel.send('Você precisa da permissão de `ATTACH_FILES` para utilizar este comando.') // caso o bot nao possua permissao
            }
        }
    }
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'laranjo',
    aliases: []
}
