window.onload = () => {
  const screen = document.querySelector(".calc-screen");
  const buttons = document.querySelectorAll(".calc-btn");
  const operators = ["+", "-", "*", "/"];

  for (button of buttons) {
    button.addEventListener("click", handler);
  }

  function handler(e) {
    let digit = e.target.innerHTML;
    let lastDigit = screen.value[screen.value.length - 1];

    console.log(lastDigit);

    switch (digit) {
      case "&lt;":
        screen.value = screen.value.substring(0, screen.value.length - 1);
        break;
      case "CC":
        screen.value = "";
        break;
      case "=":
        try {
          screen.value = Function("return " + screen.value)();
        } catch (error) {
          screen.value = "Invalid";
        }
        break;
      case ")":
        let count = 0;
        if (!operators.includes(lastDigit) && screen.value.includes("("))
          for (char of screen.value) {
            if (char == "(") count += 1;
            if (char == ")") count -= 1;
          }

        for (i = 0; i < count; i++) screen.value += digit;
        break;
      case "(":
        if (
          lastDigit &&
          lastDigit != " " &&
          lastDigit != "(" &&
          (lastDigit == ")" || !operators.includes(lastDigit))
        )
          screen.value += "*" + digit;
        else screen.value += digit;
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (!operators.includes(lastDigit)) {
          screen.value += digit;
        }
        break;
      case ".":
        if (!isNaN(parseInt(lastDigit))) {
          screen.value += digit;
        }
        break;
      default:
        screen.value += digit;
    }

    replaceInvalid();
  }

  function replaceInvalid() {
    screen.value = screen.value.replace(/[^0-9\+\-\*\/\(\)\.]/g, "");
  }
};
