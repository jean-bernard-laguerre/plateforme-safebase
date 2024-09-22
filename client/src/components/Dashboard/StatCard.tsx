import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Database, DatabaseBackup, History } from "lucide-react";
import React from "react";
import { Pie } from "react-chartjs-2";

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

export const StatCards: React.FC = () => {
  return (
    <>
      <Card
        icon={<DatabaseBackup />}
        title="Backups"
        data={createChartData([60, 40], ["Success", "Failed"])}
        colSpan={4}
      />
      <Card
        icon={<History />}
        title="Restores"
        data={createChartData([80, 20], ["Completed", "Failed"])}
        colSpan={4}
      />
      <Card
        icon={<Database />}
        title="Databases"
        data={createChartData([30, 70], ["Used", "Available"])}
        colSpan={4}
      />
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
      className={` p-4 rounded border border-stone-200 shadow-md col-span-${colSpan}`}
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
