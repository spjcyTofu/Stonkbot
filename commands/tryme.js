const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tryme')
		.setDescription('Replies with honk!'),
	async execute(interaction) {
		await interaction.reply('Honk!');
	},
};
