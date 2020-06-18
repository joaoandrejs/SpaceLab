const Discord = require("discord.js"); // Puxando a livraria Discord.js
const c = require('../../config.json'); // Puxando o conteúdo do arquivo config.json
exports.run = (client, message, args) => {

// Embed para explicar o uso do comando
  let erro = new Discord.RichEmbed()

  .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
  .setDescription(`\`ban\` - Expulse um usuário`)
  .addField(`:hammer: **Uso**`, `\`${c.prefix}kick @user <motivo>\``)
  .addField(`:book: **Exemplo**`, `\`${c.prefix}kick @young goxtoso\``)
  .addField(`:bookmark: **Permissão**`, `\`KICK_MEMBERS\``)
  .setColor('#8c0046')
       // Puxando o usuário que o autor irá mencionar
       var membro = message.mentions.members.first() || message.guild.members.get(args[0]); // Puxando do argumento zero (0) 
       if (!membro) return message.channel.send(erro); // Caso o autor esqueça de mencionar o membro, iremos enviar a embed de explicação
       if (membro === message.member) return message.reply(`você não pode se banir!`) // Caso o autor tente mencionar ele mesmo
       
       var motivo = args.slice(1).join(" "); // Agora, o motivo do kick
       if (!motivo) return message.channel.send(erro); // Caso ele não escreva o motivo, iremos enviar a embed de explicação
       // Requisitando a permissão *KICK_MEMBERS* ou *EXPULSAR_MEMBROS*
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`esse comando necessita da permissão: **KICK_MEMBERS**`)
 
       let banembed = new Discord.RichEmbed()

       .setTitle(`<:DL_correto:693214719477153813> Confirmação`)
       .setDescription(`**${message.author.username}**, você realmente deseja aplicar esse banimento em **${membro.user.username}**?`)
       .setColor('AQUA')
       .setFooter(`Clique no emoji para confirmar ou espere 30s para cancelar!`)

       message.channel.send(banembed).then(msg => { // E, como quase todo arquivo, usaremos a função 'then', nomeada de 'msg'
         msg.react("👍"); // Reagindo com o emoji de legal
        // Criando um filtro, verificando quem clicou no emoji, e vendo se o ID do mesmo é compativel com o do autor
         let filtro = (reaction, usuario) => reaction.emoji.name === "👍" && usuario.id === message.author.id; 
         let coletor = msg.createReactionCollector(filtro, {max: 1, time: 30000}); // Um tempo limite de 30s

         coletor.on("collect", em => { // Com o coletor, iremos fazer a ação
             em.remove(message.author.id); // Removendo o clique do usuário no emoji
             let embed = new Discord.RichEmbed()

             .setTitle(`:hammer: Kick`)
             .setDescription(`:bust_in_silhouette: » Membro: **${membro.user.tag}**\n\n:police_officer: » Responsável: **${message.author.tag}**\n\n:notepad_spiral: » Motivo: ${motivo}`)
             .setColor('#ff5d52')
             var canal = client.channels.get('id do canal') // O canal para enviarmos a embed do kick
              canal.send(embed) // Enviando no canal a embed
              membro.kick();  // Expulsando o usuário mencionado
         });
        });
}
exports.help = {
    name: 'kick',
    aliases: ['expulsar']
}
