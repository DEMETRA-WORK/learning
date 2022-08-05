import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TaskLogEntity from './entities/task-log.entity';
import { Repository } from 'typeorm';

@Injectable()
// Объявляем класс с названием TaskLogService
export class TaskLogService {
  constructor(
    @InjectRepository(TaskLogEntity)
    private readonly taskLogRepository: Repository<TaskLogEntity>, // Подключаем нашу сущность TaskLog чтобы в неё писать
  ) {}

  private logger: Logger = new Logger(TaskLogService.name); // Обьявляем Logger для логирования всех действий

  async writeLogTask(id: number, message: string) {
    // Метод записывает в базу данных лог выполнения задачи
    this.logger.debug(`Начинаю писать лог для задачи, id: ${id}`);
    return this.taskLogRepository.save({
      taskId: id,
      message: message,
    }); // Сохраняем лог в базу данных postgres в таблицу TaskLog
  }
}
