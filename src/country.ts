import * as mongoose from 'mongoose';

export const stateSchema = new mongoose.Schema({
  name: String,
});

export const countrySchema = new mongoose.Schema({
  name: String,
  states: [stateSchema],
});

export interface CountrySchema extends mongoose.Document {
  name: string;
  states: StateSchema[];
}

export interface StateSchema extends mongoose.Document {
  name: string;
}
