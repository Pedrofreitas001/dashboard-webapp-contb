
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { formatBRL } from '../../utils/financeUtils';

const ExpenseDonut: React.FC = () => {
  const { agregadoCategoria } = useFinance();
  const total = agregadoCategoria.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-[#1c2720] border border-[#3b5445] rounded-xl p-6 flex flex-col h-[420px] w-full">
      <h3 className="text-white font-semibold text-base mb-8 shrink-0">Despesas por Categoria</h3>
      
      <div className="flex items-center h-full min-h-0 gap-4">
        <div className="w-[45%] h-full relative min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={agregadoCategoria}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="95%"
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {agregadoCategoria.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1c2720', border: '1px solid #3b5445', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ fontSize: '10px', color: '#fff' }}
                formatter={(val: any) => formatBRL(val)}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[14px] font-black text-white drop-shadow-sm">
              {total > 1000000 ? `R$ ${(total/1000000).toFixed(1)}M` : `R$ ${(total/1000).toFixed(0)}k`}
            </span>
          </div>
        </div>
        
        <div className="w-[55%] flex flex-col pl-4 justify-center">
          <div className="flex flex-col gap-6">
            {agregadoCategoria.map((cat) => (
              <div key={cat.name} className="flex items-center gap-3 group w-full">
                <span className="h-3.5 w-3.5 rounded-full shrink-0 border border-white/5" style={{ backgroundColor: cat.color }}></span>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-center w-full gap-2">
                    <span className="text-[10px] text-[#9db9a8] font-bold uppercase tracking-wider truncate">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-primary font-black shrink-0">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDonut;
