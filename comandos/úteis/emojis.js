const Discord = require('discord.js') // puxando a livraria Discord.js

exports.run = async (client, message, args) => { 
    try { // usando a function try, traduzindo: tentar

      // não bote nada nesses espaços, o bot vai completar, baseando-se no código abaixo
      let notAnimated = [] 
      let animated = []
  
      // puxando os emojis do servidor
      message.guild.emojis.forEach(async emoji => { // nome desse 'evento' foi dado como: emoji (irônico, não?!)
        if (emoji.animated) animated.push(emoji.toString()) // veremos quais são animados
        else notAnimated.push(emoji.toString()) // e quais não são
      })
  
      if (!animated[0]) animated = ['Nenhum'] // caso não tenha nenhum emoji animado, daremos o mesmo
      if (!notAnimated[0]) notAnimated = ['Nenhum'] // a mesma coisa com os não animados
  
      let embed = new Discord.MessageEmbed()

      .setDescription('Animados: \n' + animated.join(' ') + '\n\nNormais: \n' + notAnimated.join(' '))

      message.channel.send(embed)
    } catch (err) { // procurando algum erro
      message.channel.send('Erro :/ \n\n>' + err).catch() // caso ache, daremos como encontrado no chat
    }
  }
  
  exports.help = { 
    name: 'emojis',
    aliases: []
  }
