import ConfigManager from '../api/ConfigManager';

export default class Config {
	values = {};
	name: string;

	constructor(name, values) {
		this.name = name;
		this.values = values;
	}

	getValue(key: string): any {
		return this.values[key];
	}

	setValue(key: string, value: any): any {
		this.values[key] = value;
		this.save();
		return this.values;
	}

	save() {
		ConfigManager.save(this.name, this);
	}
}
