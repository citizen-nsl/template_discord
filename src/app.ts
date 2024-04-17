import { Client, Collection, Events, REST, Routes } from 'discord.js'
import Logger from './utils/logger';
import config from './config/config';
import * as fs from 'fs';

const logger = new Logger("BOT");
const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages'
    ]
});

client.commands = new Collection();

(async () => { // Async Function Read Directory
    logger.info("Starting Bot...");

    const handlers = fs.readdirSync('./src/events').filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (let file of handlers) {
        await logger.info(`Loading Event Handler: ${file}`);
        await import(`./events/${file}`).then((module) => {
            module.default(client, REST, Routes, config, Events);
        }).catch((e) => {
            logger.error(`Failed to load Event Handler: ${e}`);
        });
    }

    client.login(config.production.bot.token);
})(); 

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, any>;
    }
}