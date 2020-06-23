const Discord = require("discord.js"); // puxando a livraria 'discord.js'
const moment = require("moment"); // puxando o NPM moment (instale utilizando: npm i moment)
moment.locale("pt-BR"); // definindo o local do moment, no nosso caso, pt-BR


//tabela dos status
const status = {
  online: "Disponivel",
  idle: "Ausente",
  dnd: "Ocupado",
  offline: "Offline"
};
exports.run = (client, message, args) => {
  var permissions = [];
  
  // Puxando um membro mencionavel, caso o usuario n mencione ninguem será ele mesmo
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  // Todas as permissos do discord.
  if (message.member.hasPermission("KICK_MEMBERS")) {
    permissions.push("Expulsar membros");
  }

  if (message.member.hasPermission("BAN_MEMBERS")) {
    permissions.push("Banir membros");
  }

  if (message.member.hasPermission("ADMINISTRATOR")) {
    permissions.push("Administrador");
  }

  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    permissions.push("Gerenciar mensagens");
  }

  if (message.member.hasPermission("MANAGE_CHANNELS")) {
    permissions.push("Gerenciar canais");
  }

  if (message.member.hasPermission("MANAGE_NICKNAMES")) {
    permissions.push("Gerenciar apelidos");
  }

  if (message.member.hasPermission("MANAGE_ROLES")) {
    permissions.push("Gerenciar cargos");
  }

  if (message.member.hasPermission("MANAGE_WEBHOOKS")) {
    permissions.push("Gerenciar webhooks");
  }

  if (message.member.hasPermission("MANAGE_EMOJIS")) {
    permissions.push("Gerenciar emojis");
  }

  //Se não tiver nenhuma permissão
  if (permissions.length == 0) {
    permissions.push("Nenhuma permissão detectada");
  }

  //criando a embed que sera enviada
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.username}`, member.user.displayAvatarURL())
    .setColor("#0000")
    .setThumbnail(member.user.displayAvatarURL)
    .addField("Usuario:", `${member.user.tag}`, true)
    .addField("Jogando",`${member.user.presence.game? `${member.user.presence.game.name}`: "Nenhum jogo detectado"}`, true)
    .addField("Status", `${status[member.user.presence.status]}`, true)
    .addField("Entrou aqui em", `\`${moment(member.joinedAt).format("LLL")}\``)
    .addField("Conta criada em",`\`${moment(member.user.createdAt).format("LLL")}\``,true)
    .addField("Permissões", `${permissions.join(", ")}`)
    .addField(`Cargos [${member.roles.cache.filter(r => r.id !== message.guild.id).map(a => `\`${a.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(", ") || "Esse membro não possui cargos."}`,true)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("#0000");

  //enviando a embed
  message.channel.send({ embed });
};

exports.help = {
  name: "userinfo",
  aliases: []
};
