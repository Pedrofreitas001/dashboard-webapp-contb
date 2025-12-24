
import React from 'react';
import { useFinance } from '../../context/FinanceContext';

const CompanyPerformance: React.FC = () => {
  const { agregadoEmpresa } = useFinance();

  return (
    <div className="bg-[#1c2720] border border-[#3b5445] rounded-xl p-6 flex flex-col h-[420px] w-full overflow-hidden">
      <h3 className="text-white font-semibold text-base mb-6">Faturamento por Empresa</h3>
      <div className="flex flex-col gap-5 justify-center flex-1 overflow-y-auto custom-scrollbar px-1">
        {agregadoEmpresa.map((company, idx) => (
          <div key={company.name} className="space-y-1.5 group">
            <div className="flex justify-between text-[9px]">
              <span className="text-[#9db9a8] font-bold uppercase group-hover:text-white transition-colors">{company.name}</span>
              <span className="text-primary font-bold">{company.performance}%</span>
            </div>
            <div className="w-full bg-[#111814] rounded-full h-2 overflow-hidden border border-[#3b5445]/20">
              <div 
                className="bg-gradient-to-r from-primary/60 to-primary h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ 
                    width: `${company.performance}%`,
                    opacity: 1 - (idx * 0.1)
                }}
              ></div>
            </div>
          </div>
        ))}
        {agregadoEmpresa.length === 0 && (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-[#3b5445] text-3xl mb-2">business</span>
            <p className="text-[10px] text-[#9db9a8] italic uppercase font-bold">Sem dados no período</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPerformance;
