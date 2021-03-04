import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { countrySchema, stateSchema } from './country';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dev-test:test@cluster0-nhssw.mongodb.net/234market-db?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: 'countries', schema: countrySchema },
      { name: 'states', schema: stateSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
