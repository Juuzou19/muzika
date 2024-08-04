const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'controller',
    description:("Send music controller to a channel"),
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description:('The text channel you want to send it to'),
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],

    async execute({ inter }) {
        const channel = inter.options.getChannel('channel');
        if (channel.type !== ChannelType.GuildText) return inter.editReply({ content: await Translate(`You need to send it to a text channel.. <❌>`) });

        const embed = new EmbedBuilder()
            .setTitle(await Translate('Control your music with the buttons below !'))
            .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
            .setColor('#2f3136')
            .setFooter({ text: await Translate('Music comes first - Made with heart by the Community <❤️>'), iconURL: inter.member.avatarURL({ dynamic: true }) });

        inter.editReply({ content: await Translate(`Sending controller to <${channel}>... <❤️>`) });

        let EmojiState = client.config.app.enableEmojis;

        const emojis = client.config.emojis;

        emojis ? EmojiState = EmojiState : EmojiState = false;

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

        const save = new ButtonBuilder()
            .setEmoji('1269703273468788807')
            .setCustomId('savetrack')
            .setStyle('Secondary');

        const volumeup = new ButtonBuilder()
            .setEmoji('🔊')
            .setCustomId('volumeup')
            .setStyle('Secondary');

        const volumedown = new ButtonBuilder()
            .setEmoji('🔉')
            .setCustomId('volumedown')
            .setStyle('Secondary');

        const loop = new ButtonBuilder()
            .setEmoji('1269722767767371800')
            .setCustomId('loop')
            .setStyle('Secondary');

        const np = new ButtonBuilder()
            .setEmoji('1269720803868672013')
            .setCustomId('nowplaying')
            .setStyle('Secondary');

        const queuebutton = new ButtonBuilder()
            .setEmoji('1269722759592939634')
            .setCustomId('queue')
            .setStyle('Secondary');

        const lyrics = new ButtonBuilder()
            .setEmoji('1269722757973803060')
            .setCustomId('Lyrics')
            .setStyle('Secondary');

        const shuffle = new ButtonBuilder()
            .setEmoji('1269720799317590026')
            .setCustomId('shuffle')
            .setStyle('Secondary');

        const stop = new ButtonBuilder()
            .setEmoji('1269724849547378779')
            .setCustomId('stop')
            .setStyle('Secondary');

        const row1 = new ActionRowBuilder().addComponents(back, resumepause, skip, stop, save);
        const row2 = new ActionRowBuilder().addComponents(volumedown, volumeup, loop);
        const row3 = new ActionRowBuilder().addComponents(lyrics, shuffle, queuebutton, np);

        channel.send({ embeds: [embed], components: [row1, row2, row3] });
    }
}
