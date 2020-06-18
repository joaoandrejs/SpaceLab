const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const c = require('../../config.json')

exports.run = (client, message, args) => {

  let erro = new Discord.RichEmbed()

  .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
  .setDescription(`\`clear\` - Crie um texto com letras grandes`)
  .addField(`:hammer: **Uso**`, `\`${c.prefix}clear <número de 2 à 100>\``)
  .addField(`:book: **Exemplo**`, `\`${c.prefix}clear 100\``)
  .addField(`:bookmark: **Permissão**`, `\`MANAGE_MESSAGES\``)
  .setColor('#8c0046')   

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`você precisa da permissão \`MANAGE_MESSAGES\`.`); // caso o autor não possua a permissão 'GERENCIAR_MENSAGENS', vamos avisar para ele
    let clean = args.slice(0).join(' '); // puxando uma quantidade de numero, partindo dos argumentos zero
 // caso o membro bote um numero menor que 2, ou maior que 100, pediremos um numero acima
    if (clean < 2 || clean > 100) return message.reply(erro)
    // caso o membro não escreva um numero
    if (args.length === 0) return message.reply(erro) 
    try { // utilizando a function 'try', traduzindo: tentar
        message.channel.bulkDelete(clean) // tentaremos deletar a quantia que o membro pediu
        // enviando uma embed
        let embed = new Discord.RichEmbed()

        .setTitle(`:broom: LIMPEZA`)
        .setDescription(`Limpei um total de \`${clean}\` mensagens.`)
        .setColor('#0000')
        .setFooter(`Responsável: ${message.author.username}`)

        message.channel.send(embed)
    } catch(e){ // procurando um erro
        console.log(e); // caso consiga encontrar, daremos o erro
    }
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'clear',
    aliases: ['limpar', 'clean']
}
