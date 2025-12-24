
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-20 flex-shrink-0 px-8 flex items-center justify-between bg-background-dark/80 border-b border-border-dark backdrop-blur-md z-10">
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-bold text-white leading-tight">Relatório financeiro consolidado</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-text-muted">Visão Geral</span>
          <span className="h-1 w-1 rounded-full bg-text-muted"></span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs text-primary font-medium">Atualizado hoje às 09:00</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <input 
            className="bg-surface-dark border border-border-dark rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all" 
            placeholder="Buscar..." 
            type="text"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted text-[20px]">search</span>
        </div>
        <button className="relative p-2 text-text-muted hover:text-white transition-colors rounded-full hover:bg-surface-dark">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-background-dark"></span>
        </button>
        <div className="h-10 w-10 rounded-full bg-surface-dark border border-border-dark overflow-hidden cursor-pointer">
          <img 
            alt="Profile" 
            className="h-full w-full object-cover" 
            src="https://picsum.photos/seed/financeflow/40/40"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
