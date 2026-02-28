import { useState } from "react";
import { mockUsers } from "@/data/mockData";
import { Search, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Doctors() {
  const [search, setSearch] = useState("");
  const doctors = mockUsers.filter(u => u.role === "doctor");
  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Doctors</h1>
        <p className="page-subtitle">Manage clinic doctors</p>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search doctors..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(d => (
          <div key={d.id} className="stat-card flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {d.avatar || d.name[0]}
            </div>
            <div>
              <p className="font-semibold">{d.name}</p>
              <p className="text-sm text-muted-foreground">{d.specialization || "General"}</p>
              <p className="text-xs text-muted-foreground">{d.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
