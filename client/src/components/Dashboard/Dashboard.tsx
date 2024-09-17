"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";

import SummaryView from "./Views/SummaryView";
import HistoryView from "./Views/HistoryView";
import DatabaseView from "./Views/DatabaseView";
import BackupView from "./Views/BackupView";

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
      case "history":
        return <HistoryView />;
      case "database":
        return <DatabaseView />;
      case "backup":
        return <BackupView />;
      default:
        return <SummaryView />;
    }
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
      <TopBar />
      {renderContent()}
    </div>
  );
};
