import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

type props = {
    data : {date : string, total : number}[],
}

export default function LineChartComponent({data} : props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
        <AreaChart

        data={data}
        margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="var(--text-primary)" />
        <YAxis width="auto" stroke="var(--text-primary)" tickFormatter={(value) => `₹${(value / 100).toFixed(0)}k`}/>
        <Tooltip
            cursor={{
                stroke: 'var(--border)',
            }}
            contentStyle={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
            }}
        />
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
                    }}>
                        {entry.value}
                    </span>
                    </div>
                ))}
                </div>
            )}
        />
        <Area
            type="monotone"
            dataKey="total"
            stroke="var(--expense)"
            fill="var(--expense)"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8, stroke: 'var(--surface)'}}
        />
        </AreaChart>
    </ResponsiveContainer>
  )
}
