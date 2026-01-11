import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CashFlowItem {
    id: string;
    mes: number;
    empresa: string;
    tipo: 'Receber' | 'Pagar';
    categoria: string;
    data_vencimento: string;
    valor: number;
    status: 'Aberto' | 'Parcial' | 'Pago' | 'Atrasado';
    responsavel?: string;
    descricao?: string;
}

interface CashFlowContextType {
    dados: CashFlowItem[];
    saldoAtual: number;
    diasCaixa: number;
    contasVencidas: number;
    fluxo30Dias: number;
    empresas: string[];
    categorias: string[];
    loading: boolean;
    error: string | null;
    setDados: (dados: CashFlowItem[]) => void;
    filtrarPorEmpresa: (empresa: string) => CashFlowItem[];
    filtrarPorPeriodo: (mesInicio: number, mesFim: number) => CashFlowItem[];
}

const CashFlowContext = createContext<CashFlowContextType | undefined>(undefined);

export const CashFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dados, setDados] = useState<CashFlowItem[]>([
        { id: 'cf1', mes: 1, empresa: 'Alpha', tipo: 'Receber', categoria: 'Vendas', data_vencimento: '15/01/2025', valor: 50000, status: 'Pago', responsavel: 'Vendas' },
        { id: 'cf2', mes: 1, empresa: 'Alpha', tipo: 'Pagar', categoria: 'Folha', data_vencimento: '30/01/2025', valor: 80000, status: 'Aberto', responsavel: 'RH' },
        { id: 'cf3', mes: 1, empresa: 'Alpha', tipo: 'Pagar', categoria: 'Aluguel', data_vencimento: '05/01/2025', valor: 10000, status: 'Pago', responsavel: 'Admin' },
        { id: 'cf4', mes: 1, empresa: 'Beta', tipo: 'Receber', categoria: 'Serviços', data_vencimento: '20/01/2025', valor: 75000, status: 'Pago', responsavel: 'Vendas' },
        { id: 'cf5', mes: 1, empresa: 'Beta', tipo: 'Pagar', categoria: 'Fornecedores', data_vencimento: '25/01/2025', valor: 120000, status: 'Aberto', responsavel: 'Compras' },
        { id: 'cf6', mes: 2, empresa: 'Alpha', tipo: 'Receber', categoria: 'Vendas', data_vencimento: '15/02/2025', valor: 60000, status: 'Aberto', responsavel: 'Vendas' },
        { id: 'cf7', mes: 2, empresa: 'Alpha', tipo: 'Pagar', categoria: 'Folha', data_vencimento: '28/02/2025', valor: 85000, status: 'Aberto', responsavel: 'RH' },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cálculos derivados
    const saldoAtual = dados.reduce((acc, item) => {
        if (item.status === 'Pago' || item.status === 'Parcial') {
            return item.tipo === 'Receber' ? acc + item.valor : acc - item.valor;
        }
        return acc;
    }, 0);

    const fluxo30Dias = dados
        .filter(item => {
            const dateParts = item.data_vencimento.split('/');
            const itemDate = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
            const thirtyDaysFromNow = new Date();
            thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
            return itemDate <= thirtyDaysFromNow && itemDate >= new Date();
        })
        .reduce((acc, item) => (item.tipo === 'Receber' ? acc + item.valor : acc - item.valor), 0);

    const diasCaixa = saldoAtual > 0 ? Math.floor(saldoAtual / (dados.filter(i => i.tipo === 'Pagar' && i.status !== 'Pago').reduce((acc, i) => acc + i.valor, 0) / 30 || 1)) : 0;

    const contasVencidas = dados.filter(item => item.status === 'Atrasado').length;

    const empresas = Array.from(new Set(dados.map(item => item.empresa)));
    const categorias = Array.from(new Set(dados.map(item => item.categoria)));

    const filtrarPorEmpresa = (empresa: string) => dados.filter(item => item.empresa === empresa);
    const filtrarPorPeriodo = (mesInicio: number, mesFim: number) =>
        dados.filter(item => item.mes >= mesInicio && item.mes <= mesFim);

    return (
        <CashFlowContext.Provider
            value={{
                dados,
                saldoAtual,
                diasCaixa,
                contasVencidas,
                fluxo30Dias,
                empresas,
                categorias,
                loading,
                error,
                setDados,
                filtrarPorEmpresa,
                filtrarPorPeriodo,
            }}
        >
            {children}
        </CashFlowContext.Provider>
    );
};

export const useCashFlow = () => {
    const context = useContext(CashFlowContext);
    if (!context) {
        throw new Error('useCashFlow must be used within CashFlowProvider');
    }
    return context;
};
