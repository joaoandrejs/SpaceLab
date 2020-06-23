const Discord = require('discord.js'); // puxando a livraria Discord.js

exports.run = (client, message, args) => { 

    // como esse comando adiciona um cargo, precisamos pegar o ID de um cargo
    let role = message.guild.roles.cache.get('723328595174359111'); // adicione o ID de um cargo dentro desse espaco!

    message.channel.send(`Olá ${message.author}, Clique na reação para poder ser notificado de todas as novidades!`).then(m => { // criando um evento, vamos fazer um reaction role
        m.react('723327448220958802') // reagindo a essa mensagem
 
        // criando um filtro, para ver quem clicou
        let filtro = (reaction, usuario) => reaction.emoji.id === "723327448220958802" && usuario.id === message.author.id; 
        // com tudo filtrado, iremos coletar tudo
        let coletor = m.createReactionCollector(filtro, {max: 1});

        // e fechar a ação
        coletor.on("collect", e => { // com um evento! (nomeamos ele de: 'e') 
        e.remove(message.author.id); // removeremos o clique do membro
        if (message.member.roles.has(role.id)) { // caso esse membro ja possua esse cargo vamos dar o erro
            message.member.removeRole(role.id);
            message.reply('Você já possuia o cargo e por isso eu retirei ele!')
        } else { // caso ele n tenha
            message.member.addRole(role.id); // vamos adicionar e 
            message.reply(`Agora você ficará sabendo de todas as novidades!`) // avisar pra ele
        }
    })
  })
}
exports.help = {
    name: 'cargo',
    aliases: ['notificar', 'notificação', 'notify']
}