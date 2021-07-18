import Mongoose from 'mongoose';
import ConfigManager from './api/ConfigManager';
import Express from 'express';
import BodyParser from 'body-parser';
import chalk from 'chalk';

import exitHook from 'exit-hook';

import { apiKey, port, mongoURI } from './Config';
const app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

Mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.post('/set', (req, res) => {
	let { api, config, value, key } = req.body;
	console.log(req.body);

	if (!isKeyValid(api)) {
		return res.send({
			success: false,
			message: `The specified api key is invalid!`,
		});
	}

	if (!config || !value || !key) {
		return res.send({
			success: false,
			message: `Make sure you have all the body parameters set!`,
			params: ['config', 'value', 'key'],
		});
	}

	let conf = ConfigManager.getConfig(config);
	conf.setValue(key, value);

	res.send({
		success: true,
		message: conf,
	});
});

app.post('/get', (req, res) => {
	let { config, key, def } = req.body;

	console.log(req.body);

	if (!config) {
		return res.send({
			success: false,
			message: `Make sure you have all the body parameters set!`,
			params: ['config'],
		});
	}

	let conf = ConfigManager.getConfig(config);

	let value = conf;
	if (key) value = conf.getValue(key) || def || null;

	return res.send({
		success: true,
		message: value,
	});
});

app.listen(port, () => {
	console.log(
		`${chalk.green(`Config Backend`)} is now ready on port ${chalk.green(port)}`
	);
});

exitHook(() => {
	ConfigManager.saveAll();
});

const isKeyValid = (key: string): boolean => {
	return key === apiKey;
};
