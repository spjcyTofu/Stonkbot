const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const open = new MessageEmbed()
	.setColor('#98ff98')
    .setTitle('OPEN')
	.setThumbnail('https://imgur.com/QNN1y0x.png')
    .setTimestamp()
	.setFooter({ text: 'Stonkbot', iconURL: 'https://imgur.com/tUypbcC.png' });

const data = new SlashCommandBuilder()
    .setName('open')
    .setDescription('Open Embed')
    .addStringOption(option =>
        option.setName("input")
            .setDescription("Embed Input")
            .setRequired(true));


module.exports = {
    data,
    async execute(interaction) {
        const args = interaction.options.getString("input");
        open.setDescription(args);
        await interaction.reply({embeds: [open] });
    },
}