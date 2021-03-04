import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountrySchema, StateSchema } from './country';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('countries')
    private readonly countryModel: Model<CountrySchema>,
    @InjectModel('states') private readonly stateModel: Model<StateSchema>,
  ) {}

  async getCountries() {
    const countries = await this.countryModel.find().exec();
    return countries.map((s) => {
      return s as CountrySchema;
    });
  }

  async getCountry(countryId: string) {
    const country = await this.findACountry(countryId);
    return country as CountrySchema;
  }

  async getAState(countryId: string, stateId: string) {
    let state = null;
    await this.countryModel.findById(countryId).findOne((err, res) => {
      state = res.states.find((s) => s._id == stateId);
    });
    return await state;
  }

  private async findACountry(countryId: string): Promise<CountrySchema> {
    let country;
    try {
      country = await this.countryModel.findById(countryId);
    } catch (error) {
      throw new NotFoundException('Country not found');
    }
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }
}
