import { actions } from "@/services/connectionService";
import { useState } from "react";
import { toast } from "sonner";

interface DatabaseFormProps {
  handleCloseModal: () => void;
}

export const DatabaseForm: React.FC<DatabaseFormProps> = ({
  handleCloseModal,
}) => {
  const [testConnection, setTestConnection] = useState<boolean>(false);
  const [connection, setConnection] = useState({
    Name: "",
    Host: "",
    Port: "",
    User: "",
    Password: "",
    Db_name: "",
    Db_type: "mysql",
  });

  const dbTypeModel = ["mysql", "postgres"];

  async function test() {
    const response = await actions.connectTest(connection);

    if (response.success === true) {
      toast.success("Test de connection réussi 👍 ");
      setTestConnection(true);
    } else {
      toast.error("Erreur lors du test de connection 👎 ", {
        description: response.response.data.error,
      });
      setTestConnection(false);
    }
  }

  async function addConnection() {
    const response = await actions.addConnect(connection);
    if (response.success === true) {
      toast.success("Base de données ajoutée avec succès");
      handleCloseModal();
    } else {
      toast.error("Erreur lors de l'ajout de la connection", {
        description: response.message,
      });
    }
  }

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
            onChange={(e) => {
              setConnection({ ...connection, Db_name: e.target.value });
              setTestConnection(false);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Type</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setConnection({ ...connection, Db_type: e.target.value });
              setTestConnection(false);
            }}
          >
            {dbTypeModel.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Host</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter Host"
            onChange={(e) => {
              setConnection({ ...connection, Host: e.target.value });
              setTestConnection(false);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Port</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter Port"
            onChange={(e) => {
              setConnection({ ...connection, Port: e.target.value });
              setTestConnection(false);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Db User</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter User"
            onChange={(e) => {
              setConnection({ ...connection, User: e.target.value });
              setTestConnection(false);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Db Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Enter Password"
            onChange={(e) => {
              setConnection({ ...connection, Password: e.target.value });
              setTestConnection(false);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nom personnalisé</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter Name"
            onChange={(e) => {
              setConnection({ ...connection, Name: e.target.value });
              setTestConnection(false);
            }}
          />
        </div>

        <div className="flex justify-between">
          <div>
            <button
              type="button"
              className="text-sm font-semibold bg-violet-500 text-stone-50 p-2 rounded hover:bg-violet-600"
              onClick={(e) => {
                e.preventDefault();
                test();
              }}
            >
              Test Connection
            </button>

            {testConnection && (
              <span
                className="ml-2 text-green-500
            "
              >
                ✔️
              </span>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleCloseModal}
              className="text-sm font-semibold bg-error-500 text-white p-2 rounded hover:bg-error-600"
            >
              Cancel
            </button>
            <button
              disabled={!testConnection}
              className={`ml-2 text-sm font-semibold text-white p-2 rounded ${
                !testConnection
                  ? "cursor-not-allowed bg-success-cta-100 text-success-cta-400 border border-success-cta-400"
                  : "bg-success-cta-700 text-stone-50 hover:bg-success-cta-600 "
              }`}
              onClick={(e) => {
                e.preventDefault();

                addConnection();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
