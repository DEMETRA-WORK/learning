import { Injectable } from '@nestjs/common';
import { ITransportInterface } from '../interfaces/transport.interface';
import CheckTehDto from '../dto/check-teh.dto';
@Injectable()
// Объявляем класс с названием BikeTransportService
export class BikeTransportService implements ITransportInterface {
  //Наследуемся от интерфейса

  checkTechnicalInspection(params: CheckTehDto) {
    // В данном методе, проверяем пройдёт ли транспорт тех.осмотр, проверяем соответствует ли количество фар, колес и дверей.
    // Пример: для машины 4 колеса норма, для мотоцикла 2 колеса и т.д
    // То есть метод "checkTechnicalInspection" есть для каждого типа транспорта, но реализует собственную логику проверки тех.осмотра
    const { lights, wheels, doors } = params;
    return lights === 1 && wheels === 2 && doors === 0; // Если условия корректны, то мотоцикл проходит тех. осмотр и вернется true
  }
}
