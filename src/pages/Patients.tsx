import { useState } from "react";
import { mockPatients } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Search, Plus, Edit, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Patients() {
  const { user } = useAuth();
  const [patients, setPatients] = useState(mockPatients);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", gender: "Male", contact: "", email: "", bloodGroup: "", address: "" });

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.contact.includes(search)
  );

  const handleSave = () => {
    if (selectedPatient) {
      setPatients(patients.map(p => p.id === selectedPatient.id ? { ...p, ...form, age: Number(form.age) } : p));
    } else {
      setPatients([...patients, { ...form, id: `p${Date.now()}`, age: Number(form.age), createdBy: user?.id }]);
    }
    setShowForm(false);
    setSelectedPatient(null);
    setForm({ name: "", age: "", gender: "Male", contact: "", email: "", bloodGroup: "", address: "" });
  };

  const openEdit = (p) => {
    setSelectedPatient(p);
    setForm({ name: p.name, age: String(p.age), gender: p.gender, contact: p.contact, email: p.email, bloodGroup: p.bloodGroup || "", address: p.address || "" });
    setShowForm(true);
  };

  const canEdit = user?.role === "admin" || user?.role === "receptionist";

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">Manage patient records</p>
        </div>
        {canEdit && (
          <Button onClick={() => { setSelectedPatient(null); setForm({ name: "", age: "", gender: "Male", contact: "", email: "", bloodGroup: "", address: "" }); setShowForm(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Add Patient
          </Button>
        )}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search patients..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="stat-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Age</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Gender</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Blood</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{p.name[0]}</div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{p.age}</td>
                <td className="py-3 px-4">{p.gender}</td>
                <td className="py-3 px-4 hidden sm:table-cell">{p.contact}</td>
                <td className="py-3 px-4 hidden md:table-cell">{p.bloodGroup}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setViewPatient(p)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"><Eye className="w-4 h-4" /></button>
                    {canEdit && <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"><Edit className="w-4 h-4" /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No patients found.</p>}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPatient ? "Edit Patient" : "Add New Patient"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5" /></div>
              <div><Label>Age</Label><Input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className="mt-1.5" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Gender</Label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div><Label>Blood Group</Label><Input value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })} className="mt-1.5" /></div>
            </div>
            <div><Label>Contact</Label><Input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} className="mt-1.5" /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1.5" /></div>
            <div><Label>Address</Label><Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="mt-1.5" /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={!form.name || !form.age}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewPatient} onOpenChange={() => setViewPatient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Profile</DialogTitle>
          </DialogHeader>
          {viewPatient && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">{viewPatient.name[0]}</div>
                <div>
                  <h3 className="text-lg font-semibold">{viewPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">{viewPatient.gender}, {viewPatient.age} years</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Contact:</span><p className="font-medium">{viewPatient.contact}</p></div>
                <div><span className="text-muted-foreground">Email:</span><p className="font-medium">{viewPatient.email}</p></div>
                <div><span className="text-muted-foreground">Blood Group:</span><p className="font-medium">{viewPatient.bloodGroup}</p></div>
                <div><span className="text-muted-foreground">Address:</span><p className="font-medium">{viewPatient.address}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
