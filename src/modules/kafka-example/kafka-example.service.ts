import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KafkaExampleService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('KAFKA_EXAMPLE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    ['test'].forEach((topic) => {
      this.client.subscribeToResponseOf(topic);
    }); // Данный код заставляет подписываться на темы, чтобы мы могли обратно получить ответ от микросервиса к которому обратились
    // Темы указаны в массиве, их может быть сколько угодно
    // Подписываться на ответ темы, нужно в том случае, если мы ожидаем получить ответ, в противном случае нет необходимости подписываться
    await this.client.connect(); // Открываем соединение

    /* Данный код демонстрирует вызывает метод testTopic и помещает в переменную result результат ответа */
    const result = await lastValueFrom(await this.testTopic());
    console.log(result);
  }

  async onModuleDestroy() {
    await this.client.close(); // Закрываем соединение если модуль уничтожен
  }

  async testTopic() {
    // Данный метод отправлять сообщение и дожидается ответа (Принцип ЗАПРОС - ОТВЕТ)
    return this.client.send('test', { message: 'This is SPARTA!!!!!' });
  }
}
