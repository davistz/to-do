import { api } from "../lib/axios";

export const fetchTasks = async () => {
  try {
    const response = await api.get();
    return response.data.content || [];
  } catch (error) {
    console.error("Erro ao buscar tasks:", error);
  }
};
