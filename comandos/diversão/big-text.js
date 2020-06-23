const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const num_conv = require('number-to-words'); // puxando o NPM 'number-to-words' (instale utilizando: npm i number-to-words)
const c = require('../../config.json')

exports.run = async (client, message, args) => { // setando as bases

    let output = args.join(' '); // criando um argumento, no caso, o que o membro deseja falar
    if (!output) // caso não escreva, daremos o erro
        return message.reply('<:space_x:714329904547889172> » Voce deve me dizer um texto para deixar grande')

    let bigtext_arr = new Array(); // criaremos uma array
    for (let i = 0; i < output.length; i++) { // puxando numeros, para adicionarmos 
        let isnumber = await parseInt(output[i]); // definimos acima, 'i' e puxamos aqui a quantia de letras possiveis
        if (isnumber >= 0 && isnumber <= 9) // caso ultrapasse o limete, daremos o erro
            bigtext_arr.push(`:${num_conv.toWords(output[i])}:`)
        else { 
            if (output[i] !== ' ') { // dentro, ficarai o texto
                if (!output[i].match(/^[a-zA-Z]+$/)) // regex para entradas alfabéticas
                    bigtext_arr.push(`:question:`)
                else
                    bigtext_arr.push(`:regional_indicator_${output[i].toLowerCase()}:`)
            } else bigtext_arr.push('   '); // puxando os detalhes
        }
    }

    try {
        await message.channel.send(bigtext_arr.join('')); // enviando a mensagem com as letras grandes
        return message.delete() // deletando o pedido do membro (!bigtext <edsd>)
    } catch (e) { // procurando algum erro
        return message.reply(`Ouve um erro e não consegui criar.`) // caso tenha algum erro
    }
}
exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'letras',
    aliases: ['bigtext']
}
