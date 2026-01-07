import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsCard() {
  const data = [
    { name: "Yan", amount: 6500000 },
    { name: "Fev", amount: 12456189 },
    { name: "Mar", amount: 5400000 },
    { name: "Apr", amount: 7600000 },
    { name: "May", amount: 8200000 },
    { name: "Iyn", amount: 7900000 },
    { name: "Iyl", amount: 8600000 },
    { name: "Avg", amount: 6200000 },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Top section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Umumiy daromad</h2>

        <div className="relative">
          <select className="border border-gray-300 px-3 py-1 rounded-lg text-gray-700 cursor-pointer">
            <option>Haftalik</option>
            <option>Oylik</option>
            <option>Yillik</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="#eee" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => `${value.toLocaleString()} UZS`}
              labelFormatter={(label) => `${label}, 2025`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
              }}
            />
            <Bar dataKey="amount" fill="#1A73E8" barSize={32} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom label */}
      <p className="text-center mt-3 text-sm text-gray-500">Oylar</p>
    </div>
  );
}
