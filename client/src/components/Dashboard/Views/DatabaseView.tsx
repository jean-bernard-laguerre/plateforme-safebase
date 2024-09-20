import { Tooltip } from "@nextui-org/tooltip";
import { ArrowDownToLine, DatabaseZap, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DatabaseForm } from "../Forms/DatabaseForm";
import Modal from "../Modal";
import { actions } from "@/services/connectionService";
import { actions as dump } from "@/services/dumpService";

interface User {
  id: number;
  email: string;
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

const DatabaseView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [databases, setDatabases] = useState<Databases | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function getUserDatabase() {
    // get user databases
    const response = await actions.getUserConnections();
    console.log("response", response);
    if (response.success === false) {
      console.log("erreur lors de la récupération des connections:", response);
      return;
    } else if (response.connections.length > 0) {
      console.log("response.connections", response.connections);
      setDatabases({ databases: response.connections });
    }
  }

  async function dumpDatabase(id: number) {
    const response = await dump.dump(id);
    console.log("response", response);
    if (response.success === true) {
      console.log("dump effectué avec succès", response.message);
      //TODO: TOAST success
    } else {
      console.log("erreur lors du dump de la base:", response);
      //TODO: TOAST error
    }
  }

  async function deleteDatabase(id: number) {
    const response = await actions.deleteConnection(id);
    console.log("response", response);
    if (response.success === true) {
      console.log("connection supprimée avec succès", response.message);
      //TODO: TOAST success
      getUserDatabase();
    } else {
      //TODO: TOAST error
      console.log("erreur lors de la suppression de la connection:", response);
    }
  }

  useEffect(() => {
    getUserDatabase();
  }, [isModalOpen]);

  useEffect(() => {
    console.log("databases", databases);
  }, [databases]);

  return (
    <div className="p-4 col-span-12 bg-transparent rounded border border-stone-300 mx-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <DatabaseZap />
          Database Connection
        </h3>
        <Tooltip
          content="Add a new database"
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

      {databases ? (
        <table className="w-full table-auto">
          <TableHead></TableHead>
          <tbody>
            {databases.databases.map((database, index) => (
              <TableRow
                key={database.Id}
                id={database.Id}
                dbName={database.Db_name}
                type={database.Db_type}
                host={database.Host}
                port={database.Port}
                name={database.Name}
                order={index + 1}
                dumpDatabase={dumpDatabase}
                deleteDatabase={deleteDatabase}
              ></TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-sm">
          <span>Vous n'avez pas encore de base de données</span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <DatabaseForm handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">DBName</th>
        <th className="text-start p-1.5">Type</th>
        <th className="text-start p-1.5">Host</th>
        <th className="text-start p-1.5">Port</th>
        <th className="text-start p-1.5">Name</th>
        <th className="w-1"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  id,
  dbName,
  type,
  host,
  port,
  name,
  order,
  dumpDatabase,
  deleteDatabase,
}: {
  id: number;
  dbName: string;
  type: string;
  host: string;
  port: number;
  name: string;
  order: number;
  dumpDatabase: (id: number) => void;
  deleteDatabase: (id: number) => void;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm "}>
      <td className="p-1.5">{dbName}</td>
      <td className="p-1.5">{type}</td>
      <td className="p-1.5">{host}</td>
      <td className="p-1.5">{port}</td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5 flex gap-2">
        <Tooltip
          showArrow
          content="Sauvegarder"
          placement="left"
          className="border border-slate-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8"
            onClick={() => {
              dumpDatabase(id);
            }}
          >
            <ArrowDownToLine size={16} />
          </button>
        </Tooltip>

        <Tooltip
          showArrow
          content="Supprimer"
          placement="left"
          className="border border-slate-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8"
            onClick={() => {
              deleteDatabase(id);
            }}
          >
            <Trash2 size={16} />
          </button>
        </Tooltip>
      </td>
    </tr>
  );
};

export default DatabaseView;
