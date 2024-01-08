const readline = require('readline');
const axios = require('axios');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
async function openai(text) {
	try {
		var messages = [{
			role: 'user',
			content: text
		}, {
			role: 'assistant',
			content: 'Hello! How can I assist you today?'
		}]
		var actor = 'Your Name Is Zeiyy'
		var openai = (await axios.post('https://skizo.tech/api/openai', {
			messages,
			system: actor
		}, {
			headers: {
				authorization: ''//Go to the https://skizo.tech/pricing page to get the key
			}
		})).data
		return openai
	} catch (Error) {
		throw Error
	};
};
var recursiveAsyncReadLine = async function() {
	rl.question('\033[1;36mAsk: \033[1;32m', async function(userInput) {
		if (userInput.toLowerCase() === 'exit' || userInput === '') {
			console.log('See you...^.^');
			process.exit();
		}
		try {
			const resp = await openai(userInput);
			console.log(resp.result);
		} catch (error) {
			console.error('Error calling OpenAI:', error.message);
		}
		recursiveAsyncReadLine();
	});
};
recursiveAsyncReadLine();