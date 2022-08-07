/* SOLID OCP MODULE, данный модуль демонстрирует второй принцип SOLID (OCP - принцип открытости/закрытости) */
/* Демонстрация идет на примере проверки тех. осмотра разновидностей автотранспорта */

import { Module } from '@nestjs/common';
import { CarTransportService } from './transports/car.transport';
import { TransportService } from './transports/transport.service';
import { BikeTransportService } from './transports/bike.transport';
import { SolidOcpController } from './controllers/solid-ocp.controller';

@Module({
  imports: [],
  controllers: [SolidOcpController], // Здесь подключаем необходимые контроллеры, если такие необходимы
  providers: [
    CarTransportService,
    {
      // Данный код подключает фабрику "CarTransport" для последующего использования с вторым принципом SOLID OCP
      provide: 'CarTransport', // В данном случае, мы подключаем Class Car (То есть тип транспорта "Машина")
      useFactory: (t) => new TransportService(t),
      inject: [CarTransportService],
    },
    BikeTransportService,
    {
      // Данный код подключает фабрику "CarTransport" для последующего использования с вторым принципом SOLID OCP
      provide: 'BikeTransport', // В данном случае, мы подключаем Class Bike (То есть тип транспорта "Мотоцикл")
      useFactory: (t) => new TransportService(t),
      inject: [BikeTransportService],
    },
    // И таких фабрик может быть сколько угодно. К примеру дальше мы создадим класс Cargo "Грузовой транспорт"
    // То есть нам не нужно менять наш текущий код класса TransportService, нам достаточно лишь добавить класс нового вида транспорта
  ], // Здесь подключаем провайдеры
  exports: ['CarTransport', 'BikeTransport'], // Экспортируем наши фабрики, чтобы они были доступны там где нам необходимо
})
export class SolidOcpModule {}
