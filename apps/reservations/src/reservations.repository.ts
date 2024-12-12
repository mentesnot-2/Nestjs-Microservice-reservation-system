import { AbstractRepository } from "@app/common";
import { ReservationDocument } from "./models/reservation.schema";
import { Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
    protected readonly logger = new Logger(ReservationsRepository.name);
    constructor(@InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>) {
        super(reservationModel);
    }
}