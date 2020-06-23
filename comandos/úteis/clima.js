const Discord = require('discord.js'); // puxando a livraria Discord.js
const weather = require('weather-js'); // puxando o NPM 'weather-js' (instale utilizando: npm i weather-js)


exports.run = (client, message, args) => { 
    weather.find({ // puxando os detalhes do npm
        search: args, // definindo argumentos
        degreeType: 'C' // o detalhe setado: C de Graus Celcius
    }, function (err, result) { // caso ache um erro
        if (err) console.log(err); // enviaremos no console
        // caso o membro não escreva a cidade
        if (!result) return message.reply(`forneça uma cidade. Ex.: \`!clima rj\``)
        // caso o bot não encontre a cidade
        if (!result[0]) return message.reply(`desculpe, mas não encontrei essa cidade!`)
        let embed = new Discord.MessageEmbed()
            .setDescription(`**${result[0].location.name}**`)
            .addField(`**Temperatura**`, `${result[0].current.temperature}°C`)
            .addField(`**Sensação Térmica**`, `${result[0].current.feelslike}°C`)
            .addField(`**Umidade**`, `${result[0].current.humidity}%`)
            .addField(`**Vento**`, `${result[0].current.windspeed}`)
            .setColor("RANDOM")
            .setImage(result[0].current.imageUrl)

        message.channel.send(embed)

    });
};

exports.help = { 
    name: 'clima',
    aliases: ['tempo']
}
