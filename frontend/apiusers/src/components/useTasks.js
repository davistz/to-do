import { useEffect, useState } from "react";
import { api } from "../lib/axios";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("");

      setTasks(response.data.content || []);
      setFilteredTasks(response.data.content || []);
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      await api.post("", data);
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`${id}`);
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar task:", error);
    }
  };

  const updateTask = async (editableTask) => {
    try {
      await api.put(`${editableTask.id}`, editableTask);
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar a task:", error);
    }
  };

  const handleOpenDialog = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
    setIsDialogOpen(false);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "NAO_INICIADO":
        return "Não iniciado";
      case "EM_ANDAMENTO":
        return "Em andamento";
      case "CONCLUIDO":
        return "Concluído";
      default:
        return "Status desconhecido";
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  return {
    tasks,
    selectedTask,
    isDialogOpen,
    fetchTasks,
    handleFormSubmit,
    handleDeleteTask,
    updateTask,
    handleOpenDialog,
    handleCloseDialog,
    getStatusDisplay,
    setTasks,
  };
};

export default useTasks;
