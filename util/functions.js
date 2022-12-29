const yes = ['yes', 'y', 'ye', 'yea', 'correct'];

const no = ['no', 'n', 'nah', 'nope', 'fuck off'];

const MONEY = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;

const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;


module.exports = {
    welcomehandle: function(data,member,guild) {
  return content = data.message
  .replaceAll(/`/g, "\`")
  .replaceAll(/<user.name>/g, member.username)
  .replaceAll(/<user.id>/g, member.id) 
  .replaceAll(/<user.tag>/g, member.tag) 
  .replaceAll(/<guild.mc>/g, guild.memberCount+1)
  .replaceAll(/<guild.name>/g, guild.name)
    }
    shorten: function(text, maxLen = 2000) {

    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;

  },
      stripInvites: function(str, { guild = true, bot = true, text = '[redacted invite]' } = {}) {

    if (guild) str = str.replace(inviteRegex, text);

    if (bot) str = str.replace(botInvRegex, text);

    return str;

  },
      verify: async function (channel, user, { time = 30000, extraYes = [], extraNo = [] } = {}) {

    const filter = res => {

      const value = res.content.toLowerCase();

      return (user ? res.author.id === user.id : true)

        && (yes.includes(value) || no.includes(value) || extraYes.includes(value) || extraNo.includes(value));

    };

    const verify = await channel.awaitMessages(filter, {

      max: 1,

      time

    });

    if (!verify.size) return 0;

    const choice = verify.first().content.toLowerCase();

    if (yes.includes(choice) || extraYes.includes(choice)) return true;

    if (no.includes(choice) || extraNo.includes(choice)) return false;

    return false;

  },
}