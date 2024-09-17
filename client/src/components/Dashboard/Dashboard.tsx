"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";

const DashboardView = () => <h1>Dashboard Component</h1>;
const ResearchView = () => <h1>Research Component</h1>;
const DatabaseView = () => <h1>Database Component</h1>;
const BackupView = () => <h1>Backup Component</h1>;

export const Dashboard = () => {
  const pathname = usePathname();
  const [currentView, setCurrentView] = useState("dashboard");
  useEffect(() => {
    //On met à jour la vue actuelle en fonction du pathname
    const view = pathname.split("/")[1] || "dashboard";
    setCurrentView(view);
  }, [pathname]);

  const renderContent = () => {
    switch (currentView) {
      case "research":
        return <ResearchView />; // Assure-toi d'importer ou de définir ces composants
      case "database":
        return <DatabaseView />;
      case "backup":
        return <BackupView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
      <TopBar />
      {renderContent()}
    </div>
  );
};
