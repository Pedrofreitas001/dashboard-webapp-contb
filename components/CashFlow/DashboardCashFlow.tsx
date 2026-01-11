import React, { useState, useEffect } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCashFlow } from '../../context/CashFlowContext/CashFlowContext';

const DashboardCashFlow: React.FC = () => {
    const { dados, saldoAtual, diasCaixa, contasVencidas, fluxo30Dias, empresas } = useCashFlow();
    const [selectedEmpresa, setSelectedEmpresa] = useState<string>('');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const empresa = selectedEmpresa || empresas[0];
        const filtered = dados.filter(d => d.empresa === empresa);

        const agrupado = new Map();
        filtered.forEach(item => {
            const key = item.data_vencimento;
            if (!agrupado.has(key)) {
                agrupado.set(key, { data: key, receitas: 0, despesas: 0 });
            }
            const current = agrupado.get(key);
            if (item.tipo === 'Receber') current.receitas += item.valor;
            else current.despesas += item.valor;
        });

        setChartData(Array.from(agrupado.values()));
    }, [selectedEmpresa, dados, empresas]);

    const formatCurrency = (value: number) => `R$ ${(value / 1000).toFixed(1)}k`;

    if (dados.length === 0) {
        return (
            <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background-dark">
                <div className="max-w-[1400px] mx-auto flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-primary text-5xl">trending_up</span>
                        </div>
                        <h2 className="text-white text-2xl font-bold mb-2">Nenhum dado carregado</h2>
                        <p className="text-text-muted">Carregue dados de fluxo de caixa para visualizar.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background-dark">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-100">Fluxo de Caixa</h1>
                    <p className="text-gray-400 text-sm mt-2">Gerenciamento de entradas e saídas</p>
                </div>

                {/* Filtro */}
                <div className="mb-6 bg-surface-dark rounded-xl p-4 border border-border-dark">
                    <label className="block text-xs font-bold text-text-muted uppercase mb-3">Empresa</label>
                    <select
                        value={selectedEmpresa || empresas[0] || ''}
                        onChange={(e) => setSelectedEmpresa(e.target.value)}
                        className="w-full p-2.5 border border-border-dark rounded-lg bg-background-dark text-gray-100 focus:ring-2 focus:ring-primary/50 text-sm"
                    >
                        {empresas.map(empresa => (
                            <option key={empresa} value={empresa}>{empresa}</option>
                        ))}
                    </select>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-surface-dark rounded-xl p-4 border border-border-dark">
                        <p className="text-xs font-bold text-text-muted uppercase mb-2">Saldo Atual</p>
                        <p className="text-2xl font-bold text-green-500">{formatCurrency(saldoAtual)}</p>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-4 border border-border-dark">
                        <p className="text-xs font-bold text-text-muted uppercase mb-2">Dias de Caixa</p>
                        <p className="text-2xl font-bold text-blue-500">{diasCaixa} dias</p>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-4 border border-border-dark">
                        <p className="text-xs font-bold text-text-muted uppercase mb-2">Contas Vencidas</p>
                        <p className={`text-2xl font-bold ${contasVencidas > 0 ? 'text-red-500' : 'text-green-500'}`}>{contasVencidas}</p>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-4 border border-border-dark">
                        <p className="text-xs font-bold text-text-muted uppercase mb-2">Fluxo 30 dias</p>
                        <p className={`text-2xl font-bold ${fluxo30Dias > 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(fluxo30Dias)}</p>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-4 border border-border-dark">
                        <p className="text-xs font-bold text-text-muted uppercase mb-2">Status</p>
                        <p className={`text-lg font-bold ${saldoAtual > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {saldoAtual > 0 ? 'Positivo ✅' : 'Crítico ⚠️'}
                        </p>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-surface-dark rounded-xl p-6 border border-border-dark">
                        <h2 className="text-base font-bold text-white mb-4">Receitas vs Despesas</h2>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={chartData} margin={{ left: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="data" tick={{ fontSize: 12 }} />
                                <YAxis tickFormatter={formatCurrency} width={75} tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(value: any) => formatCurrency(value)} contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }} />
                                <Legend />
                                <Bar dataKey="receitas" stackId="a" fill="#10b981" name="Receitas" />
                                <Bar dataKey="despesas" stackId="a" fill="#ef4444" name="Despesas" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-surface-dark rounded-xl p-6 border border-border-dark">
                        <h2 className="text-base font-bold text-white mb-4">Evolução do Saldo</h2>
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={chartData} margin={{ left: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="data" tick={{ fontSize: 12 }} />
                                <YAxis tickFormatter={formatCurrency} width={75} tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(value: any) => formatCurrency(value)} contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="receitas" fill="#10b981" stroke="#10b981" fillOpacity={0.6} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tabela */}
                <div className="bg-surface-dark rounded-xl p-6 border border-border-dark overflow-hidden">
                    <h2 className="text-base font-bold text-white mb-4">Detalhamento de Contas</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-background-dark border-b border-border-dark">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase">Data Vencimento</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase">Categoria</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase">Tipo</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-text-muted uppercase">Valor</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-text-muted uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dados
                                    .filter(d => !selectedEmpresa || d.empresa === selectedEmpresa)
                                    .map((item, idx) => (
                                        <tr key={idx} className="border-b border-border-dark hover:bg-background-dark/50 transition-colors">
                                            <td className="px-4 py-3 text-gray-300">{item.data_vencimento}</td>
                                            <td className="px-4 py-3 text-gray-300">{item.categoria}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${item.tipo === 'Receber' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {item.tipo}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold text-gray-300">{formatCurrency(item.valor)}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Pago' ? 'bg-green-500/20 text-green-400' :
                                                        item.status === 'Atrasado' ? 'bg-red-500/20 text-red-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardCashFlow;
