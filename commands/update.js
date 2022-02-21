const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const update = new MessageEmbed()
	.setColor('#e1ad01')
    .setTitle('UPDATE')
	.setThumbnail('https://imgur.com/QNN1y0x.png')
    .setTimestamp()
	.setFooter({ text: 'Stonkbot', iconURL: 'https://imgur.com/tUypbcC.png' });

const data = new SlashCommandBuilder()
    .setName('update')
    .setDescription('Update Embed')
    .addStringOption(option =>
        option.setName("input")
            .setDescription("Embed Input")
            .setRequired(true));


module.exports = {
    data,
    async execute(interaction) {
        const args = interaction.options.getString("input");
        update.setDescription(args);
        await interaction.reply({embeds: [update] });
    },
}