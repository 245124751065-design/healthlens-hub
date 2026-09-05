import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  GitCompareArrows,
  History,
  ShieldAlert,
  BadgeCheck,
  Settings,
  LogOut,
  Bell,
  Search,
  Upload,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/reports", label: "Medical Reports", icon: FileText },
  { to: "/timeline", label: "Timeline", icon: History },
  { to: "/comparison", label: "Report Comparison", icon: GitCompareArrows },
  { to: "/alerts", label: "Alerts & Conflicts", icon: ShieldAlert },
  { to: "/verification", label: "Verification Center", icon: BadgeCheck },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/patients": "Patients",
  "/reports": "Medical Reports",
  "/timeline": "Patient Timeline",
  "/comparison": "Report Comparison",
  "/alerts": "Alerts & Conflicts",
  "/verification": "Verification Center",
  "/settings": "Settings",
  "/upload": "Upload Medical Report",
};

function pageTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/patients/")) return "Patient Profile";
  if (pathname.startsWith("/reports/")) return "Report Analysis";
  return "MedLens";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-display truncate text-[15px] font-extrabold tracking-tight text-navy">
              MEDLENS
            </p>
            <p className="truncate text-[11px] text-muted-foreground">AI Clinical Intelligence</p>
          </div>
          <button
            className="ml-auto rounded-md p-1 text-muted-foreground lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {nav.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-navy-soft hover:bg-surface-2",
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg px-2 py-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              NR
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-navy">Dr. Nandini Rao</p>
              <p className="truncate text-[11px] text-muted-foreground">Internal Medicine</p>
            </div>
          </div>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-soft transition-colors hover:bg-surface-2"
          >
            <Settings className="h-[18px] w-[18px]" /> Settings
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-soft transition-colors hover:bg-surface-2">
            <LogOut className="h-[18px] w-[18px]" /> Logout
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                className="rounded-lg border border-border p-2 text-navy-soft lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="h-4 w-4" />
              </button>
              <h1 className="truncate text-base font-bold text-navy sm:text-lg">
                {pageTitle(pathname)}
              </h1>
              <div className="relative hidden min-w-0 flex-1 md:block lg:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  className="h-10 w-full rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:bg-surface"
                  placeholder="Search patients, reports, tests..."
                />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                className="relative rounded-lg border border-border p-2 text-navy-soft transition-colors hover:bg-surface-2"
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
              </button>
              <div className="hidden h-9 w-9 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground sm:grid">
                NR
              </div>
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:px-4"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload Report</span>
                <span className="sm:hidden">Upload</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
