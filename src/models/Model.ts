import mongoose from 'mongoose';
const { Schema, Document } = mongoose;

const schema = new Schema({
	name: {
		type: String,
		requird: true,
	},
	values: {
		type: {},
		required: true,
		default: {},
	},
});

export interface Config extends Document {
	name: string;
	values: {};
}

export default mongoose.model<Config>('user', schema);
