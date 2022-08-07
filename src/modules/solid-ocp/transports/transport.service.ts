import { Injectable } from '@nestjs/common';
import { ITransportInterface } from '../interfaces/transport.interface';
import CheckTehDto from '../dto/check-teh.dto';
@Injectable()
// Объявляем класс с названием TransportService
export class TransportService {
  constructor(private readonly transport: ITransportInterface) {}

  checkTechnicalInspection(params: CheckTehDto) {
    return this.transport.checkTechnicalInspection(params);
  }
}
