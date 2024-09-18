"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";

import { Grid } from "./Grid";
import BackupView from "./Views/BackupView";
import DatabaseView from "./Views/DatabaseView";
import HistoryView from "./Views/HistoryView";
import SummaryView from "./Views/SummaryView";

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
      <Grid />
      {renderContent()}
    </div>
  );
};
