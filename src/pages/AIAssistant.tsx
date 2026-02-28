import { useState } from "react";
import { Brain, Send, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockAIResponse = (symptoms, age, gender) => {
  const responses = {
    fever: { conditions: ["Viral Fever", "Influenza", "Dengue Fever"], riskLevel: "Medium", suggestedTests: ["CBC", "Dengue NS1", "Malaria Parasite"], recommendations: "Rest, hydration, paracetamol for fever management. Monitor temperature every 4 hours." },
    headache: { conditions: ["Tension Headache", "Migraine", "Sinusitis"], riskLevel: "Low", suggestedTests: ["Blood Pressure Check", "Eye Examination"], recommendations: "Adequate sleep, stress management, avoid screen time." },
    chest: { conditions: ["Angina", "GERD", "Costochondritis", "Anxiety"], riskLevel: "High", suggestedTests: ["ECG", "Cardiac Enzymes", "Chest X-Ray", "Echocardiography"], recommendations: "Immediate cardiac evaluation recommended. Avoid strenuous activity." },
  };
  const key = Object.keys(responses).find(k => symptoms.toLowerCase().includes(k));
  return key ? responses[key] : {
    conditions: ["Needs further evaluation", "Clinical examination recommended"],
    riskLevel: "Medium",
    suggestedTests: ["CBC", "Urinalysis", "Basic Metabolic Panel"],
    recommendations: "Please consult with the doctor for a detailed examination based on the symptoms described.",
  };
};

export default function AIAssistant() {
  const [form, setForm] = useState({ symptoms: "", age: "", gender: "Male", history: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult(mockAIResponse(form.symptoms, form.age, form.gender));
      setLoading(false);
    }, 1500);
  };

  const riskColors = { Low: "text-success", Medium: "text-warning", High: "text-destructive" };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <Brain className="w-7 h-7 text-primary" /> AI Smart Diagnosis
        </h1>
        <p className="page-subtitle">Enter patient symptoms for AI-powered diagnosis assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold mb-4 font-heading">Symptom Input</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Symptoms *</Label>
              <textarea value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })}
                placeholder="e.g. Fever, headache, body ache for 3 days..."
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Age *</Label><Input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className="mt-1.5" required /></div>
              <div>
                <Label>Gender</Label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Medical History</Label>
              <textarea value={form.history} onChange={e => setForm({ ...form, history: e.target.value })}
                placeholder="Any existing conditions, allergies, medications..."
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[60px]" />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <><span className="animate-spin mr-2">⟳</span> Analyzing...</> : <><Send className="w-4 h-4 mr-2" /> Analyze Symptoms</>}
            </Button>
          </form>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold mb-4 font-heading">AI Analysis Result</h3>
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Brain className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Enter symptoms and click analyze to get AI-powered suggestions</p>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3" />
              <p className="text-sm text-muted-foreground">AI is analyzing symptoms...</p>
            </div>
          )}
          {result && !loading && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`w-5 h-5 ${riskColors[result.riskLevel]}`} />
                  <span className={`font-semibold ${riskColors[result.riskLevel]}`}>Risk Level: {result.riskLevel}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Possible Conditions</h4>
                <div className="space-y-1.5">
                  {result.conditions.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-secondary/50">
                      <CheckCircle className="w-4 h-4 text-primary" />{c}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Suggested Tests</h4>
                <div className="flex flex-wrap gap-2">
                  {result.suggestedTests.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-info/10 text-info text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                <p className="text-sm text-muted-foreground bg-accent/50 rounded-lg p-3">{result.recommendations}</p>
              </div>
              <p className="text-xs text-muted-foreground italic">⚠️ This is AI-generated guidance. Always verify with clinical examination.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
