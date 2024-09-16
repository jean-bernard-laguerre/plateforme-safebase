import instance from "./config";

interface User {
  email: string;
  password: string;
}

export const actions = {
  //REGISTER
  async register(user: User) {
    // try {
    //   const response = await instance.post("/register", JSON.stringify(user));
    //   return response.data;
    // } catch (err) {
    //   console.log("erreur lors de l'inscription:", err);
    //   return err;
    // }
    const response = await instance.post("/register", JSON.stringify(user));
    console.log("RESPONSE", response);
  },

  //LOGIN
  async login(user: User) {
    try {
      const response = await instance.post("/login", JSON.stringify(user));
      return response.data;
    } catch (err) {
      console.log("erreur lors de la connection:", err);
      return err;
    }
  },
};
