import * as fs from 'fs'
import config from '../config/config';
import Logger from "../utils/logger";
import { ActivityType } from 'discord.js';
const logger = new Logger("BOT");
export default async function connection(client: any, REST: any, Routes: any, config_: any, Events: any): Promise<void> {

    const rest = new REST({ version: '10' }).setToken(config.production.bot.token);

    let data: string[] = [];
    let commands = fs.readdirSync('./src/commands')
    for (const dir of commands) {
        const command = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
        for (const file of command) {

            const command = await import(`../commands/${dir}/${file}`);
            data.push(command.default.data);
            logger.info(`[COMMAND] ${command.default.data.name}`)
            client.commands.set(command.default.data.name, command.default); 1

        }
    }

    client.on(Events.ClientReady, async () => {
        logger.success(`${client.user?.username}#${client.user?.discriminator} is ready! at ${new Date().toLocaleString()} to ${client.guilds.cache.size} guilds`);
        let version = import('../../package.json').then(async (data) => {
            return await data.version;
        });

        await rest.put(Routes.applicationCommands(client.user.id), { body: data });
        logger.success(`Success load commands`);
        await data.shift();

        client.user?.setActivity('DNZ.64BIT CORE V' + await version + 'b', { type: ActivityType.Watching});
    });

}