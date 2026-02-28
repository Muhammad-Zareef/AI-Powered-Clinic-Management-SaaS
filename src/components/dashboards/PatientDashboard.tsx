import { CalendarDays, FileText, Heart } from "lucide-react";
import { mockAppointments, mockPrescriptions } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function PatientDashboard() {
  const { user } = useAuth();
  const myAppts = mockAppointments.filter(a => a.patientId === "p1");
  const myRx = mockPrescriptions.filter(p => p.patientId === "p1");

  const stats = [
    { label: "Appointments", value: myAppts.length, icon: CalendarDays, color: "text-primary" },
    { label: "Prescriptions", value: myRx.length, icon: FileText, color: "text-info" },
    { label: "Health Score", value: "Good", icon: Heart, color: "text-success" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">My Dashboard</h1>
        <p className="page-subtitle">Welcome, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="font-semibold mb-4 font-heading">Recent Appointments</h3>
          <div className="space-y-3">
            {myAppts.slice(0, 3).map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-sm">{a.doctorName}</p>
                  <p className="text-xs text-muted-foreground">{a.date} · {a.time}</p>
                </div>
                <span className={`status-badge status-${a.status}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold mb-4 font-heading">Recent Prescriptions</h3>
          <div className="space-y-3">
            {myRx.map(rx => (
              <div key={rx.id} className="p-3 rounded-lg bg-secondary/50">
                <div className="flex justify-between mb-1">
                  <p className="font-medium text-sm">{rx.diagnosis}</p>
                  <span className="text-xs text-muted-foreground">{rx.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{rx.doctorName} · {rx.medicines.length} medicine(s)</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
