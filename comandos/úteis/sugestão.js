const Discord = require("discord.js"); // puxando a livraria Discord.js
const ms = require("ms"); // puxando o NPM ms *Instale utilizando: npm i ms

exports.run = async (client, message, args) => {
  //Puxando o id do canal
  let canal = client.channels.cache.get("722984336864968725");

  //Mensagem que sera enviada
  let sug = args.slice(0).join(" ");

  //criando um if para não ter bugs
  if (sug) {
    //criando a embed
    const embed = new Discord.MessageEmbed()  
    .setTitle(`Sugestão:`)
    .setDescription(sug)
    .setFooter(`Sugestão enviada por: ${message.author.tag}`)
    .setColor("GREEN");

    //enviando a mensagem
    canal.send(embed).then(msg => { //Criando um then para quando a mensagem for enviada for reagida automaticamente
      
      //Colocando as reações
      msg.react("👍").then(() => msg.react("👎"));
      
    });
  } 
  else {
    //Se o usuario não dizer nada ele retornara esta mensagem
    return message.channel.send(
      "Você deve me dizer algo para enviar para sugestão!"
    );
  }
};

exports.help = {
  name: "sugestão",
  aliases: ["sug", "sugerir", "sugestao"]
};
