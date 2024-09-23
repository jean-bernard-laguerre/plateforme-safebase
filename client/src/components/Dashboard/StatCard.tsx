import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Database, DatabaseBackup, History } from "lucide-react";
import React, { use, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { actions as historyAction } from "@/services/historyService";

// Enregistre les composants de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Définition des types pour les props du composant Card
interface CardProps {
  title: string;
  data: ChartData;
  icon?: React.ReactNode;
}

// Type pour les données du graphique
interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }>;
}

interface Overview {
  Total: number;
  backup_success: number;
  backup_fail: number;
  restore_success: number;
  restore_fail: number;
}

export const StatCards: React.FC = () => {

  const [overview, setOverview] = React.useState<Overview>();

  useEffect(() => {
    getOverview();
  }, []);

  const getOverview = async () => {
    const response = await historyAction.getOverview();
    if (response.success !== true) {
      console.log("erreur lors de la récupération des backups:", response);
      return;
    }
    setOverview(response.overview);
  };

  return (
    <>
      { overview && <>
        <Card
          icon={<DatabaseBackup />}
          title="Backups"
          data={createChartData([overview?.backup_success, overview?.backup_fail], ["Completed", "Failed"])}
          colSpan={4}
        />
        <Card
          icon={<History />}
          title="Restorations"
          data={createChartData([overview?.restore_success, overview?.restore_fail], ["Completed", "Failed"])}
          colSpan={4}
        />
        <Card
          icon={<Database />}
          title="Databases"
          data={createChartData([30, 70], ["Used", "Available"])}
          colSpan={4}
        />
      </>}
    </>
  );
};

const Card: React.FC<CardProps & { colSpan: number }> = ({
  icon,
  title,
  data,
  colSpan,
}) => {
  return (
    <div
      // className={` p-4 rounded border border-stone-200 shadow-md col-span-${colSpan}`}
      className="p-4 rounded border border-stone-200 shadow-md col-span-4"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <Pie data={data} />
    </div>
  );
};

// Fonction pour créer les données du graphique
const createChartData = (dataPoints: number[], labels: string[]): ChartData => {
  return {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: ["#e0d6fe", "#673aed"], // Couleurs pour les segments
        borderWidth: 1,
      },
    ],
  };
};
