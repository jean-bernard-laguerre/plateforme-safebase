import { Tooltip } from "@nextui-org/tooltip";
import { ArrowDownToLine, DatabaseZap, Trash2 } from "lucide-react";
import { useState } from "react";
import { DatabaseForm } from "../Forms/DatabaseForm";
import Modal from "../Modal";

const DatabaseView = () => {
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
          Database Connection
        </h3>
        <button
          onClick={handleOpenModal}
          className="text-sm font-semibold bg-violet-400 text-stone-50 p-1 rounded border  border-violet-500"
        >
          Add +
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead></TableHead>
        <tbody>
          <TableRow
            dbName="db1"
            type="Postgres"
            port={5432}
            name="db1"
            order={1}
          ></TableRow>
          <TableRow
            dbName="db1"
            type="Postgres"
            port={5432}
            name="db1"
            order={2}
          ></TableRow>
          <TableRow
            dbName="db1"
            type="Postgres"
            port={5432}
            name="db1"
            order={3}
          ></TableRow>
        </tbody>
      </table>

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
        <th className="text-start p-1.5">Port</th>
        <th className="text-start p-1.5">Name</th>
        <th className="w-1"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  dbName,
  type,
  port,
  name,
  order,
}: {
  dbName: string;
  type: string;
  port: number;
  name: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm "}>
      <td className="p-1.5">{dbName}</td>
      <td className="p-1.5">{type}</td>
      <td className="p-1.5">{port}</td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5 flex gap-2">
        <Tooltip showArrow={true} content="Sauvegarder">
          <button className="text-sm font font-semibold bg-[#8BFAA7] text-stone-50 p-1 rounded">
            <ArrowDownToLine size={16} />
          </button>
        </Tooltip>

        <Tooltip
          showArrow={true}
          content="Supprimer"
          className="border border-slate-500"
        >
          <button className="text-sm font-semibold bg-[#FA8BA7] text-white p-1 rounded">
            <Trash2 size={16} />
          </button>
        </Tooltip>
      </td>
    </tr>
  );
};

export default DatabaseView;
