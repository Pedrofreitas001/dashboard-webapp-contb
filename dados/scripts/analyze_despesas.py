import pandas as pd

file_path = 'dados/excel_exemplos/analise_despesas_exemplo.xlsx'
df = pd.read_excel(file_path, sheet_name=0)

print('=== ESTRUTURA DO ARQUIVO ===')
print(f'Nome: analise_despesas_exemplo.xlsx')
print(f'Linhas: {df.shape[0]}, Colunas: {df.shape[1]}')
print(f'Colunas: {list(df.columns)}')
print()
print('=== PRIMEIRAS LINHAS ===')
print(df.head(10))
print()
print('=== DADOS ÚNICOS ===')
for col in ['Empresa', 'Mês', 'Categoria']:
    if col in df.columns:
        unique_vals = sorted(df[col].unique().tolist())
        print(f'{col}: {unique_vals}')
