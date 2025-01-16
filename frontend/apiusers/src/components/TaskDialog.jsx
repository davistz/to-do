import { useState, useEffect } from "react";
import useTasks from "./useTasks";

const TaskDialog = ({ task, isOpen, onClose }) => {
  const { updateTask, fetchTasks } = useTasks(); // Adiciona fetchTasks para atualizar a lista global após salvar
  const [editableTask, setEditableTask] = useState(null);

  // Atualiza o estado local editableTask sempre que a task mudar
  useEffect(() => {
    if (task) {
      setEditableTask(task);
    }
  }, [task]);

  // Impede a renderização do componente se o diálogo não estiver aberto ou se a tarefa não for válida
  if (!isOpen || !editableTask) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateTask(editableTask); // Atualiza a tarefa no backend
      window.location.reload(); // Recarrega a página para refletir as alterações
    } catch (error) {
      console.error("Erro ao salvar a task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] text-white p-6 rounded-md w-[500px] h-[460px]">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-bold">Detalhes da Task</h2>
        </div>
        <div>
          <label className="block text-lg font-medium">
            ID: {editableTask.id}
          </label>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-lg font-medium">Título</label>
            <input
              type="text"
              name="title"
              value={editableTask.title}
              onChange={handleInputChange}
              className="w-full p-2 bg-[#2d2d3d] text-white rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Descrição</label>
            <input
              type="text"
              name="description"
              value={editableTask.description}
              onChange={handleInputChange}
              className="w-full h-[70px] bg-[#2d2d3d] text-white rounded-md pt-1 text-left"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Status</label>
            <select
              name="status"
              value={editableTask.status}
              onChange={handleInputChange}
              className="w-full p-2 bg-[#2d2d3d] text-white rounded-md"
            >
              <option value="NAO_INICIADO">Não iniciado</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDO">Concluído</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 w-full mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
          >
            Fechar
          </button>
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 bg-[#150730] text-white rounded-md hover:bg-[#2f1660] transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDialog;
