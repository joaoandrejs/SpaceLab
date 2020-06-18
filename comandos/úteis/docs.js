const superagent = require('superagent') // *Instale utilizando: npm i superagent
const qs = require('querystring') // *Instale utilizando: npm i querystring
const Discord = require("discord.js") // Puxando a livraria Discord.js

exports.run = async (client, message, args) => {


if (args.length === 0) return message.reply("escreva o que deseja que eu pesquise") // Caso o usuário não escreva nada para a pesquisa

const source = 'https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json' // Link responsável pela pesquisa
const queryString = qs.stringify({src: source, q: args.join(' ')}) // Aqui, iremos puxar o 'source' (link que puxamos acinma) junto com o argumento que o usuário pesquisou
const { body: embed } = await superagent.get(`https://djsdocs.sorta.moe/v2/embed?${queryString}`) // Iremos colocar em uma embed, o que encontrarmos

if (!embed) return message.reply("sem resultados") // Caso não consiga achar o resultado, iremos avisar
message.channel.send({embed})
}
exports.help = {
  name: "docs",
    aliases: []
}
