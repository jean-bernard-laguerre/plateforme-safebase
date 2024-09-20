interface BackupFormProps {
  handleCloseModal: () => void;
}

export const BackupForm: React.FC<BackupFormProps> = ({ handleCloseModal }) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Add New Backup</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Entrez le nom"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tâche Programmée</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Entrez la tâche programmée"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">DB Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Entrez le nom de la base de données"
          />
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
            className="ml-2 text-sm font-semibold bg-green-500 text-white p-2 rounded"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default BackupForm;
