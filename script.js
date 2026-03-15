const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let value = btn.textContent;

    if (value === "AC") {
      screen.value = "0";
    }
    else if (value === "DE") {
      screen.value = screen.value.slice(0, -1) || "0";
    }
    else if (value === "=") {
      try {
        screen.value = eval(
          screen.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
        );
      } catch {
        screen.value = "Error";
      }
    }
    else {
      if (screen.value === "0") {
        screen.value = value;
      } else {
        screen.value += value;
      }
    }
  });
});
