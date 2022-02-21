const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const yahooFinance = require('yahoo-finance2').default;

const yahoo = new MessageEmbed()
	.setColor('#430297')
	.setThumbnail('https://imgur.com/QNN1y0x.png')
    .addFields(
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
    .setTimestamp()
	.setFooter({ text: 'Stonkbot', iconURL: 'https://imgur.com/tUypbcC.png' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yahoo')
		.setDescription('Stock prices from Yahoo Finance')
        .addStringOption(option =>
            option.setName("input")
                .setDescription("Stock code")
                .setRequired(true)),
	async execute(interaction) {
        const args = interaction.options.getString("input");
        try {
            const quoteSum = await yahooFinance.quote(args);
            const dividend = new Date(quoteSum.dividendDate).toDateString();
            const earningsTimestamp = new Date(quoteSum.earningsTimestamp).toDateString();
            var postMarket;
            if (Number.isNaN(quoteSum.postMarketPrice)){
                postMarket = new String("There is currently no postmarket price.");
            } else {
                postMarket = new Number(quoteSum.postMarketPrice).toString();
            }
            yahoo.setTitle(quoteSum.displayName.toString() + " (" + quoteSum.symbol.toString() + ")");
            yahoo.setFields(
                {name: "Current Price", value: "$" + quoteSum.regularMarketPrice.toString(), inline: true},
                {name: "Day Opening Price", value: "$" + quoteSum.regularMarketOpen.toString(), inline: true},
                {name: "Day's Change", value: "$" + quoteSum.regularMarketChange.toString(), inline: true},
                {name: "Postmarket Price", value: "$" + postMarket, inline: true},
                {name: "Day Price Range", value: "$" + quoteSum.regularMarketDayLow.toString() + " - $" + quoteSum.regularMarketDayHigh.toString(), inline: true},
                {name: "52 wk Price Range", value:  "$" + quoteSum.fiftyTwoWeekLow.toString() + " - $" + quoteSum.fiftyTwoWeekHigh.toString(), inline: true},
                {name: "Dividend Date", value: dividend, inline: true},
                {name: "Earnings Timestamp", value: earningsTimestamp, inline: true},
            )
            await interaction.reply({embeds: [yahoo] });
        } catch {
            await interaction.reply("There has been an error. Please use the ticker symbol instead of the company name. (e.g. AAPL/aapl instead of Apple)")
        }

	},
};