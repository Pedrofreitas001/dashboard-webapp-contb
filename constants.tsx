
import { KPIData, CashFlowData, WaterfallData, CompanyPerformance, ExpenseCategory } from './types';

export const KPIS: KPIData[] = [
  { label: 'Faturamento Líquido', value: 'R$ 1.250.400', trend: 12.5, icon: 'attach_money', iconColor: '#0ebe54' },
  { label: 'Margem de Contribuição', value: 'R$ 450.120', trend: 5.2, icon: 'pie_chart', iconColor: '#3b82f6' },
  { label: 'Resultado (R$)', value: 'R$ 120.850', trend: -2.1, icon: 'account_balance_wallet', iconColor: '#0ebe54' },
  { label: 'Margem %', value: '36.2%', trend: 1.8, icon: 'percent', iconColor: '#eab308' },
];

export const CASH_FLOW_DATA: CashFlowData[] = [
  { month: 'Jan', inflow: 600, outflow: 400 },
  { month: 'Fev', inflow: 750, outflow: 450 },
  { month: 'Mar', inflow: 500, outflow: 550 },
  { month: 'Abr', inflow: 850, outflow: 300 },
  { month: 'Mai', inflow: 900, outflow: 500 },
  { month: 'Jun', inflow: 950, outflow: 400 },
];

export const WATERFALL_DATA: WaterfallData[] = [
  { name: 'Receita', value: 1200 },
  { name: 'CMV', value: -400 },
  { name: 'Desp. Ops', value: -300 },
  { name: 'Impostos', value: -100 },
  { name: 'Resultado Líquido', value: 400, isTotal: true },
];

export const COMPANY_PERFORMANCE: CompanyPerformance[] = [
  { name: 'FinanceFlow Global', performance: 92 },
  { name: 'TechUnit Ltda', performance: 78 },
  { name: 'Marketing Branch', performance: 64 },
  { name: 'Logistics Hub', performance: 45 },
];

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { name: 'Pessoal', value: 650 * 0.35, percentage: 35, color: '#0ebe54' },
  { name: 'Marketing', value: 650 * 0.25, percentage: 25, color: '#3b82f6' },
  { name: 'Tecnologia', value: 650 * 0.20, percentage: 20, color: '#eab308' },
  { name: 'Operacional', value: 650 * 0.20, percentage: 20, color: '#ef4444' },
];

export const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
