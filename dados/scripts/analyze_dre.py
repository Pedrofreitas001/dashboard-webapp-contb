import openpyxl
import os

# Verifica qual arquivo DRE existe
excel_files = [f for f in os.listdir('dados/excel_exemplos') if 'dre' in f.lower() or 'dro' in f.lower()]
print("Arquivos DRE encontrados:")
for f in excel_files:
    print(f"  - {f}")

# Analisar o primeiro
if excel_files:
    file_path = f'dados/excel_exemplos/{excel_files[0]}'
    print(f"\nAnalisando: {excel_files[0]}")
    
    wb = openpyxl.load_workbook(file_path)
    print(f"Abas: {wb.sheetnames}")
