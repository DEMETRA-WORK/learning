import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    /* Импортируем модуль TypeOrm и далее подключаемся к POSTGRES */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Делаем зависимость от ConfigService чтобы получить переменные из .env файла
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Тип подключения postgres
        host: configService.get('POSTGRES_HOST'), // Хост
        port: configService.get('POSTGRES_PORT'), // Порт
        username: configService.get('POSTGRES_USER'), // Логин подключения к postgres
        password: configService.get('POSTGRES_PASSWORD'), // Пароль
        database: configService.get('POSTGRES_DB'), // База данных к которой подключаемся
        logging: false, // Вывод логов работы с базой false отключены, true включены
        entities: ['dist/**/*.entity.js'], // Подключаем все файлы сущностей, которые в названии файла имеют .entity.js(.entity.ts)
        synchronize: true, // Синхронизация true включена, false отключена, если включить, то любое изменение применится к Вашей схеме в базе данных
        namingStrategy: new SnakeNamingStrategy(), // Стратегия имен, в данном случае название partnerId в таблице будет отображаться: partner_id
        autoLoadEntities: true, // Автозагрузка всех сущностей true включена, false отключена
      }),
    }),
  ],
})
export class PostgresModule {} // Делаем класс экспортируемым
