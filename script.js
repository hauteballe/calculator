let numbers = document.querySelectorAll('.btn-nmb'),
    operations = document.querySelectorAll('.btn-operation'),
    clearButtons = document.querySelectorAll('.btn-clear'),
    decimalButton = document.getElementById('decimal'),
    result = document.getElementById('equal'),
    display = document.getElementById('display'),
    memoryCurrentNumber = 0,
    memoryNewNumber = false,
    memoryPendingOperation = '';

const numberPress = (number) => {
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if(display.value === '0') {
            display.value = number;
        } else {
        display.value += number;
    };
   };
};

const operationPress = (op) => {
    let localOperationMemory = display.value;
    
    if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += Number(localOperationMemory);  
        } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= Number(localOperationMemory);  
        } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= Number(localOperationMemory);
        } else if (memoryPendingOperation === '/') {
            memoryCurrentNumber /= Number(localOperationMemory);  
        } else {
            memoryCurrentNumber = Number(localOperationMemory);  
        }

        display.value = memoryCurrentNumber;
        memoryPendingOperation = op;
    };        
};

const decimal = () => {
    let localDecimalMemory = display.value;
    
    if (memoryNewNumber) {
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

const clear = (id) => {
    if (id === 'ce') {
        display.value = '0'
        memoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0'; 
        memoryNewNumber = true;
        memoryCurrentNumber = 0;
        memoryPendingOperation = '';
    }
};

for (let i = 0; i<numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener("click", function(e){
        numberPress(e.target.textContent);
    });
};

for (let i = 0; i<operations.length; i++) {
    let operationButton = operations[i];
    operationButton.addEventListener("click", function(e){
        operationPress(e.target.textContent);
    });
};

for (let i = 0; i<clearButtons.length; i++) {
    let clearButton = clearButtons[i];
    clearButton.addEventListener("click", function(e) {
    clear(e.target.textContent);
    });
};

decimalButton.addEventListener("click", decimal);

result.addEventListener("click", function(e){
    console.log("Клик по result")
});
     

