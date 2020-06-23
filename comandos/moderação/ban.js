const Discord = require("discord.js"); // Puxando a livraria Discord.js
const c = require('../../config.json'); // Puxando o conteúdo do arquivo config.json
exports.run = (client, message, args) => {
  
       // Puxando o usuário que o autor irá mencionar
       var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]); // Puxando do argumento zero (0) 
       if (!membro) return message.channel.send('<:space_x:714329904547889172> » Você deve mencionar um usuario!'); // Caso o autor esqueça de mencionar o membro, iremos enviar a embed de explicação
       if (membro === message.member) return message.reply(`você não pode se banir!`) // Caso o autor tente mencionar ele mesmo
       
       var motivo = args.slice(1).join(" "); // Agora, o motivo do banimento
       if (!motivo) return message.channel.send('<:space_x:714329904547889172> » Você deve me dizer um motivo'); // Caso ele não escreva o motivo, iremos enviar a embed de explicação
       // Requisitando a permissão *BAN_MEMBERS* ou *BANIR_MEMBROS*
       if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`:x: Você precisa da permissão de: **BAN_MEMBERS** para utilizar este comando`)
  
    // Agora, a embed de confirmação
       let banembed = new Discord.MessageEmbed()

       .setTitle(`Confirmação`)
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
             const embed = new Discord.MessageEmbed()

             .setTitle(`:hammer: Ban`)
             .setDescription(`:bust_in_silhouette: » Membro: **${membro.user.tag}**\n\n:police_officer: » Responsável: **${message.author.tag}**\n\n:notepad_spiral: » Motivo: ${motivo}`)
             .setColor('#ff5d52')
             
             
             let canal = client.channels.cache.get('id do canal') // O canal para enviarmos a embed do ban
              canal.send(embed) // Enviando no canal a embed
              membro.ban();  // Banindo o usuário mencionado
         });
        });
}
exports.help = {
    name: 'ban',
    aliases: ['banir', 'punir']
}
