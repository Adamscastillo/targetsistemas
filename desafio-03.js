/* Dado um vetor que guarda o valor de faturamento diário de uma distribuidora,
faça um programa, na linguagem que desejar, que calcule e retorne:
• O menor valor de faturamento ocorrido em um dia do mês;
• O maior valor de faturamento ocorrido em um dia do mês;
• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.
 */

const fs = require('fs');
const { DOMParser } = require('xmldom');

// Função para processar dados de faturamento
function processarFaturamento(dados) {
    // Filtra os dados para remover dias sem faturamento
    const faturamentos = dados.filter(d => d.valor > 0);

    if (faturamentos.length == 0) {
        console.log("Não há dados de faturamento disponíveis.");
        return;
    }

    // Calcula o menor e o maior valor de faturamento
    const menorValor = Math.min(...faturamentos.map(d => d.valor));
    const maiorValor = Math.max(...faturamentos.map(d => d.valor));

    // Calcula a média mensal de faturamento
    const totalFaturamento = faturamentos.reduce((acc, d) => acc + d.valor, 0);
    const mediaMensal = totalFaturamento / faturamentos.length;

    // Conta o número de dias com faturamento acima da média
    const diasAcimaDaMedia = faturamentos.filter(d => d.valor > mediaMensal).length;

    // Imprime os resultados
    console.log(`Menor valor de faturamento: ${menorValor}`);
    console.log(`Maior valor de faturamento: ${maiorValor}`);
    console.log(`Número de dias com faturamento acima da média mensal: ${diasAcimaDaMedia}`);
}

// Função para ler e processar JSON
function processarJson() {
    fs.readFile('faturamento.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo JSON:", err);
            return;
        }
        try {
            const dados = JSON.parse(data);
            processarFaturamento(dados);
        } catch (e) {
            console.error("Erro ao parsear o JSON:", e);
        }
    });
}

// Função para ler e processar XML
function processarXml() {
    fs.readFile('faturamento.xml', 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo XML:", err);
            return;
        }
        
        try {
            const doc = new DOMParser().parseFromString(data, 'text/xml');
            const rows = doc.getElementsByTagName('row');
            
            const dados = Array.from(rows).map(row => ({
                dia: parseInt(row.getElementsByTagName('dia')[0].textContent),
                valor: parseFloat(row.getElementsByTagName('valor')[0].textContent)
            }));
            
            processarFaturamento(dados);
        } catch (e) {
            console.error("Erro ao processar dados do XML:", e);
        }
    });
}

// Escolha qual função usar para processar JSON ou XML
processarJson(); // Para processar JSON
// processarXml(); // Para processar XML
