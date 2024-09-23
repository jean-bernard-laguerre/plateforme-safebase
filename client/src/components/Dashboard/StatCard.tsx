"use client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Database, DatabaseBackup, History } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { actions as connecActions } from "@/services/connectionService";

// Enregistre les composants de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Définition des types pour les props du composant Card
interface CardProps {
  title: string;
  data: ChartData;
  icon?: React.ReactNode;
}

interface CardPropsDb {
  title: string;
  data: number;
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

interface BarData {
  dataPoint: number;
}

interface DatabaseInterface {
  Id: number;
  Name: string;
  Db_name: string;
  Db_type: string;
  Host: string;
  Port: number;
}

// interface de databases contenant un array de Database
interface Databases {
  databases: DatabaseInterface[];
}

export const StatCards: React.FC = () => {
  const [databases, setDatabases] = useState<Databases | null>(null);
  const [nbDatabases, setNbDatabases] = useState<number>(0);

  async function getUserDatabase() {
    // get user databases
    const response = await connecActions.getUserConnections();
    console.log("response", response);
    if (response.success === false) {
      console.log("erreur lors de la récupération des connections:", response);
      return;
    } else if (response.connections.length > 0) {
      console.log("response.connections", response.connections);
      setDatabases({ databases: response.connections });
    } else {
      setDatabases(null);
    }
  }

  useEffect(() => {
    getUserDatabase();
  }, []);

  useEffect(() => {
    if (databases) {
      console.log("databases AAAAAAAAAA", databases.databases.length);
      setNbDatabases(databases.databases.length);
    }
  }, [databases]);

  return (
    <>
      <Card
        icon={<DatabaseBackup />}
        title="Backups"
        data={createChartData([60, 40], ["Success", "Failed"])}
      />
      <Card
        icon={<History />}
        title="Restores"
        data={createChartData([80, 20], ["Completed", "Failed"])}
      />
      <CardDb icon={<Database />} title="Databases" data={nbDatabases} />
    </>
  );
};

const Card: React.FC<CardProps> = ({ icon, title, data }) => {
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

const CardDb: React.FC<CardPropsDb> = ({ icon, title, data }) => {
  return (
    <div
      // className={` p-4 rounded border border-stone-200 shadow-md col-span-${colSpan}`}
      className="p-4 rounded border border-stone-200 shadow-md col-span-4"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <DatabaseDisplay dataPoint={data} />
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

const DatabaseDisplay: React.FC<BarData> = ({ dataPoint }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{dataPoint}</span>
        <span className="text-sm text-gray-500">Databases</span>
      </div>
    </div>
  );
};
