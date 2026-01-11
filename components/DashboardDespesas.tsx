
import React from 'react';
import KPIGridDespesas from './KPIGridDespesas.tsx';
import DespesasPorCategoria from './Charts/DespesasPorCategoria.tsx';
import EvolucaoDespesasMensal from './Charts/EvolucaoDespesasMensal.tsx';
import ComparacaoPeriodos from './Charts/ComparacaoPeriodos.tsx';
import TabelaPlanoConta from './Charts/TabelaPlanoConta.tsx';
import { useDespesas } from '../context/DespesasContext.tsx';

const DashboardDespesas: React.FC = () => {
    const { dadosDespesas } = useDespesas();

    // Se não houver dados, mostrar mensagem
    if (dadosDespesas.length === 0) {
        return (
            <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background-dark">
                <div className="max-w-[900px] mx-auto">
                    <div className="flex flex-col items-center justify-center py-8">
                        <h2 className="text-white text-2xl font-bold mb-2">Nenhum dado carregado</h2>
                        <p className="text-text-muted mb-6">Use o uploader na barra lateral para carregar dados de despesas</p>

                        {/* Formato Esperado */}
                        <div className="bg-surface-dark rounded-xl border border-border-dark p-6 w-full">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">table_chart</span>
                                Formato Esperado: Analise_despesas_Exemplo.xlsx
                            </h3>
                            <div className="bg-background-dark rounded-lg p-4 mb-4">
                                <p className="text-xs text-text-muted mb-3 font-semibold">📊 Estrutura: 4 Abas de Análise de Resultados</p>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-start gap-2 text-xs">
                                        <span className="text-primary font-bold min-w-[100px]">Aba 1:</span>
                                        <span className="text-gray-300">Regime de Caixa - Período Atual com Projetado vs Real e Análise Vertical</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <span className="text-primary font-bold min-w-[100px]">Aba 2:</span>
                                        <span className="text-gray-300">Regime de Competência - Período Atual com Projetado vs Real e Análise Vertical</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <span className="text-primary font-bold min-w-[100px]">Aba 3:</span>
                                        <span className="text-gray-300">Regime de Caixa Enxuto - 12 Meses + Total do Exercício</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <span className="text-primary font-bold min-w-[100px]">Aba 4:</span>
                                        <span className="text-gray-300">Regime de Competência Enxuto - 12 Meses + Total do Exercício</span>
                                    </div>
                                </div>
                                <p className="text-xs text-text-muted border-t border-border-dark pt-3">💡 Use as abas enxutas para série histórica completa. As abas detalhadas mostram período atual com análise variacional.</p>
                            </div>
                            <div className="bg-background-dark rounded-lg p-4 mb-4 overflow-x-auto max-h-[200px] overflow-y-auto">
                                <p className="text-xs text-text-muted mb-2 font-semibold">Colunas Esperadas por Aba</p>
                                <table className="text-xs w-full">
                                    <thead>
                                        <tr className="text-text-muted border-b border-border-dark sticky top-0 bg-background-dark">
                                            <th className="text-left py-1 px-1">Coluna</th>
                                            <th className="text-left py-1 px-1">Formato</th>
                                            <th className="text-left py-1 px-1">Exemplo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300">
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-1 px-1 font-mono text-primary">Ano (A1)</td>
                                            <td className="py-1 px-1">número</td>
                                            <td className="py-1 px-1">2025</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-1 px-1 font-mono text-primary">Mês/Meses</td>
                                            <td className="py-1 px-1">texto</td>
                                            <td className="py-1 px-1">NOVEMBRO, JAN, FEV...</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-1 px-1 font-mono text-primary">Empresa</td>
                                            <td className="py-1 px-1">texto</td>
                                            <td className="py-1 px-1">Empresa 1, Empresa 2</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-1 px-1 font-mono text-primary">Projetado</td>
                                            <td className="py-1 px-1">número (R$)</td>
                                            <td className="py-1 px-1">3.500.000</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-1 px-1 font-mono text-primary">Real</td>
                                            <td className="py-1 px-1">número (R$)</td>
                                            <td className="py-1 px-1">2.322.419</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-1 px-1 font-mono text-primary">Variação</td>
                                            <td className="py-1 px-1">percentual</td>
                                            <td className="py-1 px-1">-33,65%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 px-1 font-mono text-primary">Análise Vertical</td>
                                            <td className="py-1 px-1">percentual</td>
                                            <td className="py-1 px-1">46,55%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-text-muted mb-4">Arquivo: <span className="text-primary font-mono">Analise_despesas_Exemplo.xlsx</span></p>

                            {/* Botões Google Sheets */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <a href="https://docs.google.com/spreadsheets/d/10mrkv9tlvAXRoooNEu5NSMG5sai7gcOXFpIEh9VyR1M/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors">
                                    <span className="material-symbols-outlined text-base">open_in_new</span>
                                    Visualizar Modelo
                                </a>
                                <a href="https://docs.google.com/spreadsheets/d/10mrkv9tlvAXRoooNEu5NSMG5sai7gcOXFpIEh9VyR1M/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors">
                                    <span className="material-symbols-outlined text-base">download</span>
                                    Baixar Arquivo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main id="dashboard-despesas-content" className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background-dark">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-6 w-full">
                {/* Cabeçalho da página */}
                <div>
                    <h1 className="text-white text-3xl font-bold mb-2">Análise de Despesas</h1>
                    <p className="text-text-muted">
                        Visualize e compare as despesas da empresa ao longo do tempo
                    </p>
                </div>

                {/* KPIs */}
                <KPIGridDespesas />

                {/* Gráficos principais */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                    <EvolucaoDespesasMensal />
                    <DespesasPorCategoria />
                </div>

                {/* Comparação de períodos - largura total */}
                <div className="w-full">
                    <ComparacaoPeriodos />
                </div>

                {/* Tabela de Plano de Contas - largura total */}
                <div className="w-full">
                    <TabelaPlanoConta />
                </div>

                {/* Espaço para exportação PDF */}
                <div className="pb-12"></div>
            </div>
        </main>
    );
};

export default DashboardDespesas;

