import instance from "./config";

interface Task {
  Name: "string";
  Cron_job: "string";
  Connection_id: number;
  Created_at: Date;
  Active: boolean;
}

export const actions = {
  //ADD Cron task
  async createTask(task: Task) {
    try {
      const response = await instance.post("/dump/task", JSON.stringify(task));
      return response.data;
    } catch (err) {
      console.log("erreur lors de la création de la tâche:", err);
      return err;
    }
  },

  //Toggle a task
  async toggleTask(id: number, value: boolean) {
    try {
      const response = await instance.patch(`/dump/task/${id}`, {
        Active: value,
      });
      return response.data;
    } catch (err) {
      console.log("erreur lors du toggle de la task:", err);
      return err;
    }
  },
};
