const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

let token = process.env.TOKEN;

fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(err);

  let arquivojs = files.filter(f => f.split(".").pop() == "js");
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/${f}`);
    console.log(`${f} - COMANDO INICIADO`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./comandos/bot/", (err, files) => {
    if (err) console.error(err);

  let arquivojs = files.filter(f => f.split(".").pop() == "js");
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/bot/${f}`);
    console.log(`${f} - BOTS INICIADOS`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

fs.readdir("./comandos/entretenimento/", (err, files) => {
    if (err) console.error(err);

  let arquivojs = files.filter(f => f.split(".").pop() == "js");
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/entretenimento/${f}`);
    console.log(`${f} - ENTRETERIMENTO INICIADO`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

fs.readdir("./comandos/moderação/", (err, files) => {
    if (err) console.error(err);

  let arquivojs = files.filter(f => f.split(".").pop() == "js");
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/moderação/${f}`);
    console.log(`${f} - MODERAÇÃO INICIADO`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

fs.readdir("./comandos/úteis/", (err, files) => {
    if (err) console.error(err);

  let arquivojs = files.filter(f => f.split(".").pop() == "js");
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/úteis/${f}`);
    console.log(`${f} - UTEIS INICIADO`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

// um evento ready, que traduzindo, fica 'pronto'. Como ele diz, iremos criar o evento para verificar se o bot está pronto para ligar.
client.on('ready', () => { // setando o evento com nosso Discord.Client
    // agora, iremos criar uma presence para nosso bot, porém, vai ser alternativa. Ou seja, alternando entre o que colocarmos abaixo
    var tabela = [ // criando uma variavel, nomeada de tabela 

// uma notinha: toda vez que for criar uma nova presence na nossa tabela, bote uma vírgula no final!
        {name: 'SpaceLab', type: 'PLAYING'},
        {name: 'Musica com os membros', type: 'LISTENING'},
        {name: 'meu prefixo e: SL!', type: 'WATCHING'}/*
        {name: 'amor para todos!', type: 'STREAMING', url: 'https://twitch.tv/olimpiioo'}*/
    ];
// criando uma function...
    function setStatus() { // nomeamos ela de: setStatus
        // agora, iremos criar um sistema randômico, alternando entre as opções que criamos para a tabela
        var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
        client.user.setPresence({game: altstatus}) // por fim, setando a presence. No caso, o jogo é a variavel que criamos 'altstatus'
    }
    setStatus(); // para finalizar, puxamos a function que criamos no inicio
    setInterval(() => setStatus(), 15000) // e adicionamos um intervalo entre as presences
  
  console.log(`${client.user.tag} foi iniciado com sucesso`); // caso não haja erro, o bot enviara no console que ligou
});  

client.on('guildMemberAdd', (membro, message) => { // definimos o nome desse evento, como: membro
    let canal = client.channels.get("722984322411528225"); // puxamos o ID do canal, onde enviaremos a embed, para o canal de boas-vindas
    let cargo = membro.guild.roles.get(""); // puxamos o ID de um cargo, no qual, iremos adicionar para o membro
// criando a embed de boas-vindas!
    let embedi = new Discord.RichEmbed()
    
    .setTitle(`:wave: Sejá muito bem vindo!`) 
    .setDescription(`Olá **${membro.user.username}**, seja muito bem vindo(a) ao \`🌟 Space Lab - Discord Developers\`! 

Somos uma comunidade de programadores, Focada em puro aprendizado e conhecimento. Espero que você tire todas as suas duvidas e aprenda sempre mais`) 
    .setThumbnail(membro.displayAvatarURL)
    .setColor('BLUE')
    .addField(`**Informaçoes**`, `:busts_in_silhouette: Usuários: \`${membro.guild.memberCount}\``)
    
    canal.send(`<@${membro.user.id}>`,embedi)
});

client.on('guildMemberRemove', membro => { // setamos o nome de membro
    var canal = client.channels.get("722984324013621300"); // puxando o ID de um canal para enviar a mensagem
    var server = client.guilds.get
    // criando uma embed
    let embed = new Discord.RichEmbed()

    .setTitle(`Tchau`)
    .setDescription(`Infelizmente o usuario \`${membro.user.tag}\` saiu de nossa comunidade, agora, estamos com \`${membro.guild.memberCount}\` usuários no \`🌟 Space Lab - Discord Developers\`!`)
    .setColor('RED')
    .setFooter(`ID do Usuário: ${membro.id}`)

    canal.send(embed)

});

client.on('guildMemberRemove', member => {
    let myGuild = client.guilds.get('700838458129776680');
    let memberCountChannel = myGuild.channels.get('722984345220153364') 
    let memberCount = memberCountChannel.guild.memberCount;
    memberCountChannel.setTopic(`**Atualmente estamos com: ${memberCount} usuarios em nossa comunidade!**`)
    .catch(error => console.log(error))
})
client.on('guildMemberAdd', member => {
    let myGuild = client.guilds.get('700838458129776680');
    let memberCountChannel = myGuild.channels.get('722984345220153364') 
    let memberCount = memberCountChannel.guild.memberCount;
    memberCountChannel.setTopic(`**Atualmente estamos com: ${memberCount} usuarios em nossa comunidade!**`)
    .catch(error => console.log(error))
})

client.on('message', message => { // nome desse evento, foi setado como: message
    if (message.author.bot) return; // puxando o nome definido, bloquearemos o uso de comandos por outros bots
    if (message.channel.type === "dm") return; // caso seja uma mensagem privada ao nosso bot, não retornaremos

  
  let mention = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
  
  mention.find(mention => {
    if (message.content === mention) {
      
      const embed = new Discord.RichEmbed()
        .setDescription(
          `Oi ${message.author} eu sou o bot principal do servidor: \`${message.guild.name}\`!`
        )
        .setColor(`BLUE`);

      message.channel.send(embed);
    }
  });
  
    let prefix = config.prefix; // puxando o prefixo do nosso bot
    
  let args = message.content.substring(config.prefix.length).split(" ");
  
    if (!message.content.startsWith(config.prefix)) return;
     let cmd = args.shift().toLowerCase();
     if (!message.content.startsWith(prefix) || message.author.bot) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (command) {
    command.run(client, message, args);
  } else {
    message.reply(
      `Não consegui reconhecer este comando em minha lista!`
    );
  }
});

//codigo pra deixar o o bot sempre online
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Recebido");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000); // Código que deixa o Bot Online

client.login(token);
