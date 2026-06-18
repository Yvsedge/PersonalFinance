import { Pie, PieChart, Tooltip , Cell, Legend, ResponsiveContainer } from 'recharts';

type Props = {
    palette : string[],
    pieData : {name : string, value: number}[],
    totalExpense : number,
    isDark : boolean
};


export default function PieChartComponent({palette, pieData, totalExpense, isDark}: Props) {

    const subTextColor = isDark ? "#9CA6B4" : "#4B5563";
    const totalTextColor = isDark ? "#D8DFEE" : "#111827";

    return (
        <ResponsiveContainer width="100%" height={350}>
        <PieChart>
            <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={90}
            outerRadius={140}
            labelLine={false} 
            label={({ cx, cy }) => (
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                <tspan x={cx} dy="-10" fontSize="28" fontWeight="bold" fill={totalTextColor}>
                    ₹{totalExpense.toLocaleString()}
                </tspan>
                <tspan x={cx} dy="25" fontSize="14" fill={subTextColor}>
                    Expenses
                </tspan>
                </text>
            )}
            >
            {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={palette[index]} />
            ))}
            </Pie>
            <Tooltip />
            <Legend
                content={({ payload }) => (
                    <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.5rem",
                    marginTop: "1rem",
                    flexWrap: "wrap",
                    }}>
                    {payload?.map((entry) => (
                        <div key={entry.value} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        }}>
                        <div style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: entry.color,
                            flexShrink: 0,
                        }} />
                        <span style={{
                            fontSize: "13px",
                            color: isDark ? "#9CA6B4" : "#4B5563",
                        }}>
                            {entry.value}
                        </span>
                        </div>
                    ))}
                    </div>
                )}
                />
        </PieChart>
        </ResponsiveContainer>
    );
}
