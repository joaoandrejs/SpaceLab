const Discord = require("discord.js"); // Puxando a livraria Discord.js
const { color } = require("../../config");
const db = require("quick.db");
const ms = require('parse-ms');

exports.run = (client, message, args) => {
  let add = db.get(`add_${message.author.id}`);
  if (add === null) add = false;
  
  if (add === true ) {// ID de usuários que foram bloqueados te utilizar esse comando
    //if (add.includes(message.author.id) || message.author.bot)
      return message.reply(
        `Você ja possui um bot dentro de nossa BOT List.`
      );
  } else {
    
    let timeout = 86400000 // O tempo que poderá ser utilizado o comando, (24 horas em mili segundos
        let daily = db.fetch(`reper_${message.author.id}`);
    
       if (daily !== null && timeout - (Date.now() - daily) > 0) { // pegando o 'daily' e verificando se o timeout expirou
         let time = ms(timeout - (Date.now() - daily)); // definindo os tempos na variável 'time'
           
           message.reply(`Seu bot ja foi reprovado hoje, Você deve esperar: **${time.hours}h ${time.minutes}m ${time.seconds}s** para adicionar seu bot novamente!`)
       } else {
         
         
    let numero = db.get(`numero_${message.guild.id}`)
    if (numero === null) numero = 0;
    
    // Puxando o ID do canal aonde iremos enviar para a análise
    let canal = client.channels.cache.get("722984343919657010");

    const embidodo = new Discord.MessageEmbed()
      .setDescription(
        "<:SLcerto:708102263901782028> verifique suas mensagens diretas!\n\n> Lembre-se de deixar seu bot online.\n**Caso eu pare de responder utilize o comando novamente.**"
      )
      .setColor("290a40");

    message
      .reply(embidodo)
      .then(message => setTimeout(() => message.delete(), 15000));
    message.delete();

    console.log(`${message.author.username} solicitou uma analise`);

    // Começando, pedindo o prefixo do bot
    const embed1 = new Discord.MessageEmbed()
      .setDescription("Para começarmos, qual o prefixo do seu bot?")
      .setColor(color);

    message.author
      .send(embed1)
      .then(m => {
        let cj = message.author.dmChannel
          .createMessageCollector(x => x.author.id === message.author.id, {
            max: 1
          }) // Verificando se o ID do usuário que clicou, é igual ao do autor
          .on("collect", c => {
            prefixo = c.content; // Definimos o nome do resultado como 'prefixo'
            // Agora, a 'biografia' do bot

            const embed2 = new Discord.MessageEmbed()
              .setDescription("Digite uma breve descrição sobre seu bot.")
              .setColor(color);

            message.author.send(embed2).then(m2 => {
              let cp = message.author.dmChannel
                .createMessageCollector(
                  x => x.author.id === message.author.id,
                  { max: 1 }
                ) // Mesma coisa, verificar se o ID do usuário que clicou, é igual ao do autor
                .on("collect", c => {
                  desc = c.content; // Definimos como 'desc'
                  // E vamos repetindo tudo

                  const embed3 = new Discord.MessageEmbed()
                    .setDescription("Qual o nome do seu bot?")
                    .setColor(color);

                  message.author.send(embed3).then(m3 => {
                    let ch = message.author.dmChannel
                      .createMessageCollector(
                        x => x.author.id === message.author.id,
                        { max: 1 }
                      )
                      .on("collect", c => {
                        nome = c.content; // O nome desse é 'nome' (Irônicamente)

                        const embed4 = new Discord.MessageEmbed()
                          .setDescription(
                            "Qual comando que mostra a lista com todos os comandos?"
                          )
                          .setColor(color);

                        message.author.send(embed4).then(m6 => {
                          let ci = message.author.dmChannel
                            .createMessageCollector(
                              x => x.author.id === message.author.id,
                              { max: 1 }
                            )
                            .on("collect", c => {
                              lista = c.content; // E o desse é 'lista'

                              // Agora, iremos pegar o ID do bot, para gerarmos o convite de invite, com o bot sem permissões de Administrador para o teste
                              const embed5 = new Discord.MessageEmbed()
                                .setDescription("Escreva o **ID** do seu bot.")
                                .setColor(color);

                              message.author.send(embed5).then(m4 => {
                                let cs = message.author.dmChannel
                                  .createMessageCollector(
                                    x => x.author.id === message.author.id,
                                    { max: 1 }
                                  )
                                  .on("collect", c => {
                                    convite = c.content;
                                    // Caso o usuário tenha escrito algo errado, ela terá a chance de cancelar

                                    const embed6 = new Discord.MessageEmbed()
                                      .setDescription(
                                        `Final! Deseja **enviar** ou **cancelar** o pedido?\n\n**cancelar** = Cancela o pedido\n**enviar** = Envia o pedido`
                                      )
                                      .setColor(color);

                                    message.author.send(embed6).then(m4 => {
                                      let cps = message.author.dmChannel
                                        .createMessageCollector(
                                          x =>
                                            x.author.id === message.author.id,
                                          { max: 1 }
                                        )
                                        .on("collect", c => {
                                          final = c.content;

                                          if (final === "cancelar") {
                                            // Caso o usuário escreva 'cancelar'

                                            const embed7 = new Discord.MessageEmbed()
                                              .setDescription(
                                                `Cancelei o seu pedido :thumbsup:`
                                              )
                                              .setColor(color);

                                            message.author.send(embed7);
                                          } else {
                                            // Caso o usuário decida enviar

                                            let embed = new Discord.MessageEmbed()

                                              .setTitle(
                                                `:hammer: Clique aqui para adicionar`
                                              )
                                              .setURL(
                                                `https://discordapp.com/oauth2/authorize?client_id=${convite}&scope=bot&permissions=0`
                                              )
                                              .setDescription(`${desc}`)
                                              .addField(`**Prefixo**`, prefixo)
                                              .addField(`**Nome do bot**`, nome)
                                              .addField(
                                                `**Comando de menu de ajuda**`,
                                                lista
                                              )
                                              .addField(
                                                `**Id do criador**`,
                                                `${message.author.id}`
                                              )
                                              .setFooter(
                                                `Enviado por: ${message.author.username}`,
                                                message.author.avatarURL
                                              )
                                              .setColor(color);

                                            canal.send(embed); // Enviando a embed no canal de análise
                                            const embedc = new Discord.MessageEmbed()
                                              .setDescription(
                                                `<:SLcerto:708102263901782028> Seu bot foi enviado para a análise! :thumbsup:`
                                              )
                                              .setColor(color);

                                            //2 canal para enviar a analise!
                                            let canal2 = client.channels.cache.get(
                                              "722984356943233054"
                                            );
                                            canal2.send(
                                              `Bot \`${nome}\` de: \`${message.author.tag}\` de numero: \`${numero}\` foi enviado para analise!`
                                            ).then(msg => {
                                              db.add(`numero_${message.guild.id}`, 1);
                                            });

                                            message.author.send(embedc);
                                          }
                                        });
                                    });
                                  });
                              });
                            });
                        });
                      });
                  });
                });
            });
          });
      })
      .catch(() => message.channel.send(`<@${message.author.id}>`, erroembed));
    const erroembed = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(
        `<:space_x:714329904547889172> » Suas mensagens privadas estão bloqueadas, Ative nas suas configurações de Privacidade e Segurança!`
      );
    
    }}
};

exports.help = {
  name: "addbot",
  aliases: []
};
