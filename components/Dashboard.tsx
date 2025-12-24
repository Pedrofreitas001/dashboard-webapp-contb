
import React from 'react';
import KPIGrid from './KPIGrid';
import DREWaterfall from './Charts/DREWaterfall';
import CashFlowChart from './Charts/CashFlowChart';
import ExpenseDonut from './Charts/ExpenseDonut';
import CompanyPerformance from './Charts/CompanyPerformance';
import ExecutiveDRE from './Charts/ExecutiveDRE';

const Dashboard: React.FC = () => {
  return (
    <main id="dashboard-content" className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background-dark">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 w-full">
        {/* Camada Superior: KPIs */}
        <KPIGrid />

        {/* Camada Central: Gráficos de Visão Geral */}
        <div id="pdf-section-middle" className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          <ExecutiveDRE />
          <CashFlowChart />
        </div>

        {/* DRE Waterfall: Ocupa largura total */}
        <div id="pdf-section-waterfall" className="w-full">
          <DREWaterfall />
        </div>

        {/* Camada Inferior: Detalhamento */}
        <div id="pdf-section-bottom" className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12 w-full">
          <ExpenseDonut />
          <CompanyPerformance />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
