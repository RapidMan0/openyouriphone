// Находим элемент с классом "display" — это экран калькулятора, где будет отображаться результат
let display = document.querySelector(".display");

// Находим все элементы с классом "button" (кнопки калькулятора) и преобразуем их в массив
let buttons = Array.from(document.querySelectorAll(".button"));

// Пробегаем по каждой кнопке и добавляем обработчик события "click" на каждую
buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "0";
        break;

      case "=":
        try {
          display.innerText = eval(display.innerText);
        } catch (e) {
          display.innerText = "Error!";
        }
        break;

      case "+/-":
        display.innerText = "-";
        break;

      case "%":
        let texttrecut = display.innerText + "/100";
        display.innerText = eval(texttrecut);
        break;

      default:
        // Если на дисплее "0" и нажатая кнопка не является десятичной точкой ("."),
        // то заменяем "0" на текст нажатой кнопки
        if (display.innerText === "0" && e.target.innerText != ".") {
          display.innerText = e.target.innerText;
        } else {
          // В остальных случаях добавляем текст нажатой кнопки к текущему значению дисплея
          display.innerText += e.target.innerText;
        }
    }
  });
});
