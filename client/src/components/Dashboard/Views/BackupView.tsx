import { Tooltip } from "@nextui-org/tooltip";
import { DatabaseZap, Pause, Play, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import BackupForm from "../Forms/BackupForm";
import Modal from "../Modal";

const BackupView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <table className="w-full table-auto">
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
      </table>

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
  name,
  cron,
  dbName,
  createdAt,
  order,
}: {
  name: string;
  cron: string;
  dbName: string;
  createdAt: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-violet-100 text-sm" : "text-sm"}>
      <td className="text-start p-1.5">{name}</td>
      <td className="text-start p-1.5">{cron}</td>
      <td className="text-start p-1.5">{dbName}</td>
      <td className="text-start p-1.5">{createdAt}</td>
      <td className="text-start p-1.5 flex">
        {/* //TODO=> Mettre en place condition PLAY/PAUSE */}
        <Tooltip
          closeDelay={0.5}
          showArrow
          content="Sauvegarder"
          placement="top"
          className="border border-stone-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8">
            <Play size={16} />
          </button>
        </Tooltip>
        <Tooltip
          closeDelay={0.5}
          showArrow
          content="Sauvegarder"
          placement="top"
          className="border border-stone-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8">
            <Pause size={16} />
          </button>
        </Tooltip>
        <Tooltip
          closeDelay={0.5}
          showArrow
          content="Sauvegarder"
          placement="top"
          className="border border-stone-300 text-sm bg-slate-500 text-stone-50 rounded p-1 shadow-sm"
        >
          <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8">
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
          <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded-full text-sm size-8">
            <Trash2 size={16} />
          </button>
        </Tooltip>
      </td>
    </tr>
  );
};

export default BackupView;
