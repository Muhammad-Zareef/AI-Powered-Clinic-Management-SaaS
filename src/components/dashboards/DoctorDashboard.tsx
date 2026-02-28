import { CalendarDays, FileText, Users, Clock } from "lucide-react";
import { mockAppointments, mockPrescriptions } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const todayAppts = mockAppointments.filter(a => a.doctorId === user?.id && a.date === "2026-02-28");
  const myPrescriptions = mockPrescriptions.filter(p => p.doctorId === user?.id);

  const stats = [
    { label: "Today's Appointments", value: todayAppts.length, icon: CalendarDays, color: "text-primary" },
    { label: "Total Prescriptions", value: myPrescriptions.length, icon: FileText, color: "text-info" },
    { label: "Patients Seen Today", value: todayAppts.filter(a => a.status === "completed").length, icon: Users, color: "text-success" },
    { label: "Pending", value: todayAppts.filter(a => a.status === "pending").length, icon: Clock, color: "text-warning" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Doctor Dashboard</h1>
        <p className="page-subtitle">Welcome back, {user?.name}</p>
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
        <h3 className="font-semibold mb-4 font-heading">Today's Schedule</h3>
        {todayAppts.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4">No appointments scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {todayAppts.map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {a.patientName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{a.patientName}</p>
                    <p className="text-xs text-muted-foreground">{a.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{a.time}</p>
                  <span className={`status-badge status-${a.status}`}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
