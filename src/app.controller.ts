import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { StateSchema } from './country';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getCountries(
    @Query('countryId') countryId: string,
    @Query('stateId') stateId: string,
  ) {
    if (!countryId && !stateId) {
      return await this.appService.getCountries();
    } else if (countryId && !stateId) {
      return await this.appService.getCountry(countryId);
    } else if (countryId && stateId) {
      return await this.appService.getAState(countryId, stateId);
    }
  }

  @Get(':id')
  async getStates(@Param('id') countryId: string) {
    return await this.appService.getCountry(countryId).then((data) => {
      return data.states.map((s) => s as StateSchema);
    });
  }
}
