import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  MessagesSquare,
  Code2,
  LineChart,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/interview", label: "Mock Interview", icon: MessagesSquare },
  { to: "/code", label: "Code Editor", icon: Code2 },
  { to: "/performance", label: "Performance", icon: LineChart },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-paper)]">
      <aside className="w-64 shrink-0 bg-[var(--color-indigo-950)] text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
            <GraduationCap className="w-6 h-6 text-[var(--color-gold-400)]" strokeWidth={2} />
            <span className="font-display text-xl tracking-tight">Prepline</span>
          </div>

          <nav className="mt-6 px-3 flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 py-5 border-t border-white/10">
          <div className="px-2 mb-3">
            <p className="text-sm font-medium text-white">{user?.name || "Student"}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
