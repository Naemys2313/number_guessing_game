import { stdin, stdout } from "node:process";
import GameDifficult from "./enums/gameDifficult";
import readlineSync from "readline-sync";

const MIN_HIDDEN_NUMBER = 1;
const MAX_HIDDEN_NUMBER = 100;

main();

function main() {
  console.log(`
Привет. Это игра Угадай Число.
Я загадаю число от 1 до 100.
У тебя есть несколько попыток угадать число.

Выбери уровень сложности:
1. Легкий (10 попыток)
2. Средний (5 попыток)
3. Сложный (3 попытки)

`);

  const answer = input('Выбери уровень сложности: ');
  const difficultNumber = Number.parseInt(answer);
  if (Number.isNaN(difficultNumber)) {
    console.log('Некорректный уровень сложности.');
    return;
  }

  gameLoop(difficultNumber as GameDifficult);
}

function gameLoop(difficultNumber: GameDifficult) {
  let difficultyLabel: string;
  let attemptCount: number;

  switch (difficultNumber) {
    case 1:
      difficultyLabel = 'легкий';
      attemptCount = 10;
      break;
    case 2:
      difficultyLabel = 'средний';
      attemptCount = 5;
      break;
    case 3:
      difficultyLabel = 'тяжелый';
      attemptCount = 3;
      break;
    default:
      console.log('Некорректный уровень сложности.');
      return;
  }

  console.log(`Отлично! Вы выбрали ${difficultyLabel} уровень сложности. У вас будет ${attemptCount} попыток. Давай начнем нашу игру.`);

  const hiddenNumber: number = Math.floor(Math.random() * (MAX_HIDDEN_NUMBER - MIN_HIDDEN_NUMBER + 1)) + MIN_HIDDEN_NUMBER;

  let usedAttempts = 0;

  while(true) {
    if (usedAttempts === attemptCount) {
      console.log(`Вы проиграли! Загаданное число: ${hiddenNumber}`);
      return;
    }

    const guest = input('\nВведите ваше предположение: ');
    const playerNumber: number = Number.parseInt(guest);
    if (Number.isNaN(playerNumber)) {
      console.log('Вводи только целые числа!');
      continue;
    }

    if (playerNumber < 1 || playerNumber > 100) {
      console.log('Я умею загадывать число только от 1 до 100');
      continue;
    }

    usedAttempts++;

    if (hiddenNumber === playerNumber) {
      console.log(`Поздравляю вас! Вы справились за ${usedAttempts} попыток`);
      return;
    }

    if (hiddenNumber > playerNumber) {
      console.log(`Моё число больше, чем ${playerNumber}`);
    } else if(hiddenNumber < playerNumber) {
      console.log(`Моё число меньше, чем ${playerNumber}`);
    }
  }
}

function input(prompt: string) {
  stdout.write(prompt);
  return readlineSync.question();
}