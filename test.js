let display = document.querySelector(".display");
let buttons = Array.from(document.querySelectorAll(".button"));

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "0";
        break;

      case "=":
        try {
          // Если на дисплее есть символ √
          if (display.innerText.includes("√")) {
            // Извлекаем число после символа √ и вычисляем его квадратный корень
            let expression = display.innerText.replace("√", ""); // Убираем √ из выражения
            display.innerText = Math.sqrt(eval(expression)); // Вычисляем корень
          } else {
            display.innerText = eval(display.innerText); // Обычное выражение
          }
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

      case "√":
        // Если на дисплее "0", то заменяем его на символ "√"
        if (display.innerText === "0") {
          display.innerText = "√";
        } else {
          // Если на дисплее уже есть выражение, добавляем символ "√" в конец
          display.innerText += "√";
        }
        break;

      default:
        if (display.innerText === "0" && e.target.innerText != ".") {
          display.innerText = e.target.innerText;
        } else {
          display.innerText += e.target.innerText;
        }
    }
  });
});
