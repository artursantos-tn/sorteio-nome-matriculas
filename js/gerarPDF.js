window.relatorioSecreto = function(senha) {
    const SENHA_MESTRE = "adventista2027"; 

    if (senha !== SENHA_MESTRE) {
        console.error("❌ Acesso negado: Senha incorreta!");
        return;
    }

    if (!window.drawnNames || window.drawnNames.length === 0) {
        alert("Nenhum sorteio foi realizado ainda para exportar!");
        console.warn("⚠️ Nenhum nome foi sorteado até o momento.");
        return;
    }

    let printWindow = window.open('', '_blank');

    let htmlContent = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Relatório de Sorteio e Prêmios - Colégio Adventista Novo Mundo</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #0f172a;
                    padding: 40px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #0284c7;
                    padding-bottom: 20px;
                }
                .header h1 {
                    color: #1e3a8a;
                    font-size: 22px;
                    margin-bottom: 5px;
                }
                .header h2 {
                    color: #0284c7;
                    font-size: 16px;
                    font-weight: normal;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #cbd5e1;
                    padding: 12px 16px;
                    text-align: left;
                }
                th {
                    background-color: #0284c7;
                    color: white;
                    font-size: 14px;
                }
                td {
                    font-size: 14px;
                }
                tr:nth-child(even) {
                    background-color: #f8fafc;
                }
                .badge-ganhou {
                    color: #16a34a;
                    font-weight: bold;
                }
                .badge-perdeu {
                    color: #dc2626;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 12px;
                    color: #64748b;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Colégio Adventista Novo Mundo</h1>
                <h2>Campanha de Matrículas 2027 - Relatório Oficial de Prêmios</h2>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Ordem</th>
                        <th>Nome do Participante Sorteado</th>
                        <th>Status e Prêmio</th>
                    </tr>
                </thead>
                <tbody>
    `;

    window.drawnNames.forEach((item, index) => {
        let statusClass = item.status === "GANHOU" ? "badge-ganhou" : "badge-perdeu";
        htmlContent += `
            <tr>
                <td><strong>#${index + 1}</strong></td>
                <td>${item.name}</td>
                <td><span class="${statusClass}">${item.status}</span> - ${item.prize}</td>
            </tr>
        `;
    });

    htmlContent += `
                </tbody>
            </table>

            <div class="footer">
                <p>Documento gerado digitalmente pelo sistema de sorteio institucional.</p>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    console.log("✅ Relatório de prêmios gerado com sucesso via console!");
};

console.log("%c💡 Dica do Sistema:", "color: #0284c7; font-weight: bold; font-size: 12px;");
console.log("Para gerar o relatório em PDF, digite no console: relatorioSecreto('sua_senha')");