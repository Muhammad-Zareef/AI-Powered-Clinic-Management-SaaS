import { useState } from "react";
import { mockAppointments, mockPatients, mockUsers } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patientId: "", doctorId: "", date: "", time: "", reason: "" });

  const canManage = user?.role === "admin" || user?.role === "receptionist";
  const doctors = mockUsers.filter(u => u.role === "doctor");

  let filtered = appointments;
  if (user?.role === "doctor") filtered = filtered.filter(a => a.doctorId === user.id);
  if (user?.role === "patient") filtered = filtered.filter(a => a.patientId === "p1");
  if (search) filtered = filtered.filter(a => a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (id, status) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleAdd = () => {
    const patient = mockPatients.find(p => p.id === form.patientId);
    const doctor = doctors.find(d => d.id === form.doctorId);
    if (!patient || !doctor) return;
    setAppointments([...appointments, {
      id: `a${Date.now()}`, ...form,
      patientName: patient.name, doctorName: doctor.name, status: "pending"
    }]);
    setShowForm(false);
    setForm({ patientId: "", doctorId: "", date: "", time: "", reason: "" });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Manage clinic appointments</p>
        </div>
        {canManage && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" /> Book Appointment
          </Button>
        )}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search appointments..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid gap-3">
        {filtered.map(a => (
          <div key={a.id} className="stat-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{a.patientName[0]}</div>
              <div>
                <p className="font-medium">{a.patientName}</p>
                <p className="text-sm text-muted-foreground">{a.doctorName} · {a.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-sm">
                <p className="font-medium">{a.date}</p>
                <p className="text-muted-foreground">{a.time}</p>
              </div>
              <span className={`status-badge status-${a.status}`}>{a.status}</span>
              {(canManage || user?.role === "doctor") && a.status !== "completed" && a.status !== "cancelled" && (
                <div className="flex gap-1">
                  {a.status === "pending" && <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "confirmed")}>Confirm</Button>}
                  {a.status === "confirmed" && user?.role === "doctor" && <Button size="sm" onClick={() => updateStatus(a.id, "completed")}>Complete</Button>}
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => updateStatus(a.id, "cancelled")}>Cancel</Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No appointments found.</p>}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Book New Appointment</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Patient</Label>
              <select value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select patient</option>
                {mockPatients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <Label>Doctor</Label>
              <select value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select doctor</option>
                {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Time</Label><Input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="mt-1.5" /></div>
            </div>
            <div><Label>Reason</Label><Input value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} className="mt-1.5" /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!form.patientId || !form.doctorId || !form.date}>Book</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
