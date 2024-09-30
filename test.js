class Calculator {
    constructor() {
        this.display = document.querySelector(".display");
        this.buttons = Array.from(document.querySelectorAll(".button"));
        this.memory = 0; // Хранение значения памяти
        this.initialize();
        this.lastInputWasResult = false; // Переменная для отслеживания, был ли последний ввод результатом
    }

    initialize() {
        this.buttons.forEach((button) => {
            button.addEventListener("click", (e) => this.megabutoane(e.target.innerText));
        });
    }

    megabutoane(scriere) {
        switch (scriere) {
            case "AC":
                this.clearDisplay();
                break;
            case "=":
                this.calculateResult();
                break;
            case "+/-":
                this.toggleSign();
                break;
            case "%":
                this.calculatePercentage();
                break;
            case "√":
                this.handleSquareRoot();
                break;
            case "MC":
                this.memoryClear();
                break;
            case "MR":
                this.memoryRecall();
                break;
            case "M+":
                this.memoryAdd();
                break;
            case "M-":
                this.memorySubtract();
                break;
            default:
                this.updateDisplay(scriere);
        }
    }

    clearDisplay() {
        this.display.innerText = "0";
        this.lastInputWasResult = false;
    }

    calculateResult() {
        try {
            let expression = this.display.innerText;

            // Обрабатываем квадратный корень как Math.sqrt()
            if (expression.includes("√")) {
                expression = expression.replace(/√(\d+(\.\d+)?)/g, (match, number) => {
                    return Math.sqrt(number); // Заменяем корень на вычисленный результат
                });
            }

            this.display.innerText = eval(expression); // Вычисляем выражение
            this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод был результатом
        } catch (e) {
            this.display.innerText = "Error!";
        }
    }

    toggleSign() {
        if (this.display.innerText !== "0") {
            this.display.innerText = this.display.innerText.startsWith("-")
                ? this.display.innerText.slice(1)
                : "-" + this.display.innerText;
        }
    }

    calculatePercentage() {
        this.display.innerText = eval(this.display.innerText + "/100");
        this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод был результатом
    }

    handleSquareRoot() {
        if (this.display.innerText === "0") {
            this.display.innerText = "√";
        } else {
            this.display.innerText += "√";
        }
    }

    updateDisplay(scriere) {
        if (this.lastInputWasResult) {
            this.display.innerText = scriere; // Если последний ввод был результатом, сбрасываем дисплей
            this.lastInputWasResult = false; // Сбрасываем флаг
        } else {
            if (this.display.innerText === "0" && scriere !== ".") {
                this.display.innerText = scriere;
            } else {
                this.display.innerText += scriere;
            }
        }
    }

    // Методы для работы с памятью
    memoryClear() {
        this.memory = 0; // Очищаем память
    }

    memoryRecall() {
        this.display.innerText = this.memory.toString(); // Выводим на экран значение из памяти
        this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод был результатом
    }

    memoryAdd() {
        this.memory += parseFloat(this.display.innerText); // Добавляем текущее значение к памяти
        this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод был результатом
    }

    memorySubtract() {
        this.memory -= parseFloat(this.display.innerText); // Вычитаем текущее значение из памяти
        this.lastInputWasResult = true; // Устанавливаем флаг, что последний ввод был результатом
    }
}

new Calculator();
