import { Pie, PieChart, Tooltip , Cell, Legend, ResponsiveContainer } from 'recharts';

type Props = {
    palette : string[],
    pieData : {name : string, value: number}[],
    totalExpense : number,
};


export default function PieChartComponent({palette, pieData, totalExpense}: Props) {

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
                <tspan x={cx} dy="-10" fontSize="28" fontWeight="bold" fill={"var(--text-primary)"}>
                    ₹{totalExpense.toLocaleString()}
                </tspan>
                <tspan x={cx} dy="25" fontSize="14" fill={"var(--text-secondary)"}>
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
                            color: "var(--text-primary)",
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
