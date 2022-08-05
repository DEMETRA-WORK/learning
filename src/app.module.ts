/* Основной модуль, где подключаются остальные модули */

import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule } from '@nestjs/config'; // Импортируем ConfigModule
import * as Joi from '@hapi/joi';
import { PostgresModule } from './providers/postgres/postgres.module'; // Joi для валидации переменных конфига из файла .env

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Подключаем ConfigModule глобально, чтобы использовать в других модулях
      envFilePath: [process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env'], // В зависимости от команды запуска, определяем файл конфигов .env или .env.dev
      validationSchema: Joi.object({
        KAFKA_BROKER: Joi.string().required(), // Проверяет есть ли переменная KAFKA_BROKER и является текстовой, в файле .env или .env.dev(опционально)
        KAFKA_GROUP_ID: Joi.string().required(), // Проверяет есть ли переменная KAFKA_GROUP_ID и является текстовой в файле .env или .env.dev(опционально)
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(), // Проверяет есть ли переменная REDIS_PORT и является числовой в файле .env или .env.dev(опционально)
        REDIS_PASSWORD: Joi.string().required(),
      }),
    }),
    PostgresModule, // Подключаем PostgresModule (который делает подключение к postgres)
    TaskModule, // Подключаем Task Module (который реализует логику выполнения фоновых задач с помощью BULL)
  ],
  controllers: [], // Здесь подключаем необходимые контроллеры, если такие необходимы
  providers: [], // Здесь подключаем провайдеры, в нашем случае сервисы
})
export class AppModule {}
