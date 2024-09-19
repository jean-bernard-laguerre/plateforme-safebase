import instance from "./config";

interface Connection {
  Name: string;
  Host: string;
  Port: string;
  User: string;
  Password: string;
  Db_name: string;
  Db_type: string;
}

export const actions = {
  //Test Connection
  async connectTest(connection: Connection) {
    try {
      const response = await instance.post(
        "/connection/test",
        JSON.stringify(connection)
      );
      return response.data;
    } catch (err) {
      console.log("erreur lors du test de la connection:", err);
      return err;
    }
  },

  //Add connection
  async addConnect(connection: Connection) {
    try {
      const response = await instance.post(
        "/connection",
        JSON.stringify(connection)
      );
      return response.data;
    } catch (err) {
      console.log("erreur lors de l'ajout de la connection", err);
      return err;
    }
  },

  //Get user connections ()
  async getUserConnections() {
    try {
      const response = await instance.get("/connection");
      return response.data;
    } catch (err) {
      console.log("erreur lors de la récupération des connections:", err);
      return err;
    }
  },
};
