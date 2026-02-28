import { Users, UserCheck, CalendarDays, DollarSign, TrendingUp } from "lucide-react";
import { analyticsData, mockAppointments } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Patients", value: analyticsData.totalPatients, icon: Users, color: "text-primary" },
    { label: "Total Doctors", value: analyticsData.totalDoctors, icon: UserCheck, color: "text-info" },
    { label: "Monthly Appointments", value: analyticsData.monthlyAppointments, icon: CalendarDays, color: "text-warning" },
    { label: "Revenue (PKR)", value: `${(analyticsData.revenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-success" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Overview of your clinic operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="stat-card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-accent flex items-center justify-center ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="stat-card lg:col-span-2">
          <h3 className="font-semibold mb-4 font-heading">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analyticsData.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="patients" fill="hsl(var(--info))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold mb-4 font-heading">Appointment Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={analyticsData.appointmentStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {analyticsData.appointmentStatus.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {analyticsData.appointmentStatus.map(s => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.fill }} />
                  <span>{s.name}</span>
                </div>
                <span className="font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="font-semibold mb-4 font-heading">Common Diagnoses</h3>
        <div className="space-y-3">
          {analyticsData.commonDiagnosis.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-5">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{d.name}</span>
                  <span className="text-sm text-muted-foreground">{d.count}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(d.count / 50) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
