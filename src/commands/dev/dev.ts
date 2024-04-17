import { type ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, AnyComponentBuilder, TextChannel, Client } from 'discord.js'

export default {
    data: {
        name: 'dev',
        description: 'ping command',
        // options: [
        //     {
        //         name: 'channel',
        //         type: 7,
        //         description: 'เลือกห้องที่ต้องการให้ตั้งค่า',
        //         required: true
        //     }
        // ]
    },
    async core(client: Client, interaction: ChatInputCommandInteraction) {

        const embed = new EmbedBuilder()
            .setTitle('Dev Command')
            .setDescription('This is a dev command')
            .setColor('Aqua')
            .setTimestamp()
            .setFooter({
                text: 'DNZ.64BIT CORE',
                iconURL: client.user?.displayAvatarURL()
            })
            .setAuthor({
                name: 'DNZ.64BIT CORE',
                iconURL: client.user?.displayAvatarURL()
            })

        const actionRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('dev')
                    .setLabel('Dev')
                    .setStyle(ButtonStyle.Danger)
            )

        await interaction.reply({
            embeds: [embed],
            components: [actionRow]
        })

    }
}