const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const c = require('../../config.json')

exports.run = (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`você precisa da permissão \`MANAGE_MESSAGES\`.`); // caso o autor não possua a permissão 'GERENCIAR_MENSAGENS', vamos avisar para ele
    let clean = args.slice(0).join(' '); // puxando uma quantidade de numero, partindo dos argumentos zero
 // caso o membro bote um numero menor que 2, ou maior que 100, pediremos um numero acima
    if (clean < 2 || clean > 100) return message.reply('Vocẽ deve me indicar um numero entre 2 a 100!')
    // caso o membro não escreva um numero
    if (args.length === 0) return message.reply('Vocẽ deve me indicar um numero entre 2 a 100!')
    try { // utilizando a function 'try', traduzindo: tentar
        message.channel.bulkDelete(clean) // tentaremos deletar a quantia que o membro pediu
        // enviando uma embed
        let embed = new Discord.MessageEmbed()

        .setTitle(`:broom: Faxineira passando`)
        .setDescription(`Limpando o total de: \`${clean}\` mensagens.`)
        .setColor(c.color)
        .setFooter(`Moderador: ${message.author.username}`)

        message.channel.send(embed)
    } catch(e){ // procurando um erro
        console.log(e); // caso consiga encontrar, daremos o erro
    }
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'clear',
    aliases: ['limpar', 'clean']
}
