import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";
import ReceptionistDashboard from "@/components/dashboards/ReceptionistDashboard";
import PatientDashboard from "@/components/dashboards/PatientDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case "admin": return <AdminDashboard />;
    case "doctor": return <DoctorDashboard />;
    case "receptionist": return <ReceptionistDashboard />;
    case "patient": return <PatientDashboard />;
    default: return <div>Unknown role</div>;
  }
}
