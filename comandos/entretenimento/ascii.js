const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const fetch = require("node-fetch"); // puxando o NPM 'node-fetch' (instale utilizando: npm i node-fetch)
const c = require('../../config.json')

exports.run = async (client, message, args) => { // setando a base, mas com a function async
    
    let text = encodeURIComponent(args.join(' ')); // puxando os argumentos
    // caso o membro nao escreva algo
    if (!text) return message.channel.send(':x: Você deve me dizer um texto para que eu possa transformar em ascii');
    // caso o texto ultrapasse os limites
    const tooLong = `O texto é muito longo, tente um texto menor.`;
    // setando um link do heroku
    fetch(`http://artii.herokuapp.com/make?text=${text}`)
        .then(res => res.text()) // formando o texto
        .then(body => { // corpo
            if (body.length > 2000) return message.channel.send(tooLong); // enviamos a mensagem de ultrapassar limites
            return message.channel.send(body, { // por fim, o ASCII
                code: "fix"
            });
        })
        .catch(error => {
            this.client.logger.error(error); // caso haja um erro, filtraremos ele e enviaremos abaixo
            return message.channel.send(text.general.error.replace(/{{err}}/g, error.message));
        });
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'ascii',
    aliases: []
}
