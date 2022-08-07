/* Объявляем интерфейс для обращения к классам разновидностей транспорта */
import CheckTehDto from '../dto/check-teh.dto';

export interface ITransportInterface {
  // Интерфейс для метода проверки исправности транспорта (тех.осмотра)
  // Который принимает 3 параметра - количество фар, количество колес и количество дверей
  // Возвращает значение boolean, true в случае если проходит тех.осмотр, в противном случае false - не проходит.
  checkTechnicalInspection(params: CheckTehDto): boolean;
}
