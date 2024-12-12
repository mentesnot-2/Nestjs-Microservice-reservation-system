import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{name:ReservationDocument.name,schema: ReservationSchema}]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./apps/reservations/.env',
      validationSchema:Joi.object({
        MONGO_DB_URI:Joi.string().required(),
        PORT:Joi.number().required(),
      })
    })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationsRepository],
})
export class ReservationsModule { }