const DiscordJS = require('discord.js')
const vt = require('node-virustotal')
const client = new DiscordJS.Client()
const con = vt.MakePublicConnection()
con.setKey('e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d')
con.setDelay(15000)
const Prefix = '-/'
client.on('message', async msg => {
  if (!msg.guild) return
  if (msg.author.bot) return
  if (!msg.content.startsWith(Prefix)) return
  const [cmd] = msg.content.slice(Prefix.length).split(' ')
  switch (cmd) {
    case 'scan':
      var url = msg.content.split(' ')
      if (!url[1]) {
        msg.reply('URLを入力して下さい')
      } else {
        if (url[1].startsWith('https://') || url[1].startsWith('http://')) {
          msg.delete()
          con.submitUrlForScanning(url[1], function (data) {
            const Embed = new DiscordJS.RichEmbed()
              .setColor('0x0000FF')
              .setAuthor(msg.author.tag, `${msg.author.avatarURL}`)
              .addField('スキャン結果', data.permalink)
              .setFooter('Created By InkoHX', 'https://goo.gl/FyhJVh')
            msg.author.send(Embed)
            msg.reply('URLスキャンが完了しました。\n結果はDMからご確認下さい。')
          })
        } else {
          msg.reply('\n`https// か http://` のどちらかを付けて下さい')
        }
      }
      break
    default:
      msg.reply('そのようなコマンドは存在しません。')
      break
  }
})
