const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");

exports.run = (client, message, args) => {
  
  //Criando uma let para puxar toda mensagem que o usuario dizer...
  let mensagem = args.slice(0).join(" ");
  
  //embed para se o usuario nao dizer nada...
  const erro = new Discord.MessageEmbed()
  .setDescription(`Você deve inserir uma nova mensagem!`)  
  .setColor(config.color);

  // Se não dizer nada...
  if (!mensagem) {
    message.channel.send(erro);
  }

  //Puxando na database se o usuario possui um bot dentro do servidor!
  let add = db.get(`add_${message.author.id}`);
  //E se ele não possuir o bot retornara:
  if (add === null) return message.reply(`Você deve possuir um bot para alterar a descrição!`);
  
  //Enviando um embed para perguntar, (Para não alterar de uma vez)
  const embed = new Discord.MessageEmbed()
    .setDescription(`Você deseja alterar a sua descrição para:\n\n ${mensagem}`)
    .setColor(config.color);
  
                          //mesma coisas dos outros comandos...
  message.channel.send(embed).then(msg => {
    // Colocando os emojis
    msg.react("708102263901782028").then(() => msg.react("708102338807726092"));

    const filter = (reaction, user) => {
      return (
        ["708102263901782028", "708102338807726092"].includes(
          reaction.emoji.id
        ) && user.id === message.author.id
      );
    };
    msg
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.id === "708102263901782028") {
          msg.delete();

          const embed = new Discord.MessageEmbed()
            .setDescription(`Descrição alterada com sucesso!\n\nUtilize SL!perfil novamente para ver a alteração`)
            .setColor(config.color);
          message.channel.send(embed);
          db.set(`desc_${message.author.id}`, mensagem);
        } else {
          msg.delete();
          message.channel.send("Comando cancelado");
        }
      })
      .catch(collected => {
        // Apos o tempo acabar...
        message.reply(
          "O tempo de reações acabou!, utilize o comando novamente ;)"
        );
      });
  });
};
exports.help = {
  name: "descrição",
  aliases: []
};
