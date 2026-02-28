import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  Activity, LayoutDashboard, Users, CalendarDays, FileText,
  Brain, LogOut, Menu, X, ChevronDown, User
} from "lucide-react";
import { NavLink } from "react-router-dom";

const roleMenus = {
  admin: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Doctors", path: "/doctors", icon: Users },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Appointments", path: "/appointments", icon: CalendarDays },
    { label: "Prescriptions", path: "/prescriptions", icon: FileText },
    { label: "AI Assistant", path: "/ai-assistant", icon: Brain },
  ],
  doctor: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Appointments", path: "/appointments", icon: CalendarDays },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Prescriptions", path: "/prescriptions", icon: FileText },
    { label: "AI Assistant", path: "/ai-assistant", icon: Brain },
  ],
  receptionist: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Appointments", path: "/appointments", icon: CalendarDays },
  ],
  patient: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Appointments", path: "/appointments", icon: CalendarDays },
    { label: "My Prescriptions", path: "/prescriptions", icon: FileText },
  ],
};

export default function AppLayout() {
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Activity className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  const menus = roleMenus[user.role] || [];

  return (
    <div className="flex min-h-screen">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-primary-foreground font-heading">MediCare AI</span>
          <button className="ml-auto lg:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menus.map(item => (
            <NavLink key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`
              }>
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button onClick={() => { logout(); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent w-full transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-card border-b flex items-center px-4 lg:px-6 gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {user.avatar || user.name[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
