// Mock data for the clinic management system

export const mockUsers = [
  { id: "1", name: "Dr. Admin", email: "admin@clinic.com", password: "admin123", role: "admin", avatar: "A" },
  { id: "2", name: "Dr. Sarah Ahmed", email: "doctor@clinic.com", password: "doctor123", role: "doctor", specialization: "General Physician", avatar: "S" },
  { id: "3", name: "Dr. Usman Ali", email: "doctor2@clinic.com", password: "doctor123", role: "doctor", specialization: "Cardiologist", avatar: "U" },
  { id: "4", name: "Fatima Khan", email: "reception@clinic.com", password: "reception123", role: "receptionist", avatar: "F" },
  { id: "5", name: "Ali Raza", email: "patient@clinic.com", password: "patient123", role: "patient", avatar: "A" },
  { id: "6", name: "Ayesha Siddiqui", email: "patient2@clinic.com", password: "patient123", role: "patient", avatar: "Y" },
];

export const mockPatients = [
  { id: "p1", name: "Ali Raza", age: 35, gender: "Male", contact: "0301-1234567", email: "ali@email.com", createdBy: "4", bloodGroup: "A+", address: "Lahore, Pakistan" },
  { id: "p2", name: "Ayesha Siddiqui", age: 28, gender: "Female", contact: "0302-7654321", email: "ayesha@email.com", createdBy: "4", bloodGroup: "B+", address: "Karachi, Pakistan" },
  { id: "p3", name: "Hassan Mahmood", age: 45, gender: "Male", contact: "0303-9876543", email: "hassan@email.com", createdBy: "4", bloodGroup: "O+", address: "Islamabad, Pakistan" },
  { id: "p4", name: "Zainab Noor", age: 22, gender: "Female", contact: "0304-1122334", email: "zainab@email.com", createdBy: "4", bloodGroup: "AB-", address: "Faisalabad, Pakistan" },
  { id: "p5", name: "Bilal Khan", age: 50, gender: "Male", contact: "0305-5566778", email: "bilal@email.com", createdBy: "4", bloodGroup: "O-", address: "Rawalpindi, Pakistan" },
];

export const mockAppointments = [
  { id: "a1", patientId: "p1", patientName: "Ali Raza", doctorId: "2", doctorName: "Dr. Sarah Ahmed", date: "2026-02-28", time: "10:00 AM", status: "confirmed", reason: "General Checkup" },
  { id: "a2", patientId: "p2", patientName: "Ayesha Siddiqui", doctorId: "2", doctorName: "Dr. Sarah Ahmed", date: "2026-02-28", time: "11:00 AM", status: "pending", reason: "Fever & Headache" },
  { id: "a3", patientId: "p3", patientName: "Hassan Mahmood", doctorId: "3", doctorName: "Dr. Usman Ali", date: "2026-02-28", time: "02:00 PM", status: "completed", reason: "Chest Pain" },
  { id: "a4", patientId: "p4", patientName: "Zainab Noor", doctorId: "2", doctorName: "Dr. Sarah Ahmed", date: "2026-03-01", time: "09:30 AM", status: "pending", reason: "Skin Allergy" },
  { id: "a5", patientId: "p5", patientName: "Bilal Khan", doctorId: "3", doctorName: "Dr. Usman Ali", date: "2026-03-01", time: "03:00 PM", status: "cancelled", reason: "Follow-up" },
  { id: "a6", patientId: "p1", patientName: "Ali Raza", doctorId: "3", doctorName: "Dr. Usman Ali", date: "2026-02-27", time: "10:00 AM", status: "completed", reason: "Heart Checkup" },
];

export const mockPrescriptions = [
  {
    id: "rx1", patientId: "p1", patientName: "Ali Raza", doctorId: "2", doctorName: "Dr. Sarah Ahmed",
    date: "2026-02-27",
    medicines: [
      { name: "Paracetamol", dosage: "500mg", frequency: "3 times/day", duration: "5 days" },
      { name: "Amoxicillin", dosage: "250mg", frequency: "2 times/day", duration: "7 days" },
    ],
    diagnosis: "Viral Fever",
    instructions: "Rest well, drink plenty of fluids. Avoid cold food.",
  },
  {
    id: "rx2", patientId: "p3", patientName: "Hassan Mahmood", doctorId: "3", doctorName: "Dr. Usman Ali",
    date: "2026-02-28",
    medicines: [
      { name: "Aspirin", dosage: "75mg", frequency: "Once daily", duration: "30 days" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at night", duration: "30 days" },
    ],
    diagnosis: "Mild Angina",
    instructions: "Avoid fatty foods. Regular walking recommended. Follow-up in 2 weeks.",
  },
  {
    id: "rx3", patientId: "p2", patientName: "Ayesha Siddiqui", doctorId: "2", doctorName: "Dr. Sarah Ahmed",
    date: "2026-02-26",
    medicines: [
      { name: "Cetirizine", dosage: "10mg", frequency: "Once daily", duration: "10 days" },
    ],
    diagnosis: "Seasonal Allergy",
    instructions: "Avoid dust exposure. Use mask if needed.",
  },
];

export const mockDiagnosisLogs = [
  { id: "d1", patientId: "p1", symptoms: "Fever, body ache, sore throat", aiResponse: { conditions: ["Viral Fever", "Influenza", "COVID-19"], riskLevel: "Low", suggestedTests: ["CBC", "COVID Rapid Test"] }, date: "2026-02-27" },
  { id: "d2", patientId: "p3", symptoms: "Chest pain, shortness of breath", aiResponse: { conditions: ["Angina", "GERD", "Costochondritis"], riskLevel: "High", suggestedTests: ["ECG", "Cardiac Enzymes", "Chest X-Ray"] }, date: "2026-02-28" },
];

export const analyticsData = {
  totalPatients: 156,
  totalDoctors: 8,
  monthlyAppointments: 342,
  revenue: 485000,
  commonDiagnosis: [
    { name: "Viral Fever", count: 45 },
    { name: "Hypertension", count: 38 },
    { name: "Diabetes", count: 32 },
    { name: "Allergies", count: 28 },
    { name: "Back Pain", count: 22 },
  ],
  monthlyTrend: [
    { month: "Sep", appointments: 220, patients: 85 },
    { month: "Oct", appointments: 265, patients: 102 },
    { month: "Nov", appointments: 290, patients: 118 },
    { month: "Dec", appointments: 310, patients: 130 },
    { month: "Jan", appointments: 325, patients: 145 },
    { month: "Feb", appointments: 342, patients: 156 },
  ],
  appointmentStatus: [
    { name: "Completed", value: 180, fill: "hsl(152, 60%, 42%)" },
    { name: "Confirmed", value: 85, fill: "hsl(210, 90%, 55%)" },
    { name: "Pending", value: 52, fill: "hsl(38, 92%, 50%)" },
    { name: "Cancelled", value: 25, fill: "hsl(0, 72%, 51%)" },
  ],
};
