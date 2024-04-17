export default async function interaction(client: any, REST: any, Routes: any, config: any, Events: any): Promise<void> {
    client.on(Events.InteractionCreate, async (interaction: any) => {
        if (interaction.isCommand()) {
            if (!client.commands.has(interaction.commandName)) return;
            const _ = client.commands.get(interaction.commandName)
            _.core(client, interaction)
        }
    });
}