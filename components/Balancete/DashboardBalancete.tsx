import React, { useState, useEffect } from 'react';
import {
    PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { useBalancete } from '../../context/BalanceteContext';

interface KPIBalanceteCardProps {
    titulo: string;
    valor: number;
    unidade?: string;
    cor: string;
    status: 'ok' | 'alerta' | 'erro';
}

const KPIBalanceteCard: React.FC<KPIBalanceteCardProps> = ({ titulo, valor, unidade = 'R$', cor, status }) => {
    const { theme } = useTheme();
    const isDarkCard = theme === 'dark';

    const statusColor = status === 'ok' ? 'bg-green-500/20 text-green-400' : status === 'alerta' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400';
    const statusIcon = status === 'ok' ? '✓' : status === 'alerta' ? '⚠' : '✕';

    return (
        <div className={`${isDarkCard ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'} rounded-lg p-4 border shadow-sm`}>
            <p className={`${isDarkCard ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{titulo}</p>
            <p className={`text-2xl font-bold ${cor}`}>
                {unidade === 'R$' ? `R$ ${(valor / 1000000).toFixed(2)}M` : `${valor.toFixed(2)}%`}
            </p>
            <div className={`mt-2 px-3 py-1 rounded-full w-fit text-xs font-semibold flex items-center gap-1 ${statusColor}`}>
                <span>{statusIcon}</span>
                <span>{status === 'ok' ? 'OK' : status === 'alerta' ? 'Atenção' : 'Erro'}</span>
            </div>
        </div>
    );
};

const DashboardBalancete: React.FC = () => {
    const { dados, obterTotalAtivo, obterTotalPassivo, obterTotalPL, obterBalanceteOk, obterAtivoCirculante, obterAtivoNaoCirculante, obterPassivoCirculante, obterPassivoNaoCirculante } = useBalancete();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [filtroGrupo, setFiltroGrupo] = useState<string>('Todos');
    const [filtroSubgrupo, setFiltroSubgrupo] = useState<string>('Todos');
    const [ordenacao, setOrdenacao] = useState<'conta' | 'saldo'>('conta');

    const totalAtivo = obterTotalAtivo();
    const totalPassivo = obterTotalPassivo();
    const totalPL = obterTotalPL();
    const balanceteOk = obterBalanceteOk();

    // Dados para gráfico de distribuição do Ativo
    const ativoCirculante = obterAtivoCirculante();
    const ativoNaoCirculante = obterAtivoNaoCirculante();
    const dataAtivoDistribuicao = [
        { name: 'Circulante', value: ativoCirculante, color: '#10b981' },
        { name: 'Não Circulante', value: ativoNaoCirculante, color: '#3b82f6' }
    ];

    // Dados para gráfico de distribuição do Passivo
    const passivoCirculante = obterPassivoCirculante();
    const passivoNaoCirculante = obterPassivoNaoCirculante();
    const dataPassivoDistribuicao = [
        { name: 'Circulante', value: passivoCirculante, color: '#f59e0b' },
        { name: 'Não Circulante', value: passivoNaoCirculante, color: '#8b5cf6' }
    ];

    // Dados para gráfico de Proporção Passivo x PL
    const dataProportao = [
        { name: 'Passivo', value: totalPassivo, color: '#ef4444' },
        { name: 'PL', value: totalPL, color: '#06b6d4' }
    ];

    // Filtrar e ordenar dados da tabela
    let dadosFiltrados = dados.filter(d => {
        if (filtroGrupo !== 'Todos' && d.grupo !== filtroGrupo) return false;
        if (filtroSubgrupo !== 'Todos' && d.subgrupo !== filtroSubgrupo) return false;
        return true;
    });

    if (ordenacao === 'saldo') {
        dadosFiltrados.sort((a, b) => Math.abs(b.saldo) - Math.abs(a.saldo));
    } else {
        dadosFiltrados.sort((a, b) => a.contaContabil.localeCompare(b.contaContabil));
    }

    // Grupos e subgrupos únicos
    const grupos = Array.from(new Set(dados.map(d => d.grupo)));
    const subgrupos = filtroGrupo === 'Todos'
        ? Array.from(new Set(dados.map(d => d.subgrupo)))
        : Array.from(new Set(dados.filter(d => d.grupo === filtroGrupo).map(d => d.subgrupo)));

    const handleExportarCSV = () => {
        const headers = ['Data', 'Conta', 'Nome', 'Grupo', 'Subgrupo', 'Total Débitos', 'Total Créditos', 'Saldo', 'Status'];
        const rows = dadosFiltrados.map(d => [
            d.data,
            d.contaContabil,
            d.nomeContaContabil,
            d.grupo,
            d.subgrupo,
            d.totalDebitos,
            d.totalCreditos,
            d.saldo,
            d.status
        ]);

        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.join(',') + '\n';
        });

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', 'balancete.csv');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className={`flex-1 flex flex-col h-screen overflow-hidden ${isDark ? 'bg-background-dark' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className={`px-8 py-6 border-b ${isDark ? 'border-border-dark bg-surface-dark' : 'border-gray-200 bg-white'}`}>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Balancete Contábil
                </h1>
                <p className={`mt-1 text-sm ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                    Posição patrimonial consolidada da empresa
                </p>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-8 space-y-8">
                    {/* KPIs Principais */}
                    <div>
                        <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Indicadores Principais
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <KPIBalanceteCard
                                titulo="Ativo Total"
                                valor={totalAtivo}
                                cor="text-blue-400"
                                status="ok"
                            />
                            <KPIBalanceteCard
                                titulo="Passivo Total"
                                valor={totalPassivo}
                                cor="text-red-400"
                                status="ok"
                            />
                            <KPIBalanceteCard
                                titulo="Patrimônio Líquido"
                                valor={totalPL}
                                cor="text-cyan-400"
                                status="ok"
                            />
                            <KPIBalanceteCard
                                titulo="Ativo Circulante"
                                valor={ativoCirculante}
                                cor="text-green-400"
                                status="ok"
                            />
                            <div className={`${isDark ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'} rounded-lg p-4 border shadow-sm flex flex-col justify-center items-center text-center`}>
                                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>Status Balancete</p>
                                <div className={`px-3 py-2 rounded-full font-bold text-sm ${balanceteOk ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {balanceteOk ? '✓ Balanceado' : '✕ Desequilibrado'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Distribuição do Ativo */}
                        <div className={`${isDark ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'} rounded-lg p-6 border shadow-sm`}>
                            <h3 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Distribuição do Ativo
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={dataAtivoDistribuicao}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {dataAtivoDistribuicao.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `R$ ${(value / 1000000).toFixed(2)}M`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Distribuição do Passivo */}
                        <div className={`${isDark ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'} rounded-lg p-6 border shadow-sm`}>
                            <h3 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Distribuição do Passivo
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={dataPassivoDistribuicao}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {dataPassivoDistribuicao.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `R$ ${(value / 1000000).toFixed(2)}M`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Proporção Passivo x PL */}
                        <div className={`${isDark ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'} rounded-lg p-6 border shadow-sm`}>
                            <h3 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Proporção Passivo x PL
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={dataProportao}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {dataProportao.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `R$ ${(value / 1000000).toFixed(2)}M`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tabela de Balancete */}
                    <div className={`${isDark ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'} rounded-lg border shadow-sm overflow-hidden`}>
                        <div className="p-6 border-b border-border-dark">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Tabela de Balancete
                                </h3>
                                <button
                                    onClick={handleExportarCSV}
                                    className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded hover:bg-primary/20 transition-colors"
                                >
                                    ↓ Exportar CSV
                                </button>
                            </div>

                            {/* Filtros */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Grupo
                                    </label>
                                    <select
                                        value={filtroGrupo}
                                        onChange={(e) => {
                                            setFiltroGrupo(e.target.value);
                                            setFiltroSubgrupo('Todos');
                                        }}
                                        className={`w-full px-3 py-2 rounded border ${isDark
                                            ? 'bg-background-dark border-border-dark text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            } text-sm focus:outline-none focus:border-primary`}
                                    >
                                        <option value="Todos">Todos</option>
                                        {grupos.map(g => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Subgrupo
                                    </label>
                                    <select
                                        value={filtroSubgrupo}
                                        onChange={(e) => setFiltroSubgrupo(e.target.value)}
                                        className={`w-full px-3 py-2 rounded border ${isDark
                                            ? 'bg-background-dark border-border-dark text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            } text-sm focus:outline-none focus:border-primary`}
                                    >
                                        <option value="Todos">Todos</option>
                                        {subgrupos.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Ordenação
                                    </label>
                                    <select
                                        value={ordenacao}
                                        onChange={(e) => setOrdenacao(e.target.value as 'conta' | 'saldo')}
                                        className={`w-full px-3 py-2 rounded border ${isDark
                                            ? 'bg-background-dark border-border-dark text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                            } text-sm focus:outline-none focus:border-primary`}
                                    >
                                        <option value="conta">Por Conta</option>
                                        <option value="saldo">Por Saldo (maior)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Tabela */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className={`border-b ${isDark ? 'border-border-dark bg-background-dark' : 'border-gray-200 bg-gray-50'}`}>
                                        <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Conta
                                        </th>
                                        <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Nome
                                        </th>
                                        <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Grupo
                                        </th>
                                        <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Débitos
                                        </th>
                                        <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Créditos
                                        </th>
                                        <th className={`px-6 py-3 text-left font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Saldo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dadosFiltrados.map((conta, idx) => (
                                        <tr
                                            key={idx}
                                            className={`border-b transition-colors ${isDark
                                                ? 'border-border-dark hover:bg-background-dark'
                                                : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <td className={`px-6 py-3 font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {conta.contaContabil}
                                            </td>
                                            <td className={`px-6 py-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {conta.nomeContaContabil}
                                            </td>
                                            <td className={`px-6 py-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${conta.grupo === 'Ativo'
                                                    ? 'bg-blue-500/20 text-blue-400'
                                                    : conta.grupo === 'Passivo'
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : 'bg-cyan-500/20 text-cyan-400'
                                                    }`}>
                                                    {conta.grupo}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-3 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                R$ {conta.totalDebitos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className={`px-6 py-3 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                R$ {conta.totalCreditos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className={`px-6 py-3 text-right font-semibold ${conta.saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                R$ {conta.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Resumo */}
                        <div className={`px-6 py-4 border-t ${isDark ? 'border-border-dark bg-background-dark' : 'border-gray-200 bg-gray-50'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Débitos</p>
                                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        R$ {dadosFiltrados.reduce((acc, d) => acc + d.totalDebitos, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Créditos</p>
                                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        R$ {dadosFiltrados.reduce((acc, d) => acc + d.totalCreditos, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Saldos</p>
                                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        R$ {dadosFiltrados.reduce((acc, d) => acc + d.saldo, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Registros</p>
                                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {dadosFiltrados.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informações do Balancete */}
                    <div className={`${isDark ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'} rounded-lg border shadow-sm p-6`}>
                        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <span className="material-symbols-outlined text-primary">info</span>
                            Informações sobre Balancete
                        </h3>
                        <div className={`${isDark ? 'bg-background-dark' : 'bg-gray-50'} rounded-lg p-4 mb-4 overflow-x-auto`}>
                            <table className="text-xs w-full">
                                <thead>
                                    <tr className={`${isDark ? 'text-text-muted border-b border-border-dark' : 'text-gray-600 border-b border-gray-300'}`}>
                                        <th className="text-left py-2">Propriedade</th>
                                        <th className="text-left py-2">Descrição</th>
                                        <th className="text-left py-2">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                    <tr className={`${isDark ? 'border-b border-border-dark/50' : 'border-b border-gray-200'}`}>
                                        <td className="py-2 font-mono text-primary">Data</td>
                                        <td>Data de referência do balancete</td>
                                        <td className="font-semibold">31/12/2024</td>
                                    </tr>
                                    <tr className={`${isDark ? 'border-b border-border-dark/50' : 'border-b border-gray-200'}`}>
                                        <td className="py-2 font-mono text-primary">Empresa</td>
                                        <td>Empresa de origem dos dados</td>
                                        <td className="font-semibold">Alpha</td>
                                    </tr>
                                    <tr className={`${isDark ? 'border-b border-border-dark/50' : 'border-b border-gray-200'}`}>
                                        <td className="py-2 font-mono text-primary">Estrutura</td>
                                        <td>Consolidação de saldos por conta</td>
                                        <td className="font-semibold">Saldos Consolidados</td>
                                    </tr>
                                    <tr className={`${isDark ? 'border-b border-border-dark/50' : 'border-b border-gray-200'}`}>
                                        <td className="py-2 font-mono text-primary">Fonte</td>
                                        <td>Origem dos dados contábeis</td>
                                        <td className="font-semibold">Balancete Manual</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 font-mono text-primary">Validação</td>
                                        <td>Status de equilíbrio contábil</td>
                                        <td className="font-semibold">
                                            <span className={balanceteOk ? 'text-green-400' : 'text-red-400'}>
                                                {balanceteOk ? '✓ Balanceado' : '✕ Desequilibrado'}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                            <strong>Nota:</strong> Este balancete é independente e não possui vínculo técnico com DRE ou Despesas. Os saldos são consolidados por conta contábil sem desagregação de lançamentos unitários.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBalancete;
