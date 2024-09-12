import instance from "./config";

export const actions = {
  //REGISTER
  async register(user: JSON) {
    try {
      const response = await instance.post("/register", JSON.stringify(user));
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
