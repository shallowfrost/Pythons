// bot.mjs
import * as dataMassExport from '../../data/data.js';
console.log(JSON.stringify(dataMassExport, null, 2));

import * as handler from './handlers.mjs';

const listCommand = dataMassExport.listCommand;
const sex_adjustment = dataMassExport.sex_adjustment;
const morph_price = dataMassExport.morph_price;
const morph_names = Object.values(dataMassExport.all_morphs).slice(0, morph_price.length);
const all_morphs = dataMassExport.all_morphs;

export function botResponse(message) {
    console.log('botResponse called with message:', message); // Debug line

    if (message.startsWith('/')) {
        const words = message.split(' ');
        const command = words[0].substring(1); // Remove the prefix
        const args = words.slice(1);
        console.log('Command:', command); // Debug line
        console.log('Args:', args); // Debug line

        if (commands[command]) {
            const response = commandscommand;
            console.log('Response:', response); // Debug line
            // Send the bot response back to the chat interface
            return response;
        } else {
            // Send a default response if the command is not found
            return "I'm sorry, I didn't understand your request.";
        }
    }
}
