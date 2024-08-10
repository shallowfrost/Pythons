//handlers.js
import * as dataMassExport from '../../data/data.js';



export function handleHelpCommand(args) {
    let helpMessage = 'Here are the available commands:';
    // Loop through the commands array instead of an object
    for (const commandDetails of commands) {
        helpMessage += `<br>/${commandDetails.command} - ${commandDetails.description}`;
        if (commandDetails.usage) {
            helpMessage += `<br>   Usage: ${commandDetails.usage}`;
        }
    }
    helpMessage += "<br>Use '/help' followed by the command name to see more detailed information about it.";
    // If args are provided, show detailed help for a specific command
    if (args.length > 0) {
        const detailedCommand = commands.find(c => c.command === `/${args[0]}`);
        if (detailedCommand) {
            helpMessage = `Help for command '/${args[0]}':<br>${detailedCommand.description}`;
            if (detailedCommand.usage) {
                helpMessage += `<br>Usage: ${detailedCommand.usage}`;
            }
        } else {
            helpMessage = `No detailed help available for '/${args[0]}'.`;
        }
    }
    return helpMessage;
}


export function handleListCommand(args) {
    let response = '';
    if (args.length === 0 || args[0] === 'all_morphs') {
        // Return both the id/number and the morph names
        for (const [index, morph] of all_morphs.entries()) {
            response += `${index}: ${morph}<br>`;
        }
    } else if (args[0] === 'morphs') {
        // Return just the morph names
        response = Object.values(all_morphs).join('<br>');
    } else if (args[0] === 'sex') {
        // Return the usable sexes and their id/number
        for (const [index, sex] of sex_adjustment.entries()) {
            response += `${index}: ${sex}<br>`;
        }
    } else if (args[0] === 'price') {
        // Return the first (length of morph_price) all_morphs with the corresponding price next to it
        for (let i = 0; i < morph_price.length; i++) {
            response += `${i}: ${all_morphs[i]} - $${morph_price[i].toFixed(2)}<br>`;
        }
    } else if (args[0] === 'detailed') {
        // Return the id/number, the morph name, and the corresponding price
        for (let i = 0; i < morph_price.length; i++) {
            response += `${i}: ${all_morphs[i]} - $${morph_price[i].toFixed(2)}<br>`;
        }
    } else {
        response = "Invalid argument. Please use '/list' with 'all_morphs', 'morphs', 'sex', 'price', or 'detailed'.";
    }
    return response;
}


export function handlePriceCommand(args) {
	const sex = parseInt(args[0]);
	const weight = parseInt(args[1]);
	const morphs = args.slice(2);
	const sex_str = sex === 0 ? "unsexed" : sex === 1 ? "male" : "female";
	const {
		total_price_str,
		morph_names_str
	} = calculateTotalPrice(morphs);
	return `Total price for a (${sex_str}) ${morph_names_str} Ball Python at ${weight} grams is ${total_price_str}.`;
}
