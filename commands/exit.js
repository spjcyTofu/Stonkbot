const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const exit = new MessageEmbed()
	.setColor('#ff57f0')
    .setTitle('EXIT')
	.setThumbnail('https://imgur.com/QNN1y0x.png')
    .setTimestamp()
	.setFooter({ text: 'Stonkbot', iconURL: 'https://imgur.com/tUypbcC.png' });

const data = new SlashCommandBuilder()
    .setName('exit')
    .setDescription('Exit Embed')
    .addStringOption(option =>
        option.setName("input")
            .setDescription("Embed Input")
            .setRequired(true));


module.exports = {
    data,
    async execute(interaction) {
        const args = interaction.options.getString("input");
        exit.setDescription(args);
        await interaction.reply({embeds: [exit] });
    },
}