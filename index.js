const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const appPort = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
app.get('/', verificationController);
app.post('/', messageWebhookController);

app.listen(appPort, () => console.log('Webhook server is listening, port ' + appPort));