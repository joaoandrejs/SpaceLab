const Discord = require('discord.js'); // puxando a livraria 'dicord.js'

exports.run = (client, message, args) => { // setando a base

let dias = 0; // variavel para definir dias
let week = 0;  // variavel para definir semanas
 
 let uptime = ``; // dentro dessa variavel, ficará armazenado todas as informações que criaremos abaixo 
 let totalSegundos = (client.uptime / 1000); // definindo o maximo de segundos, no caso 1000s
 let horas = Math.floor(totalSegundos / 3600); // definindo o maximo de horas, no caso 3600s
 totalSegundos %= 3600; // fazendo uma conta basica, dos segundos
 let minutos = Math.floor(totalSegundos / 60); // um minuto e 60s
 let segundos = Math.floor(totalSegundos % 60); 

 if (horas > 23){ // caso feche 23h, o bot vai identificar como um dia
     dias = dias + 1; // adicionando +1 dia na conta
     horas = 0; 
 }

 if (dias == 7){  // caso feche 7 dias, o bot vai identificar como uma semana
     dias = 0; // zerando os dias
     week = week + 1;  // adicionando uma semana
 }

 if (week > 0){ // caso feche zero semanas, a conta reseta
     uptime += `${week} week, `;
 }

 if (minutos > 60){ // caso os minutos sejam maior que 60s, ele reseta e adiciona mais uma hora
     minutos = 0; // e zera os segundos
 }

 uptime += `\`${horas}h ${minutos}m ${segundos}s\``; // a finalização daquele espaco do comeco

 message.channel.send(`Eu estou acordado há: ${uptime}`)
}

exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'ontime',
    aliases: ['uptime', 'online']
}
