const Discord = require("discord.js");
const arraySort = require("array-sort");
const t = require("table");

exports.run = async (doky, message, args) => {
    try {
        const embed = new Discord.MessageEmbed().setColor('RED')
        if (!message.guild.me.hasPermission("MANAGE_GUILD")) {
            embed.setAuthor("Erro")
                 .setDescription("<:space_x:714329904547889172> » Não tenho acesso aos convites do servidor, verifique minhas permissões!");
            return message.channel.send({
                embed
            });
        }
        let invites = await message.guild.fetchInvites();
        if (invites.size === 0) {
              embed
              .setColor('RED')
              .setAuthor("Erro")
              .setDescription("<:space_x:714329904547889172> » Atualmente não existem convites criados neste servidor!");
            return message.channel.send({embed});
        }
        invites = invites.array();
        arraySort(invites, "uses", {
            reverse: true
        });
        const usedInvites = [ ["Usuário › Usos\n"] ];
      
        invites.forEach(invite => usedInvites.push([`${invite.inviter.tag} › ${invite.uses}\n`]));
          embed
      
          .setTitle(`📜 Rank de Convites`)
          .setDescription(usedInvites);
        return message.channel.send({embed});
      
    } catch (err) {
        console.log(err.stack);
        return this.message.channel.send(err.stack);
    }
}

exports.help = {
    name: 'rankingconvites',
  aliases: ["conviteranking", "rankingconvite", "conviterank", "rankconvite"]
}