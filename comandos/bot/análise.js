const Discord = require('discord.js'); // Puxando a livraria Discord.js
const { color } = require('../../config.json');
const db = require('quick.db');

exports.run = (client, message, args) => {

  let canal = message.guild.channels.get('722984356133732452') // ID do canal para onde iremos enviar a análise
  
// Agora, começa as funções then!
  const embed1 = new Discord.RichEmbed()
  .setColor(color)
  .setDescription(`Para iniciarmos, qual o resultado dessa análise?`)
  
  message.channel.send(embed1).then(m => {
    let co = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}) // Verificando o ID do usuário que clicou no emoji. Caso ele seja igual ao do autor, iremos fazer a ação
    .on('collect', c => { // Definindo que coletamos
      analise = c.content // o nome dessa coleta será 'analise'
      
// Eu não preciso explicar tudo de novo :) Mesma coisa se repete!
      const embed2 = new Discord.RichEmbed()
      .setColor(color)
      .setDescription(`Qual o nome do bot que será analisado?`)
      
      message.channel.send(embed2).then(m2 => {
        let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
        .on('collect', c => {
          idbot = c.content

          const embed3 = new Discord.RichEmbed()
          .setColor(color)
          .setDescription(`Qual **ID** do criador do bot.`)
          
          message.channel.send(embed3).then(m3 => {
            let cj = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
            .on('collect', c => {
              idauto = c.content

              const embed4 = new Discord.RichEmbed()
              .setColor(color)
              .setDescription(`Você deseja continuar com a analise?\n**Não**\n**Sim**`)
              
              message.channel.send(embed4).then(m4 => {
                let ck = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
                .on('collect', c => {
                  resu = c.content

                  const embed5 = new Discord.RichEmbed()
                  .setColor(color)
                  .setDescription(`<:SLcerto:708102263901782028> Envio cancelado com sucesso!`)
                  
                  if (resu === 'Não'){
                    return message.reply(embed5)
                  } else {
        
                  // Agora é uma coisa importante... Caso o usuário queira colocar uma nota a análise, iremos deixar disponível

                    const embed6 = new Discord.RichEmbed()
                  .setColor(color)
                  .setDescription(`Fase final! Caso queria deixar alguma nota sobre a análise, escreva abaixo, caso contrário, escreva **sem** para deixar sem nada.`)
                    
                    message.channel.send(embed6).then(m5 => {
                      let cm = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
                      .on('collect', c => {
                        note = c.content
                        
                        if (note === 'sem') { // Caso o usuário escreva 'sem', iremos deixar a embed sem nota

                          let embed = new Discord.RichEmbed()

                          .setTitle(`<:SLanalise:723070886491455518> Análise`)
                          .addField(`<:SLbot:723071000106762240> **Bot**`, `${idbot}`)
                          .addField(`<:SLStaff:723071094587916369> **Criador**`, `<@${idauto}>`)
                          .addField(`<:SLScroll:723071146899013652> **Resultado**`, analise)
                          .setFooter(`Analisador: ${message.author.username}`)
                          .setColor(color)

                          canal.send(`<@${idauto}>`, embed) 
                          
                          const embed7 = new Discord.RichEmbed()
                          .setColor(color)
                          .setDescription(`<:SLcerto:708102263901782028> analise enviada!`)
                          
                          message.reply(embed7)

                        } else { // Caso ele escreva algo diferente de 'sem', iremos deixar com o que ele colocar
                          let embedi = new Discord.RichEmbed()

                          .setTitle(`<:SLanalise:723070886491455518> Análise`)
                          .addField(`<:SLbot:723071000106762240> **Bot**`, `${idbot}`)
                          .addField(`<:SLStaff:723071094587916369> **Criador**`, `<@${idauto}>`)
                          .addField(`<:SLScroll:723071146899013652> **Resultado**`, analise)
                          .addField(`<:SLScroll:723071146899013652> **Nota**`, `${note}`)
                          .setFooter(`Analisador: ${message.author.username}`)
                          .setColor(color)

                          canal.send(`<@${idauto}>`, embedi) // Enviando no canal que definimos
                          
                          const embed7 = new Discord.RichEmbed()
                          .setColor(color)
                          .setDescription(`<:SLcerto:708102263901782028> analise enviada!`)
                          
                          message.reply(embed7)
                        }
                      })
                    })
                  }
                })
              })
            })
          })
        })
      })
    })
  })
}

exports.help = {
  name: 'analise',
    aliases: ['análise']
}
