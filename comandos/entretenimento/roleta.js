const Discord = require("discord.js"); // puxando a livraria 'discord.js'

exports.run = (client, message, args) => { // setando a base

    var random = Math.floor(Math.random() * (5 - 2) + 2); // criando um sistema random, fazendo uma continha basica
    if (random === 3){ // caso essa conta termine em 3, daremos como sortudo

        message.channel.send(`Rodou o cartucho e você **SOBREVIVEU**! :sweat_smile:`)
    }
    else{ // caso contrario... MORTO!
        message.channel.send(`Rodou o cartucho e você **MORREU**! :cry:`)
      }
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'roleta',  
    aliases: []
}
