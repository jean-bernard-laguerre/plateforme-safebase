interface DatabaseFormProps {
  handleCloseModal: () => void;
}

export const DatabaseForm: React.FC<DatabaseFormProps> = ({
  handleCloseModal,
}) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Add New Database</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">DB Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter DB Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Type</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter DB Type"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCloseModal}
            className="text-sm font-semibold bg-red-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 text-sm font-semibold bg-green-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
