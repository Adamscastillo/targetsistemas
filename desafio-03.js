const fs = require('fs');
const xml2js = require('xml2js');

// Função para processar dados de faturamento
function processarFaturamento(dados) {
    // Filtra os dados para remover dias sem faturamento
    const faturamentos = dados.filter(d => d.valor > 0);

    if (faturamentos.length === 0) {
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

        xml2js.parseString(data, { explicitArray: true, mergeAttrs: true }, (err, result) => {
            if (err) {
                console.error("Erro ao parsear o XML:", err);
                return;
            }

            try {
                // Log da estrutura do XML para depuração
                console.log(JSON.stringify(result, null, 2));

                // Acessa os dados do XML
                // Ajustar conforme a estrutura real retornada pelo XML
                const rows = result.root.row; // Ajuste isso conforme o log do JSON
                const dados = rows.map(r => ({
                    dia: parseInt(r.dia),
                    valor: parseFloat(r.valor)
                }));

                processarFaturamento(dados);
            } catch (e) {
                console.error("Erro ao processar dados do XML:", e);
            }
        });
    });
}

// Escolha qual função usar para processar JSON ou XML
//processarJson(); // Para processar JSON
 processarXml(); // Para processar XML
