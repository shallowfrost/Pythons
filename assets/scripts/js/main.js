// main.js

import { dataMassExport } from '../../data/data.js';
import { botResponse } from './bot.mjs';

const commands = dataMassExport.commands
// console.log(JSON.stringify(dataMassExport.commands, null, 2));

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const suggestionBox = document.getElementById('suggestionBox'); // Get the suggestion box element

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    userInput.addEventListener('input', showSuggestions); // Add an event listener for input

    window.onload = function () {
        userInput.focus();
    };
});

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();
    console.log('User message:', userMessage); // Debug line
    if (userMessage) {
        appendMessage(userMessage, 'user-message');
        const botReply = botResponse(userMessage);
        console.log('Bot reply:', botReply); // Debug line
        appendMessage(botReply, 'bot-message');
        userInput.value = '';
        console.log('User input value:', userInput.value); // Debug line
    }
}

function appendMessage(message, className, isError = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className, isError ? 'error-message' : 'fade-in');
    messageElement.innerHTML = message + `<span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showSuggestions() {
    const userInput = document.getElementById('userInput');
    const suggestionBox = document.getElementById('suggestionBox');
    let input = userInput.value.trim();
    let inputCommand = input.split(' ')[0];
    let inputArgs = input.split(' ').slice(1).join(' ');
    let suggestions = commands.filter(command => command.command.startsWith(inputCommand));
    
    // Clear the suggestion box
    suggestionBox.innerHTML = '';
    
    // Find if the input matches a command exactly
    let matchedCommand = commands.find(command => command.command === inputCommand);
    
    // If there's a matched command and the user is typing arguments, show the detailed usage
    if (matchedCommand && inputArgs.length > 0) {
        let detailedUsage = `<div><b>Usage:</b> ${matchedCommand.command} ${matchedCommand.args}</div>
                             <div><b>Description:</b> ${matchedCommand.description}</div>`;
        suggestionBox.innerHTML = detailedUsage;
        suggestionBox.style.display = 'block';
    } else if (suggestions.length > 0 && input !== '') {
        // If there are suggestions that match the input, show them
        suggestions.forEach(suggestion => {
            let args = suggestion.args.replace(/</g, '<').replace(/>/g, '>');
            let suggestionElement = document.createElement('div');
            suggestionElement.innerHTML = `
            <b>${suggestion.command}</b> 
            ${args}<br>
            <small>${suggestion.description}</small>`;
            suggestionElement.addEventListener('click', function () {
                userInput.value = suggestion.command + ' '; // Autofill the input field with a space for args
                showSuggestions(); // Refresh suggestions based on the new input
            });
            suggestionBox.appendChild(suggestionElement);
        });
        suggestionBox.style.display = 'block';
    } else {
        suggestionBox.style.display = 'none'; // Hide the suggestion box if no suggestions
    }
}


