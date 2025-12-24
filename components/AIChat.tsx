
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useFinance } from '../context/FinanceContext';
import { formatBRL } from '../utils/financeUtils';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Olá! Sou seu Consultor Estratégico FinanceFlow. Analisei seus dados e estou pronto para discutir margens, identificar gargalos operacionais ou sugerir planos de expansão. O que analisamos agora?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { kpis, agregadoMensal, agregadoCategoria, filtros } = useFinance();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const generateContextPrompt = () => {
    const context = {
      empresa: filtros.empresa,
      periodo: filtros.meses.join(', '),
      indicadores: {
        faturamentoLiquido: formatBRL(kpis.faturamentoLiquido),
        margemContribuicao: formatBRL(kpis.margemContribuicao),
        margemPerc: `${kpis.margemContribuicaoPerc.toFixed(1)}%`,
        ebitda: formatBRL(kpis.resultado),
        margemLiquida: `${kpis.margemLiquida.toFixed(1)}%`
      },
      fluxoCaixaHistorico: agregadoMensal.map(m => `${m.month}: In R$${m.inflow} | Out R$${m.outflow}`),
      distribuicaoCustos: agregadoCategoria.map(c => `${c.name}: ${c.percentage}% (${formatBRL(c.value)})`)
    };

    return `Você é um CFO e Consultor de Estratégia de nível mundial. 
    DADOS ATUAIS: ${JSON.stringify(context)}
    
    SUA MISSÃO:
    1. Não apenas relate números, interprete-os. 
    2. Identifique tendências perigosas (ex: custos subindo mais que faturamento).
    3. Sugira 3 ações práticas baseadas nos dados se detectar anomalias.
    4. Use benchmarking mental: uma margem de contribuição abaixo de 30% ou margem líquida abaixo de 10% geralmente requer atenção em serviços/varejo.
    5. Seja executivo, direto e extremamente inteligente. 
    6. Se os dados forem insuficientes para um insight profundo, peça o contexto do setor da empresa.
    
    FORMATO: Use Markdown para negrito e listas. Mantenha as respostas focadas em INSIGHTS DE NEGÓCIO.`;
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Upgrade para o modelo Pro para melhor raciocínio
        contents: currentInput,
        config: {
          systemInstruction: generateContextPrompt(),
          temperature: 0.6,
          // Adicionando Thinking Budget para permitir que a IA "raciocine" antes de responder
          thinkingConfig: { thinkingBudget: 4000 } 
        }
      });

      if (!response.text) throw new Error("Sem resposta");

      const modelMsg: ChatMessage = {
        role: 'model',
        text: response.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error: any) {
      console.error("Erro Consultoria AI:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'Desculpe, meu motor de análise estratégica encontrou um problema. Podemos tentar novamente?',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button com Glow de Inteligência */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-tr from-primary to-emerald-400 rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <span className="material-symbols-outlined text-3xl group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">psychology</span>
        <span className="absolute -top-1 -right-1 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-white/10 border border-white/40"></span>
        </span>
      </button>

      {/* Sidebar Chat Panel */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-lg bg-[#111814] border-l border-border-dark z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) shadow-[0_0_50px_rgba(0,0,0,0.8)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full bg-gradient-to-b from-surface-dark/50 to-transparent">
          {/* Header Estratégico */}
          <div className="p-6 border-b border-border-dark flex justify-between items-center bg-[#1c2720]/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-primary text-3xl animate-pulse">insights</span>
              </div>
              <div>
                <h3 className="text-white font-black text-base tracking-tight">FinanceFlow Strategic AI</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Modelo Pro Ativo</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:bg-white/5 hover:text-white transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages Area com scroll suave */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[90%] rounded-2xl px-5 py-4 text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-[#1c2720] border border-border-dark text-[#e5e7eb] rounded-tl-none border-l-primary/40 border-l-2'
                }`}>
                  <div className="prose prose-invert prose-emerald max-w-none">
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx} className={line.trim() === '' ? 'h-2' : 'mb-2 last:mb-0'}>
                        {line.startsWith('- ') ? <span className="block pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary">{line.substring(2)}</span> : line}
                      </p>
                    ))}
                  </div>
                  <div className={`flex items-center gap-2 mt-3 opacity-40 text-[9px] font-bold uppercase tracking-tighter ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className="material-symbols-outlined text-[10px]">{msg.role === 'user' ? 'person' : 'auto_awesome'}</span>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-[#1c2720] border border-border-dark rounded-2xl rounded-tl-none p-5 flex flex-col gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Processando análise estratégica...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area Premium */}
          <div className="p-6 border-t border-border-dark bg-[#1c2720]/30 backdrop-blur-sm">
            <div className="relative group">
              <textarea 
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                placeholder="Ex: 'Quais os 3 maiores riscos no meu fluxo de caixa atual?'"
                className="w-full bg-[#111814] border border-border-dark rounded-2xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder:text-text-muted/30 shadow-inner"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 bottom-3 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary/80 disabled:opacity-20 transition-all shadow-lg active:scale-90"
              >
                <span className="material-symbols-outlined text-xl">bolt</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 opacity-50">
              <div className="h-px bg-border-dark flex-1"></div>
              <p className="text-[8px] text-text-muted uppercase font-black tracking-widest whitespace-nowrap">
                Powered by Gemini 3 Pro Reasoning
              </p>
              <div className="h-px bg-border-dark flex-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 animate-in fade-in duration-500"
        />
      )}
    </>
  );
};

export default AIChat;
