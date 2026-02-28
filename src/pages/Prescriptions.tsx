import { useState } from "react";
import { mockPrescriptions, mockPatients, mockUsers } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Plus, FileText, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Prescriptions() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [viewRx, setViewRx] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    patientId: "", diagnosis: "", instructions: "",
    medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
  });

  const canWrite = user?.role === "doctor";

  let filtered = prescriptions;
  if (user?.role === "doctor") filtered = filtered.filter(p => p.doctorId === user.id);
  if (user?.role === "patient") filtered = filtered.filter(p => p.patientId === "p1");

  const addMedicine = () => setForm({ ...form, medicines: [...form.medicines, { name: "", dosage: "", frequency: "", duration: "" }] });
  const updateMedicine = (i, field, value) => {
    const meds = [...form.medicines];
    meds[i] = { ...meds[i], [field]: value };
    setForm({ ...form, medicines: meds });
  };
  const removeMedicine = (i) => setForm({ ...form, medicines: form.medicines.filter((_, idx) => idx !== i) });

  const handleSave = () => {
    const patient = mockPatients.find(p => p.id === form.patientId);
    if (!patient) return;
    setPrescriptions([...prescriptions, {
      id: `rx${Date.now()}`, ...form,
      patientName: patient.name, doctorId: user.id, doctorName: user.name,
      date: new Date().toISOString().split("T")[0],
    }]);
    setShowForm(false);
    setForm({ patientId: "", diagnosis: "", instructions: "", medicines: [{ name: "", dosage: "", frequency: "", duration: "" }] });
  };

  const downloadPDF = (rx) => {
    const content = `
PRESCRIPTION
============
Patient: ${rx.patientName}
Doctor: ${rx.doctorName}
Date: ${rx.date}
Diagnosis: ${rx.diagnosis}

Medicines:
${rx.medicines.map((m, i) => `${i + 1}. ${m.name} - ${m.dosage} - ${m.frequency} - ${m.duration}`).join("\n")}

Instructions: ${rx.instructions}
    `.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prescription-${rx.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">Prescriptions</h1>
          <p className="page-subtitle">Manage patient prescriptions</p>
        </div>
        {canWrite && <Button onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-2" /> New Prescription</Button>}
      </div>

      <div className="grid gap-3">
        {filtered.map(rx => (
          <div key={rx.id} className="stat-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center text-info"><FileText className="w-5 h-5" /></div>
              <div>
                <p className="font-medium">{rx.patientName}</p>
                <p className="text-sm text-muted-foreground">{rx.diagnosis} · {rx.doctorName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{rx.date}</span>
              <span className="text-sm font-medium">{rx.medicines.length} medicine(s)</span>
              <Button size="sm" variant="outline" onClick={() => setViewRx(rx)}><Eye className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" onClick={() => downloadPDF(rx)}><Download className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No prescriptions found.</p>}
      </div>

      {/* View */}
      <Dialog open={!!viewRx} onOpenChange={() => setViewRx(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Prescription Details</DialogTitle></DialogHeader>
          {viewRx && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Patient:</span><p className="font-medium">{viewRx.patientName}</p></div>
                <div><span className="text-muted-foreground">Doctor:</span><p className="font-medium">{viewRx.doctorName}</p></div>
                <div><span className="text-muted-foreground">Date:</span><p className="font-medium">{viewRx.date}</p></div>
                <div><span className="text-muted-foreground">Diagnosis:</span><p className="font-medium">{viewRx.diagnosis}</p></div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Medicines</h4>
                <div className="space-y-2">
                  {viewRx.medicines.map((m, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary/50 text-sm">
                      <p className="font-medium">{m.name}</p>
                      <p className="text-muted-foreground">{m.dosage} · {m.frequency} · {m.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div><span className="text-muted-foreground text-sm">Instructions:</span><p className="text-sm mt-1">{viewRx.instructions}</p></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>New Prescription</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Patient</Label>
              <select value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Select patient</option>
                {mockPatients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div><Label>Diagnosis</Label><Input value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} className="mt-1.5" /></div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Medicines</Label>
                <Button size="sm" variant="outline" onClick={addMedicine}>+ Add</Button>
              </div>
              <div className="space-y-3">
                {form.medicines.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg border space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-muted-foreground">Medicine {i + 1}</span>
                      {form.medicines.length > 1 && <button onClick={() => removeMedicine(i)} className="text-xs text-destructive">Remove</button>}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Name" value={m.name} onChange={e => updateMedicine(i, "name", e.target.value)} />
                      <Input placeholder="Dosage" value={m.dosage} onChange={e => updateMedicine(i, "dosage", e.target.value)} />
                      <Input placeholder="Frequency" value={m.frequency} onChange={e => updateMedicine(i, "frequency", e.target.value)} />
                      <Input placeholder="Duration" value={m.duration} onChange={e => updateMedicine(i, "duration", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div><Label>Instructions</Label><textarea value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]" /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={!form.patientId || !form.diagnosis}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
