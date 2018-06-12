const API_AI_TOKEN = 'cfb61d8aee9c448cbd9311cb9b2e477b';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAALrhJb7NMcBAAlwEBagBl94fn3ZB1T8K97IdoPOSNRc0cbSOffVk0cG4Ps6WBfisjbOV63YKXAEfQgJn2UOo0ZBUwR2zyRUwa8DN6jlHVjFrYqtdRGcfZCZCrvRATq0r9ZBK78xfZAuofUAf351ZCFyQrgmudJ8evxeZBbtZAhKW2wZDZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: FACEBOOK_ACCESS_TOKEN
            },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text
            },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {
        sessionId: 'crowdbotics_bot'
    });

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};