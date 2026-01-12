
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { useTheme } from '../../context/ThemeContext';
import CustomTooltip from './CustomTooltip';

const CashFlowChart: React.FC = () => {
  const { agregadoMensal } = useFinance();
  const { theme } = useTheme();

  const formatYAxis = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 1000000) {
      return `R$${(value / 1000000).toFixed(1)}mi`;
    } else if (absValue >= 1000) {
      return `R$${(value / 1000).toFixed(0)}k`;
    }
    return `R$${value.toFixed(0)}`;
  };

  const isDark = theme === 'dark';
  const colors = {
    gridStroke: isDark ? '#3b5445' : '#e5e7eb',
    tickFill: isDark ? '#9db9a8' : '#1a1a1a',
    tooltipBg: isDark ? '#1c2720' : '#ffffff',
    tooltipBorder: isDark ? '#3b5445' : '#d1d9d5',
    tooltipText: isDark ? '#fff' : '#1a1a1a',
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 shadow-lg flex flex-col h-[420px] w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-base`}>Fluxo de Caixa Dinâmico</h3>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={agregadoMensal} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={colors.gridStroke} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.tickFill, fontSize: 9 }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.tickFill, fontSize: 9 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              content={<CustomTooltip formatter={(value: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />}
              cursor={{ fill: '#ffffff0a' }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingTop: '10px', fontSize: '9px', color: colors.tickFill }}
            />
            <Bar dataKey="inflow" name="Entradas" fill="#0ebe54" radius={[3, 3, 0, 0]} barSize={12} />
            <Bar dataKey="outflow" name="Saídas" fill="#ef4444" radius={[3, 3, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowChart;
