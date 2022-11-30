import throttle from 'lodash.throttle';
//Импортируем функцию throttle из 'lodash.throttle'.
import Player from '@vimeo/player';
//Импортируем класс Player из библиотеки '@vimeo/player'.

const player = new Player(document.querySelector('iframe'));
// создаем объект класса Player на основании выбраного iframe элемента и присваиваем значению переменной player ссылку на созданный обьект.

const STORAGE_KEY_TIME_DATA = 'videoplayer-current-time';
//  Создаем переменную STORAGE_KEY_TIME_DATA со значением строки с названием ключа локального хранилища, где будем хранить данные о текущей позиции воспроизведения видео.

if (localStorage.getItem(STORAGE_KEY_TIME_DATA)) {
  // Проверяем есть ли в локальном хранилище данные с именем ключа записанным в переменной STORAGE_KEY_TIME_DATA.
  const videoLastTimeStopData = JSON.parse(
    localStorage.getItem(STORAGE_KEY_TIME_DATA)
  );
  player.setCurrentTime(videoLastTimeStopData.seconds);
  //Устанавливаем время начала воспроизведения видео на основании данных из локального хранилища.
}
function saveVideoPlaybackTimeData(data) {
  localStorage.setItem(STORAGE_KEY_TIME_DATA, JSON.stringify(data));
}
//Создали функцию для прослушки события.

player.on('timeupdate', throttle(saveVideoPlaybackTimeData, 1000));
// Повесили прослушку события "timeupdate" на объект player, результатом функции которого будет запись о текущей позиции восроизведения в локальное хранилище не чаще чем раз 1 сек.
