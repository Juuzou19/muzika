const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { Translate } = require("../../process_tools");

module.exports = (queue, track) => {
  if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

  let EmojiState = client.config.app.enableEmojis;

  const emojis = client.config.emojis;

  emojis ? EmojiState = EmojiState : EmojiState = false;


  (async () => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: await Translate(
          `Started playing <${track.title}> in <${queue.channel.name}> <🎧>`
        ),
        iconURL: track.thumbnail,
      })
      .setThumbnail(track.thumbnail)
      .setColor("#2f3136");

    const back = new ButtonBuilder()
      .setEmoji('1269721520578629723')
      .setCustomId('back')
      .setStyle('Secondary');

    const skip = new ButtonBuilder()
      .setEmoji('1269721847738404997')
      .setCustomId('skip')
      .setStyle('Secondary');

    const resumepause = new ButtonBuilder()
      .setEmoji('1269720805273636965')
      .setCustomId('resume&pause')
      .setStyle('Secondary');

    const loop = new ButtonBuilder()
      .setEmoji('1269722767767371800')
      .setCustomId('loop')
      .setStyle('Secondary');

    const lyrics = new ButtonBuilder()
      .setEmoji('1269722761287438490')
      .setCustomId("lyrics")
      .setStyle("Secondary");

    const row1 = new ActionRowBuilder().addComponents(
      back,
      loop,
      resumepause,
      skip,
      lyrics
    );
    queue.metadata.channel.send({ embeds: [embed], components: [row1] });
  })();
};
