function inverterString(str) {
    let resultado = '';
    
    // Itera sobre a string do final para o início
    for (let i = str.length - 1; i >= 0; i--) {
        resultado += str[i];
    }
    
    return resultado;
}

const stringOriginal = "Hello, World!";
const stringInvertida = inverterString(stringOriginal);
console.log(`String original: ${stringOriginal}`);
console.log(`String invertida: ${stringInvertida}`);