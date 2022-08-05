/* Создаем сущность для примера TaskEntity (чтобы у нас в базе данных POSTGRES была таблица task), в ней будем сохранять задачи */
/* Задачи не обязательно сохранять куда-то, это для примера использования TypeOrm с POSTGRES */

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'; // Импортируем нужные классы из typeorm

@Entity('task_log') // task - является нашем именем таблицы в базе данных
class TaskLogEntity {
  @PrimaryGeneratedColumn() // ID будет генерироваться автоматически, добавили запись id = +1
  public id: number;

  @Column() // Объявляем столбец с названием taskId (Будем сюда записывать ID задачи)
  public taskId: number; // тип столбца number(число)

  @Column() // Объявляем столбец с названием message (Текст лога)
  public message: string; // тип столбца string(текстовая строка)

  @CreateDateColumn({
    // Объявляем столбец с название created (В нём будем хранить дату создания данной записи)
    transformer: {
      // Делаем трансформер, которую изменить дату перед сохранением
      to: (value) => value, // Из чего
      from: (
        value, // Во что
      ) =>
        new Date(value).getTime() - new Date(value).getTimezoneOffset() * 60000, // Данный код преобразует дату во время UTC+0, чтобы не зависить от часового пояса на сервере
    },
  })
  public created: Date;
}

export default TaskLogEntity;
