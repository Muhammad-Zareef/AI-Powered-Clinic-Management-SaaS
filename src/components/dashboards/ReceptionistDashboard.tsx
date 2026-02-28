import { Users, CalendarDays, UserPlus, Clock } from "lucide-react";
import { mockPatients, mockAppointments } from "@/data/mockData";

export default function ReceptionistDashboard() {
  const todayAppts = mockAppointments.filter(a => a.date === "2026-02-28");

  const stats = [
    { label: "Total Patients", value: mockPatients.length, icon: Users, color: "text-primary" },
    { label: "Today's Appointments", value: todayAppts.length, icon: CalendarDays, color: "text-info" },
    { label: "New This Week", value: 3, icon: UserPlus, color: "text-success" },
    { label: "Pending Today", value: todayAppts.filter(a => a.status === "pending").length, icon: Clock, color: "text-warning" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Receptionist Dashboard</h1>
        <p className="page-subtitle">Manage daily clinic operations</p>
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

      <div className="stat-card">
        <h3 className="font-semibold mb-4 font-heading">Today's Appointments</h3>
        <div className="space-y-3">
          {todayAppts.map(a => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium text-sm">{a.patientName}</p>
                <p className="text-xs text-muted-foreground">{a.doctorName} · {a.reason}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{a.time}</p>
                <span className={`status-badge status-${a.status}`}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
