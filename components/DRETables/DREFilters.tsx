import React from 'react';
import { useDRE } from '../../context/DREContext';
import { useTheme } from '../../context/ThemeContext';

const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const DREFilters: React.FC = () => {
  const {
    anoSelecionado,
    mesSelecionado,
    regimeSelecionado,
    periodoInicio,
    periodoFim,
    setAnoSelecionado,
    setMesSelecionado,
    setRegimeSelecionado,
    setPeriodoInicio,
    setPeriodoFim,
    carregarDREMensal,
    carregarDREAcumulado
  } = useDRE();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleUploadMensal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) carregarDREMensal(file);
  };

  const handleUploadAcumulado = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) carregarDREAcumulado(file);
  };

  return (
    <div className={`${isDark ? 'bg-[#1c2720] border-[#3b5445]' : 'bg-white border-gray-200'} border rounded-xl p-6 space-y-6`}>
      <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold text-lg mb-4`}>Filtros DRE</h3>

      {/* Seletor de Ano */}
      <div>
        <label className={`text-sm font-medium ${isDark ? 'text-[#9db9a8]' : 'text-gray-600'} mb-2 block`}>Ano</label>
        <select
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(Number(e.target.value))}
          className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-[#111814] border-[#3b5445] text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary focus:border-primary`}
        >
          {[2024, 2025, 2026].map(ano => (
            <option key={ano} value={ano}>{ano}</option>
          ))}
        </select>
      </div>

      {/* Seletor de Mês */}
      <div>
        <label className={`text-sm font-medium ${isDark ? 'text-[#9db9a8]' : 'text-gray-600'} mb-2 block`}>Mês (para visualização mensal)</label>
        <select
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(Number(e.target.value))}
          className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-[#111814] border-[#3b5445] text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary focus:border-primary`}
        >
          {mesesNomes.map((nome, idx) => (
            <option key={idx} value={idx + 1}>{nome}</option>
          ))}
        </select>
      </div>

      {/* Seletor de Período */}
      <div>
        <label className={`text-sm font-medium ${isDark ? 'text-[#9db9a8]' : 'text-gray-600'} mb-2 block`}>Período (para acumulado)</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={`text-xs ${isDark ? 'text-[#9db9a8]' : 'text-gray-500'} mb-1 block`}>De</label>
            <select
              value={periodoInicio}
              onChange={(e) => setPeriodoInicio(Number(e.target.value))}
              className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-[#111814] border-[#3b5445] text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary focus:border-primary text-sm`}
            >
              {mesesNomes.map((nome, idx) => (
                <option key={idx} value={idx + 1}>{nome.slice(0, 3)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`text-xs ${isDark ? 'text-[#9db9a8]' : 'text-gray-500'} mb-1 block`}>Até</label>
            <select
              value={periodoFim}
              onChange={(e) => setPeriodoFim(Number(e.target.value))}
              className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-[#111814] border-[#3b5445] text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-primary focus:border-primary text-sm`}
            >
              {mesesNomes.map((nome, idx) => (
                <option key={idx} value={idx + 1}>{nome.slice(0, 3)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Toggle Regime */}
      <div>
        <label className={`text-sm font-medium ${isDark ? 'text-[#9db9a8]' : 'text-gray-600'} mb-2 block`}>Regime</label>
        <div className="flex flex-col gap-2">
          {['caixa', 'competencia', 'ambos'].map((regime) => (
            <label key={regime} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="regime"
                value={regime}
                checked={regimeSelecionado === regime}
                onChange={(e) => setRegimeSelecionado(e.target.value as any)}
                className="mr-2 text-primary focus:ring-primary"
              />
              <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} capitalize`}>
                {regime === 'ambos' ? 'Comparativo' : `Regime de ${regime}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Botões de Upload */}
      <div className="space-y-3 pt-4 border-t border-border-dark">
        <div className="relative border border-dashed border-border-dark rounded-lg p-4 flex flex-col items-center justify-center bg-surface-dark/50 hover:bg-surface-dark transition-colors cursor-pointer group">
          <input type="file" onChange={handleUploadMensal} className="absolute inset-0 opacity-0 cursor-pointer" accept=".xlsx,.xls"/>
          <span className="material-symbols-outlined text-border-dark group-hover:text-primary mb-1 text-sm">upload_file</span>
          <p className="text-xs text-center text-text-muted group-hover:text-white transition-colors">DRE Mensal<br />(Projetado vs Real)</p>
        </div>

        <div className="relative border border-dashed border-border-dark rounded-lg p-4 flex flex-col items-center justify-center bg-surface-dark/50 hover:bg-surface-dark transition-colors cursor-pointer group">
          <input type="file" onChange={handleUploadAcumulado} className="absolute inset-0 opacity-0 cursor-pointer" accept=".xlsx,.xls"/>
          <span className="material-symbols-outlined text-border-dark group-hover:text-primary mb-1 text-sm">upload_file</span>
          <p className="text-xs text-center text-text-muted group-hover:text-white transition-colors">DRE Acumulado<br />(Timeline Mensal)</p>
        </div>
      </div>
    </div>
  );
};

export default DREFilters;
