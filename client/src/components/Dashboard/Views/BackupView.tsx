import { actions as dump } from "@/services/dumpService";
import { Tooltip } from "@nextui-org/tooltip";
import { DatabaseZap, Pause, Play, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BackupForm from "../Forms/BackupForm";
import Modal from "../Modal";

interface Backup {
  Id: number;
  Name: string;
  Cron_job: string;
  Db_name: string;
  Created_at: string;
  Active: boolean;
  Connection_id: number;
}

interface Backups {
  backups: Backup[];
}

const BackupView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backups, setBackups] = useState<Backups | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function getUserBackups() {
    // get user backups
    const response = await dump.getAll();
    console.log("response", response);
    if (response.success === false) {
      toast.error("Erreur lors de la récupération des backups", {
        description: response.message,
      });

      return;
    } else if (response.data.length > 0) {
      console.log("response.tasks", response.data);
      setBackups({ backups: response.data });
    } else {
      setBackups(null);
    }
  }

  async function dumpDatabase(id: number) {
    const response = await dump.dump(id);
    console.log("response", response);
    if (response.success === true) {
      getUserBackups();
      toast.success("Backup effectué avec succès");
    } else {
      toast.error("Erreur lors du Backup de la base de données", {
        description: response.message,
      });
    }
  }

  async function deleteTask(id: number) {
    const response = await dump.deleteTask(id);
    console.log("response", response);
    if (response.success === true) {
      toast.success("Tâche supprimée avec succès");
      getUserBackups();
    } else {
      toast.error("Erreur lors de la suppression de la tâche", {
        description: response.message,
      });
    }
  }

  async function toggleTask(id: number, value: boolean) {
    const response = await dump.toggleTask(id, value);
    console.log("response", response);
    if (response.success === true) {
      toast.success("Tâche modifiée avec succès");
      getUserBackups();
    } else {
      toast.error("Erreur lors de la modification de la tâche", {
        description: response.message,
      });
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      getUserBackups();
    }
  }, [isModalOpen]);

  return (
    <div className="p-4 col-span-12 bg-transparent rounded border border-stone-300 mx-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <DatabaseZap />
          BackUps
        </h3>
        <Tooltip
          content="Add a new backup"
          placement="left"
          showArrow
          className="border border-slate-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button
            onClick={handleOpenModal}
            className="text-sm font-semibold bg-violet-400 text-stone-50 p-1 rounded border  border-violet-500"
          >
            Add +
          </button>
        </Tooltip>
      </div>
      {/* <table className="w-full table-auto">
        <TableHead></TableHead>
        <tbody>
          <TableRow
            name="backup1"
            cron="0 0 * * *"
            dbName="db1"
            createdAt="2021-10-10"
            order={1}
          ></TableRow>
          <TableRow
            name="backup2"
            cron="0 0 * * *"
            dbName="db1"
            createdAt="2021-10-10"
            order={2}
          ></TableRow>
          <TableRow
            name="backup3"
            cron="0 0 * * *"
            dbName="db1"
            createdAt="2021-10-10"
            order={3}
          ></TableRow>
        </tbody>
      </table> */}
      {backups ? (
        <table className="w-full table-auto">
          <TableHead></TableHead>
          <tbody>
            {backups.backups.map((backup, index) => (
              <TableRow
                key={index}
                id={backup.Id}
                name={backup.Name}
                cron={backup.Cron_job}
                dbName={backup.Db_name}
                createdAt={backup.Created_at}
                active={backup.Active}
                connectionId={backup.Connection_id}
                order={index + 1}
                toggleTask={toggleTask}
                dumpDatabase={dumpDatabase}
                deleteTask={deleteTask}
              ></TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-sm">
          <span>Vous n'avez pas encore de tâches programmées</span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BackupForm handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Nom</th>
        <th className="text-start p-1.5">Tâche Programmée</th>
        <th className="text-start p-1.5">DB Name</th>
        <th className="text-start p-1.5">Date de création</th>
        <th className="text-start p-1.5">Actions</th>
        <th className="w-1"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  id,
  name,
  cron,
  dbName,
  createdAt,
  active,
  connectionId,
  order,
  toggleTask,
  dumpDatabase,
  deleteTask,
}: {
  id: number;
  name: string;
  cron: string;
  dbName: string;
  createdAt: string;
  active: boolean;
  connectionId: number;
  order: number;
  toggleTask: (id: number, value: boolean) => void;
  dumpDatabase: (id: number) => void;
  deleteTask: (id: number) => void;
}) => {
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
  // cronDisplay
  const cronDisplay = CronModels.find((model) => model.model === cron)?.name;

  const DateDisplay = new Date(createdAt);
  const createdAtDisplay = DateDisplay.toLocaleString("fr-FR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <tr className={order % 2 ? "bg-violet-100 text-sm" : "text-sm"}>
      <td className="text-start p-1.5">{name}</td>
      <td className="text-start p-1.5">{cronDisplay}</td>
      <td className="text-start p-1.5">{dbName}</td>
      <td className="text-start p-1.5">{createdAtDisplay}</td>
      <td className="text-start p-1.5 flex">
        {active ? (
          <Tooltip
            closeDelay={0.5}
            showArrow
            content="Arrêter la tâche"
            placement="top"
            className="border border-stone-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
          >
            <button
              className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8"
              onClick={() => {
                toggleTask(1, false);
              }}
            >
              <Pause size={16} />
            </button>
          </Tooltip>
        ) : (
          <Tooltip
            closeDelay={0.5}
            showArrow
            content="Reprendre la tâche"
            placement="top"
            className="border border-stone-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
          >
            <button
              className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8"
              onClick={() => {
                toggleTask(1, true);
              }}
            >
              <Play size={16} />
            </button>
          </Tooltip>
        )}
        <Tooltip
          closeDelay={0.5}
          showArrow
          content="Sauvegarder"
          placement="top"
          className="border border-stone-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8"
            onClick={() => {
              dumpDatabase(connectionId);
            }}
          >
            <Save size={16} />
          </button>
        </Tooltip>

        <Tooltip
          closeDelay={0.5}
          showArrow
          content="Supprimer"
          placement="top"
          className="border border-stone-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8"
            onClick={() => {
              deleteTask(id);
            }}
          >
            <Trash2 size={16} />
          </button>
        </Tooltip>
      </td>
    </tr>
  );
};

export default BackupView;
