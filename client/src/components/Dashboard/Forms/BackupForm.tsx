import { actions as connect } from "@/services/connectionService";
import { actions as dump } from "@/services/dumpService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BackupFormProps {
  handleCloseModal: () => void;
}

interface Database {
  Id: number;
  Name: string;
  Db_name: string;
  Db_type: string;
  Host: string;
  Port: number;
}

// interface de databases contenant un array de Database
interface Databases {
  databases: Database[];
}

interface Task {
  Name: string;
  Cron_job: string;
  Connection_id: number;
}

export const BackupForm: React.FC<BackupFormProps> = ({ handleCloseModal }) => {
  const [databases, setDatabases] = useState<Databases | null>(null);
  const [task, setTask] = useState<Task>({
    Name: "",
    Cron_job: "0 6 * * *",
    Connection_id: 1,
  });
  const [formOk, setFormOk] = useState<boolean>(false);

  // modéles de cron avec valeurs par défaut et son équivallent en français
  const CronModels = [
    {
      name: "Tous les jours à 6h",
      model: "0 6 * * *",
    },
    {
      name: "Tous les jours à 12h",
      model: "0 12 * * *",
    },
    {
      name: "Tous les jours à 18h",
      model: "0 18 * * *",
    },
    {
      name: "Tous les jours à minuit",
      model: "0 0 * * *",
    },
    {
      name: "Tous les dimanches à minuit",
      model: "0 0 * * 0",
    },
    {
      name: "Toutes les minutes",
      model: "* * * * *",
    },
    {
      name: "Toutes les heures",
      model: "0 * * * *",
    },
    {
      name: "Tous les premiers de chaque mois à minuit",
      model: "0 0 1 * *",
    },
    {
      name: "Tous les premiers janvier à minuit",
      model: "0 0 1 1 *",
    },
  ];

  async function getUserDatabase() {
    // get user databases
    const response = await connect.getUserConnections();
    console.log("response", response);
    if (response.success === false) {
      toast.error("Erreur lors de la récupération des connections", {
        description: response.message,
      });
      console.log("erreur lors de la récupération des connections:", response);
      return;
    } else if (response.connections.length > 0) {
      console.log("response.connections", response.connections);
      setDatabases({ databases: response.connections });
    }
  }

  async function addTask() {
    const response = await dump.createTask(task);
    console.log("response", response);
    if (response.success === true) {
      toast.success("Tâche ajoutée avec succès");

      handleCloseModal();
    } else {
      toast.error("Erreur lors de l'ajout de la tâche", {
        description: response.message,
      });
    }
  }

  useEffect(() => {
    getUserDatabase();
  }, []);

  useEffect(() => {
    if (task.Name && task.Cron_job && task.Connection_id) {
      setFormOk(true);
    } else {
      setFormOk(false);
    }
  }, [task]);

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Add New Task</h2>
      {databases ? (
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Entrez le nom"
              onChange={(e) => {
                setTask({ ...task, Name: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Tâche Programmée
            </label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setTask({ ...task, Cron_job: e.target.value });
              }}
            >
              {CronModels.map((cron) => (
                <option key={cron.model} value={cron.model}>
                  {cron.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Base de donnée source
            </label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setTask({ ...task, Connection_id: Number(e.target.value) });
              }}
            >
              {databases?.databases.map((database) => (
                <option key={database.Id} value={database.Id}>
                  <span>
                    {database.Db_name} (type: {database.Db_type})
                  </span>
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="text-sm font-semibold bg-red-500 text-white p-2 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!formOk}
              className={`ml-2 text-sm font-semibold p-2 rounded ${
                formOk
                  ? "bg-green-500 text-white"
                  : "bg-violet-100 text-stone-500 cursor-not-allowed"
              }`}
              onClick={(e) => {
                e.preventDefault();
                addTask();
              }}
            >
              Sauvegarder
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center text-sm">
          <span>Vous n'avez pas encore de base de données</span>
          <span className="block mt-2">
            Veuillez ajouter une avant de continuer
          </span>
        </div>
      )}
    </div>
  );
};

export default BackupForm;
