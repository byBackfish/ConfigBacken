import Model from '../models/Model';
import Config from '../structures/Config';
import { Query, Document, models } from 'mongoose';

let configs: Map<string, Config> = new Map<string, Config>();

export interface IConfig extends Document {
	name: string;
	values: {};
}

const createConfig = (name: string): Config => {
	let config: Config = new Config(name, {});
	configs.set(name, config);
	return config;
};

const deleteConfig = (name: string): void => {
	configs.delete(name);
};

const getConfig = (name: string): Config => {
	if (configs.has(name)) {
		return configs.get(name);
	}

	let config: Config = new Config(name, {});
	configs.set(name, config);
	return config;
};

const saveAll = () => {
	configs.forEach((config, name) => {
		save(name, config);
	});
};

const save = (name: string, config: Config) => {
	Model.findOne({ name }).then((data) => {
		if (data) {
			data.values = config.values;
			data.name = config.name;
			data.save();
		} else {
			Model.create({
				name,
				values: config.values,
			});
		}
	});
};

export default {
	getConfig,
	createConfig,
	deleteConfig,
	saveAll,
	save,
};
