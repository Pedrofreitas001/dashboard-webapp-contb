# Documentação do Projeto - FinanceFlow Dashboard

## Índice de Documentos

### 📋 Planejamento e Requisitos
- **[TESTES_DESPESAS.md](./TESTES_DESPESAS.md)** - Plano de testes para a página de Análise de Despesas
- **[DESENVOLVIMENTO_DESPESAS.md](./DESENVOLVIMENTO_DESPESAS.md)** - Cronograma e progresso do desenvolvimento da página de despesas

### 📊 Arquitetura e Inventário
- **[INVENTARIO_ARQUIVOS.md](./INVENTARIO_ARQUIVOS.md)** - Inventário completo de arquivos Excel de exemplo e estruturas de dados
- **[RELATORIO_MERGE_DRE.md](./RELATORIO_MERGE_DRE.md)** - Relatório de integração das 4 abas de DRE

### 📌 Visão Geral do Projeto
- **[../README.md](../README.md)** - Documentação principal do projeto

## Estrutura de Diretórios

```
dashboard-webapp-contb/
├── docs/                          # Documentação do projeto
│   ├── INDEX.md                  # Este arquivo
│   ├── TESTES_DESPESAS.md
│   ├── DESENVOLVIMENTO_DESPESAS.md
│   ├── INVENTARIO_ARQUIVOS.md
│   └── RELATORIO_MERGE_DRE.md
├── dados/                         # Dados e scripts
│   ├── scripts/                  # Scripts Python de geração e análise
│   ├── excel_exemplos/           # Arquivos Excel de exemplo
│   ├── tabelas/                  # Documentação de estruturas de tabelas
│   └── textos/                   # Documentação adicional
├── components/                    # Componentes React
├── context/                       # Contextos React
└── utils/                         # Utilitários
```

## Scripts Python Disponíveis

Todos os scripts Python estão organizados em `dados/scripts/`:

### Scripts de Geração de Dados
- `criar_excels.py` - Cria arquivos Excel exemplo
- `criar_dados_exemplo.py` - Gera dados de exemplo
- `create_despesas_model.py` - Cria modelo de despesas

### Scripts de Análise
- `analyze_excel.py` - Analisa arquivos Excel
- `analyze_despesas.py` - Analisa estrutura de despesas
- `analyze_despesas2.py` - Análise avançada de despesas
- `analyze_dre.py` - Analisa estrutura DRE
- `analyze_dre2.py` - Análise avançada de DRE

## Arquivos Excel de Exemplo

Localizados em `dados/excel_exemplos/`:
- `Indicadores_Exemplo.xlsx` - Indicadores financeiros
- `Orcamento_Exemplo.xlsx` - Orçamento vs Realizado
- `analise_despesas_exemplo.xlsx` - Análise de Despesas (4 abas)
- `Dashboard_Financeiro_Exemplo.xlsx` - Dashboard Financeiro Completo

## Acesso Rápido

**Para desenvolvedores:**
- Veja [INVENTARIO_ARQUIVOS.md](./INVENTARIO_ARQUIVOS.md) para estrutura de dados
- Veja [../dados/tabelas/ESTRUTURA_TABELAS.md](../dados/tabelas/ESTRUTURA_TABELAS.md) para schemas SQL

**Para testers:**
- Veja [TESTES_DESPESAS.md](./TESTES_DESPESAS.md) para plano de testes

**Para project managers:**
- Veja [DESENVOLVIMENTO_DESPESAS.md](./DESENVOLVIMENTO_DESPESAS.md) para cronograma
