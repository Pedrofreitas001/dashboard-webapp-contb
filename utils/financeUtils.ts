
export function limparValor(valor: any): number {
  if (valor === undefined || valor === null) return 0;
  if (typeof valor === 'number') return valor;
  
  let valorStr = String(valor)
    .replace(/R\$/g, "")
    .replace(/%/g, "")
    .replace(/\s/g, "");
  
  // Trata formato brasileiro 1.234,56 -> 1234.56
  if (valorStr.includes(',') && valorStr.includes('.')) {
    valorStr = valorStr.replace(/\./g, "").replace(/,/g, ".");
  } else if (valorStr.includes(',')) {
    valorStr = valorStr.replace(/,/g, ".");
  }
  
  return parseFloat(valorStr) || 0;
}

export const MAPA_MESES: Record<string, number> = {
  "JANEIRO": 1, "JAN": 1,
  "FEVEREIRO": 2, "FEV": 2,
  "MARÇO": 3, "MARCO": 3, "MAR": 3,
  "ABRIL": 4, "ABR": 4,
  "MAIO": 5, "MAI": 5,
  "JUNHO": 6, "JUN": 6,
  "JULHO": 7, "JUL": 7,
  "AGOSTO": 8, "AGO": 8,
  "SETEMBRO": 9, "SET": 9,
  "OUTUBRO": 10, "OUT": 10,
  "NOVEMBRO": 11, "NOV": 11,
  "DEZEMBRO": 12, "DEZ": 12
};

export function getMesNumero(mes: string): number {
  return MAPA_MESES[mes.toUpperCase().trim()] || 1;
}

export function formatBRL(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(valor);
}
