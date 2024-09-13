import instance from "./config";

export const actions = {
  //GET ALL
  async getAll() {
    try {
      const response = await instance.get("/history/all");
      return response.data;
    } catch (err) {
      console.log("erreur lors de la requête d'histories:", err);
      return err;
    }
  },
};
