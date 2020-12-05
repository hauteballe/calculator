const Calculator = () => {
  const controlPanel = document.querySelector(".calc-buttons");
  const display = document.getElementById("display");
  const state = {
    currentNumber: 0,
    newNumber: false,
    pendingOperation: "",
  };

  const pressCancel = () => {
    display.value = "0";
    state.newNumber = true;
  };

  const pressClear = () => {
    display.value = "0";
    state.currentNumber = 0;
    state.pendingOperation = "";
    state.newNumber = true;
  };

  const pressDecimal = () => {
    let localDecimalMemory = display.value;

    if (state.newNumber) {
      localDecimalMemory = "0.";
      state.newNumber = false;
    } else {
      if (!localDecimalMemory.includes(".")) {
        localDecimalMemory += ".";
      }
    }
    display.value = localDecimalMemory;
  };

  const pressNumbers = (number) => {
    if (state.newNumber || display.value === "0") {
      display.value = number;
      state.newNumber = false;
    } else {
      display.value += number;
    }
  };

  const executePendingOperation = () => {
    let localOperationMemory = display.value;

    if (state.pendingOperation === "+") {
      state.currentNumber += Number(localOperationMemory);
    } else if (state.pendingOperation === "-") {
      state.currentNumber -= Number(localOperationMemory);
    } else if (state.pendingOperation === "*") {
      state.currentNumber *= Number(localOperationMemory);
    } else if (state.pendingOperation === "/") {
      state.currentNumber /= Number(localOperationMemory);
    } else {
      state.currentNumber = Number(localOperationMemory);
    }
  };

  const pressOperations = (op) => {
    if (state.newNumber && state.pendingOperation !== "=") {
      display.value = state.currentNumber;
      state.pendingOperation = op;
    } else {
      state.newNumber = true;
      executePendingOperation();
      display.value = state.currentNumber;
      state.pendingOperation = op;
    }
  };

  const pressEqual = () => {
    executePendingOperation();
    display.value = state.currentNumber;
    state.pendingOperation = "";
    state.newNumber = true;
  };

  const controllers = {
    cancel: pressCancel,
    clear: pressClear,
    decimal: pressDecimal,
    number: pressNumbers,
    operation: pressOperations,
    equal: pressEqual,
  };

  const controlHandler = (event) => {
    const handler = controllers[event.target.dataset.btnType];
    if (handler) {
      handler(event.target.textContent);
    } else {
      console.log("Calculator Error: invalid controller name.");
    }
  };

  controlPanel.addEventListener("click", controlHandler);
};

const calculator = Calculator();
