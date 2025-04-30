
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, children, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "hover:bg-secondary hover:text-secondary-foreground"
      )}
    >
      {children}
    </Link>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center gap-4 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">G</div>
            <span className="text-lg font-semibold tracking-tight">GoalGlide</span>
          </Link>
          <nav className="ml-auto flex gap-2">
            <NavItem href="/" active={location.pathname === "/"}>Dashboard</NavItem>
            <NavItem href="/create" active={location.pathname === "/create"}>Create Goal</NavItem>
            <NavItem href="/reviews" active={location.pathname === "/reviews"}>Reviews</NavItem>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6 px-4 md:px-6 animate-fade-in">
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col gap-2 px-4 md:px-6">
          <p className="text-xs text-center text-muted-foreground">
            © 2025 GoalGlide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
