function isFibonacci(num) {
    if (num < 0) return false;
    let a = 0, b = 1;
    while (a < num) {
        [a, b] = [b, a + b];
    }
    return a === num;
}

//número para verificar outro valor
const number = 21; 


if (isFibonacci(number)) {
    console.log(`${number} pertence à sequência de Fibonacci.`);
} else {
    console.log(`${number} não pertence à sequência de Fibonacci.`);
}