import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    formatter?: (value: any, name?: string) => string | [string, string];
}

/**
 * Componente de Tooltip Padronizado para todos os gráficos
 * Estilo consistente em todos os temas e páginas
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, formatter }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className={`p-3 rounded-xl shadow-xl border ${isDark ? 'bg-surface-dark border-border-dark' : 'bg-white border-gray-300'}`}>
            {label && (
                <p className={`text-xs font-semibold ${isDark ? 'text-text-muted' : 'text-gray-600'}`}>
                    {label}
                </p>
            )}
            {payload.map((entry: any, index: number) => {
                let displayValue = entry.value;
                let displayName = entry.name || entry.dataKey;

                if (formatter) {
                    const formatted = formatter(entry.value, entry.name);
                    if (Array.isArray(formatted)) {
                        displayValue = formatted[0];
                        displayName = formatted[1];
                    } else {
                        displayValue = formatted;
                    }
                }

                return (
                    <div key={index} className="mt-1">
                        <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {displayName}
                        </p>
                        <p className={`text-xs font-bold text-primary`}>
                            {displayValue}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default CustomTooltip;
