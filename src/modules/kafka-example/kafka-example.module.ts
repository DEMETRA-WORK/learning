import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaExampleService } from './kafka-example.service';

@Module({
  imports: [
    // Данный код подключается к KAFKA
    // Теперь с данного модуля мы можем отправлять сообщения другому микросервису
    ClientsModule.register([
      {
        name: 'KAFKA_EXAMPLE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-example',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-example',
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [KafkaExampleService],
})
export class KafkaExampleModule {}
