
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
            <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background-dark min-h-screen">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <h2 className="text-white text-2xl font-bold mb-4">Nenhum dado carregado</h2>
                        <p className="text-text-muted mb-8">Baixe o arquivo Excel modelo e carregue na barra lateral para visualização</p>

                        {/* Formato Esperado */}
                        <div className="bg-surface-dark rounded-xl border border-border-dark p-6 w-full max-w-2xl">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">description</span>
                                Formato Esperado: Analise_despesas_Exemplo.xlsx
                            </h3>
                            <div className="bg-background-dark rounded-lg p-4 mb-4 overflow-x-auto">
                                <table className="text-xs w-full">
                                    <thead>
                                        <tr className="text-text-muted border-b border-border-dark">
                                            <th className="text-left py-2">Coluna</th>
                                            <th className="text-left py-2">Tipo</th>
                                            <th className="text-left py-2">Exemplo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300">
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-2 font-mono text-primary">Ano</td>
                                            <td>número</td>
                                            <td>2025</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-2 font-mono text-primary">Mês/Meses</td>
                                            <td>texto</td>
                                            <td>NOVEMBRO, JAN, FEV...</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-2 font-mono text-primary">Empresa</td>
                                            <td>texto</td>
                                            <td>Empresa 1, Empresa 2</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-2 font-mono text-primary">Projetado</td>
                                            <td>número (R$)</td>
                                            <td>3.500.000</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-2 font-mono text-primary">Real</td>
                                            <td>número (R$)</td>
                                            <td>2.322.419</td>
                                        </tr>
                                        <tr className="border-b border-border-dark/50">
                                            <td className="py-2 font-mono text-primary">Variação</td>
                                            <td>percentual</td>
                                            <td>-33,65%</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-mono text-primary">Análise Vertical</td>
                                            <td>percentual</td>
                                            <td>46,55%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-text-muted mb-4">Arquivo: <span className="text-primary font-mono">Analise_despesas_Exemplo.xlsx</span></p>

                            {/* Botão Download */}
                            <a href="https://docs.google.com/spreadsheets/d/10mrkv9tlvAXRoooNEu5NSMG5sai7gcOXFpIEh9VyR1M/export?format=xlsx" download className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors w-full">
                                <span className="material-symbols-outlined text-base">download</span>
                                Baixar Arquivo
                            </a>
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

