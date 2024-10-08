// Класс, который содержит логику калькулятора
class Calculator {
  constructor() {
    // Получаем элементы: дисплей и кнопки
    this.display = document.querySelector(".display");
    this.buttons = Array.from(document.querySelectorAll(".button"));
    this.memory = 0; // Хранение значения памяти
    this.initialize(); // Запускаем инициализацию (привязка кнопок к событиям)
    this.lastInputWasResult = false; // Флаг для отслеживания, был ли последний ввод результатом
  }

  // Инициализация кнопок (назначаем обработчики событий на каждую кнопку)
  initialize() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) =>
        this.megabutoane(e.target.innerText)
      );
    });
  }

  // Метод для обработки нажатия на кнопки
  megabutoane(scriere) {
    switch (scriere) {
      case "AC":
        this.clearDisplay(); // Очищаем экран
        break;
      case "=":
        this.calculateResult(); // Вычисляем выражение
        break;
      case "+/-":
        this.toggleSign(); // Меняем знак числа
        break;
      case "%":
        this.calculatePercentage(); // Вычисляем процент
        break;
      case "√":
        this.handleSquareRoot(); // Добавляем знак корня
        break;
      case "^":
        this.handleExponentiation(); // Обработка возведения в степень
        break;
      case "sin":
      case "cos":
      case "tan":
        this.calculateTrigFunction(scriere); // Вызываем тригонометрическую функцию
        break;
      case "MC":
        this.memoryClear(); // Очищаем память
        break;
      case "MR":
        this.memoryRecall(); // Извлекаем значение из памяти
        break;
      case "M+":
        this.memoryAdd(); // Добавляем в память
        break;
      case "M-":
        this.memorySubtract(); // Вычитаем из памяти
        break;
      case "ln":
        this.handleLn(); // Натуральный логарифм
        break;
      case "log₁₀":
        this.handleLog10(); // Логарифм по основанию 10
        break;
      case "logₐ":
        this.handleLogBase(); // Логарифм по произвольному основанию
        break;
      case "HEX":
        this.convertToHex();
        break;
      default:
        this.updateDisplay(scriere); // Обновляем дисплей
    }
  }

  // Метод для очистки экрана
  clearDisplay() {
    this.display.innerText = "0"; // Устанавливаем "0" на дисплее
    this.lastInputWasResult = false; // Сбрасываем флаг последнего результата
  }

  // Метод для вычисления выражений (включая поддержку квадратного корня и степени)
  calculateResult() {
    try {
      let expression = this.display.innerText;

      // Заменяем все символы "^" на Math.pow
      expression = expression.replace(/\^/g, "**");

      // Заменяем символ корня √ на Math.sqrt() для вычисления
      expression = expression.replace(/√(\d+(\.\d+)?)/g, (match, number) => {
        return Math.sqrt(number); // Вычисляем квадратный корень
      });

      // Вычисляем выражение с помощью eval
      this.display.innerText = eval(expression);
      this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод — это результат
    } catch (e) {
      this.display.innerText = "Error!"; // Если ошибка, выводим "Error!"
    }
  }

  // Метод для смены знака числа на дисплее
  toggleSign() {
    if (this.display.innerText !== "0") {
      // Меняем знак: если начинается с "-", убираем его, иначе добавляем
      this.display.innerText = this.display.innerText.startsWith("-")
        ? this.display.innerText.slice(1)
        : "-" + this.display.innerText;
    }
  }

  // Метод для вычисления процента от числа
  calculatePercentage() {
    this.display.innerText = eval(this.display.innerText + "/100"); // Делим число на 100
    this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод — это результат
  }

  // Метод для добавления символа квадратного корня
  handleSquareRoot() {
    const lastChar = this.display.innerText.slice(-1);

    // Проверяем, что последний символ не является "√", чтобы предотвратить добавление нескольких подряд
    if (lastChar !== "√") {
      if (this.display.innerText === "0") {
        this.display.innerText = "√"; // Если дисплей пустой, добавляем √
      } else {
        this.display.innerText += "√"; // Добавляем √ к текущему значению
      }
    }
  }

  // Метод для обработки возведения в степень
  handleExponentiation() {
    // Если последний символ не оператор, добавляем "^"
    if (!["+", "-", "*", "/", "^"].includes(this.display.innerText.slice(-1))) {
      this.display.innerText += "^";
    }
  }

  // Метод для обновления дисплея
  updateDisplay(scriere) {
    const lastChar = this.display.innerText.slice(-1);
    const operators = ["+", "-", "*", "/", "^"];

    // Если предыдущий ввод был результатом, сбрасываем дисплей
    if (this.lastInputWasResult) {
      this.display.innerText = scriere;
      this.lastInputWasResult = false; // Сбрасываем флаг результата
    } else {
      // Проверка на возможность добавления точки
      if (scriere === "." && lastChar === ".") {
        return; // Если последним символом тоже была точка, ничего не делаем
      }
      // Проверка на возможность добавления оператора
      if (operators.includes(scriere) && operators.includes(lastChar)) {
        return; // Если последним символом был оператор, ничего не делаем
      }
      // Если на дисплее "0", и пользователь вводит не ".", то заменяем "0" на введённое число
      if (this.display.innerText === "0" && scriere !== ".") {
        this.display.innerText = scriere;
      } else {
        this.display.innerText += scriere; // Новый ввод просто добавляется в конец строки
      }
    }
  }

  // Методы для работы с памятью:
  memoryClear() {
    this.memory = 0; // Очищаем память
  }

  memoryRecall() {
    this.display.innerText = this.memory.toString(); // Выводим значение из памяти на экран
    this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод — это результат
  }

  memoryAdd() {
    this.memory += parseFloat(this.display.innerText); // Добавляем текущее значение к памяти
    this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод — это результат
  }

  memorySubtract() {
    this.memory -= parseFloat(this.display.innerText); // Вычитаем текущее значение из памяти
    this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод — это результат
  }

  calculateTrigFunction(func) {
    try {
      const value = parseFloat(this.display.innerText); // Преобразуем значение на дисплее в число
      let result;
      switch (func) {
        case "sin":
          result = Math.sin((value * Math.PI) / 180); // Преобразуем градусы в радианы и вычисляем sin
          break;
        case "cos":
          result = Math.cos((value * Math.PI) / 180); // Преобразуем градусы в радианы и вычисляем cos
          break;
        case "tan":
          result = Math.tan((value * Math.PI) / 180); // Преобразуем градусы в радианы и вычисляем tan
          break;
      }
      this.display.innerText = result.toFixed(2); // Округляем результат для лучшей точности
      this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод — это результат
    } catch (e) {
      this.display.innerText = "Error!"; // В случае ошибки выводим "Error!"
    }
  }
  

  // Логарифмы

  // Натуральный логарифм (ln)
  handleLn() {
    try {
      let value = parseFloat(this.display.innerText);
      if (value > 0) {
        this.display.innerText = Math.log(value).toFixed(2); // Натуральный логарифм
        this.lastInputWasResult = true;
      } else {
        this.display.innerText = "Error"; // Логарифм возможен только для положительных чисел
      }
    } catch (e) {
      this.display.innerText = "Error";
    }
  }

  // Логарифм по основанию 10 (log₁₀)
  handleLog10() {
    try {
      let value = parseFloat(this.display.innerText);
      if (value > 0) {
        this.display.innerText = Math.log10(value).toFixed(2); // Логарифм по основанию 10
        this.lastInputWasResult = true;
      } else {
        this.display.innerText = "Error"; // Логарифм возможен только для положительных чисел
      }
    } catch (e) {
      this.display.innerText = "Error";
    }
  }

  // Логарифм по произвольному основанию
  handleLogBase() {
    try {
      let base = prompt("Введите основание логарифма (больше 0 и не равно 1):");
      let value = parseFloat(this.display.innerText);
      base = parseFloat(base);
      if (value > 0 && base > 0 && base !== 1) {
        this.display.innerText = (Math.log(value) / Math.log(base)).toFixed(2); // Логарифм по произвольному основанию
        this.lastInputWasResult = true;
      } else {
        this.display.innerText = "Error"; // Ошибка при некорректном вводе
      }
    } catch (e) {
      this.display.innerText = "Error";
    }
  }

  // Метод для преобразования числа в шестнадцатеричную систему исчисления
  convertToHex() {
    const currentNumber = parseFloat(this.display.innerText); // Получаем текущее число с дисплея
    if (!isNaN(currentNumber)) { //Проверка, является ли введенное значение числом
      this.display.innerText = currentNumber.toString(16).toUpperCase(); // Преобразуем в HEX и обновляем дисплей
      this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод — это результат
    } else {
      this.display.innerText = "Error"; // Если на экране не число, выводим ошибку
    }
  }
}

// Создаем объект калькулятора для инициализации работы
new Calculator();
