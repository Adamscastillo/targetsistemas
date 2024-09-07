const faturamento = {
    SP: 67836.43,
    RJ: 36678.66,
    MG: 29229.88,
    ES: 27165.48,
    Outros: 19849.53
};

function calcularPercentuais(faturamento) {
    // Calcula o valor total mensal
    const total = Object.values(faturamento).reduce((acc, valor) => acc + valor, 0);
    
    console.log(`Valor total mensal: R$${total.toFixed(2)}`);

    // Calcula e imprime o percentual para cada estado
    for (const estado in faturamento) {
        const valor = faturamento[estado];
        const percentual = (valor / total) * 100;
        console.log(`Percentual de representação de ${estado}: ${percentual.toFixed(2)}%`);
    }
}

// Executa a função
calcularPercentuais(faturamento);