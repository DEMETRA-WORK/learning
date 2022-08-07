import { Controller, Get, Inject, Query } from '@nestjs/common';
import CheckTehDto from '../dto/check-teh.dto';

@Controller('solid-ocp')
export class SolidOcpController {
  constructor(
    // Подключаем наши фабрики, Вы можете добавлять их сколько угодно, в зависимости от того, сколько у Вас типов транспорта // Что соблюдает второй принцип SOLID (OCP)
    @Inject('CarTransport') private readonly CarTransport,
    @Inject('BikeTransport') private readonly BikeTransport,
  ) {}

  @Get('check-teh') // Данный декоратор создаёт маршрут для запроса из браузера, localhost:3500/solid-ocp/check-teh?type=car&lights=2&wheels=4&doors=4
  checkTechnicalInspection(@Query() query: CheckTehDto) {
    const { type } = query;
    const transports = {
      // Здесь мы указываем, к какому типу транспорта какой класс относится
      car: this.CarTransport,
      bike: this.BikeTransport,
    };
    return transports[type].checkTechnicalInspection(query)
      ? 'Тех. осмотр пройден'
      : 'Тех. осмотра не пройден!';
  }
}
