const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const fetch = require("node-fetch"); // puxando o NPM node-fetch (instale utilizando: npm i node-fetch)

exports.run = async (client, message, args) => { // setando a base
    let user = args[0]; // puxando um @ desse tweet
    let text = args.slice(1).join(" ") || undefined; // aqui, a mensagem do tweet
    if (!user) return message.reply("você precisa fornecer um usuário para o tweet."); // caso ele nao mencione um @
    if (user.startsWith("@")) user = args[0].slice(1); // definindo se o nome da conta comecar com @, sera dado como um usuario real
    const type = user.toLowerCase() === "realdonaldtrump" ? "trumptweet" : "tweet"; // algumas contas que adicionaremos um simbolo de verificado
    const u = user.startsWith("@") ? user.slice(1) : user; // veremos se o membro com @ eh real ou nao
    if (!text) return message.reply("você precisa informar o tweet."); // caso o membro n bote um texto para o tweet
    message.channel.startTyping(); // puxando o tweet q o membro botou
    // um link de tweet, tipo um API mas n
    fetch(`https://nekobot.xyz/api/imagegen?type=${type}&username=${u}&text=${encodeURIComponent(text)}`)
        .then(res => res.json()) // puxando o tweet e o @
        .then(data => message.channel.send({ // enviando com o tweet e @ prontos
            file: data.message
        }))
        .catch(err => { // procurando um erro
            this.client.logger.error(err.stack); // caso encontre, o filtraremos abaixo e avisaremos
            message.channel.stopTyping(true);
            return this.client.embed("APIError", message);
        });
    message.channel.stopTyping(true);
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'tweet',
      aliases: []
}
