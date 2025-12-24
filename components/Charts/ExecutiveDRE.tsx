
import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatBRL } from '../../utils/financeUtils';

const ExecutiveDRE: React.FC = () => {
  const { kpis } = useFinance();

  const dreItems = [
    { label: 'Faturamento Bruto', value: kpis.faturamentoBruto, color: 'bg-primary' },
    { label: 'Custo Variável', value: Math.abs(kpis.custoVariavel), color: 'bg-red-500/80' },
    { label: 'Margem Contribuição', value: kpis.margemContribuicao, color: 'bg-[#3b82f6]' },
    { label: 'Resultado Final', value: kpis.resultado, color: 'bg-emerald-600' },
  ];

  const maxValue = Math.max(...dreItems.map(i => Math.abs(i.value)), 1);

  return (
    <div className="bg-[#1c2720] border border-[#3b5445] rounded-xl p-6 flex flex-col h-[420px] w-full">
      <div className="flex justify-between items-center mb-10 shrink-0">
        <h3 className="text-white font-semibold text-base">Visão Executiva (DRE)</h3>
        <span className="text-[9px] text-[#9db9a8] uppercase tracking-wider font-bold">Proporcional</span>
      </div>
      
      <div className="flex flex-col gap-10 justify-center flex-1 pr-1">
        {dreItems.map((item) => {
          const absValue = Math.abs(item.value);
          const percentage = Math.min((absValue / maxValue) * 100, 100);
          return (
            <div key={item.label} className="flex flex-col">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[11px] font-bold text-[#9db9a8] uppercase tracking-widest">{item.label}</span>
                <span className="text-[11px] font-black text-white whitespace-nowrap">{formatBRL(item.value)}</span>
              </div>
              
              <div className="w-full bg-[#111814] rounded-full h-4 overflow-hidden border border-[#3b5445]">
                <div 
                  className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutiveDRE;
