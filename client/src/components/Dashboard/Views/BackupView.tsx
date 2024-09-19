import { Tooltip } from "@nextui-org/tooltip";
import { DatabaseZap } from "lucide-react";
import { useState } from "react";

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
    </div>
  );
};

export default BackupView;
