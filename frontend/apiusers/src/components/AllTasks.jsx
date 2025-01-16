import { useState } from "react";
import { BsInfoCircleFill, BsTrash } from "react-icons/bs";
import { api } from "../lib/axios";

const AllTasks = ({
  tasks,
  setTasks,
  fetchTasks,
  getStatusDisplay,
  handleOpenDialog,
  handleDeleteTask,
}) => {
  const [filter, setFilter] = useState("");
  const [filterBy, setFilterBy] = useState("id");
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const handleFilterSubmit = async () => {
    setNoResultsMessage("");

    if (!filter) {
      fetchTasks();
      return;
    }

    try {
      let response;
      if (filterBy === "id") {
        response = await api.get(`${filter}`);
      } else if (filterBy === "title") {
        response = await api.get(`title/${filter}`);
      }

      if (response.data && response.data.content) {
        if (response.data.content.length === 0) {
          setTasks([]);
          setNoResultsMessage(`Não existe task com o ${filterBy} "${filter}"`);
        } else {
          setTasks(response.data.content);
        }
      } else if (response.data) {
        setTasks([response.data]);
      } else {
        setTasks([]);
        setNoResultsMessage(`Não existe task com o ${filterBy} "${filter}"`);
      }
    } catch (error) {
      console.error("Erro ao filtrar tasks:", error);
      setNoResultsMessage("Ocorreu um erro ao filtrar.");
    }
  };

  return (
    <div className="mt-4 w-full">
      <div className="flex items-center gap-2 mb-4">
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="bg-[#0000004a] border border-[#000000] rounded-md px-2 py-1"
        >
          <option value="id">Filtrar por ID</option>
          <option value="title">Filtrar por Título</option>
        </select>

        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={`Digite o ${filterBy}...`}
          className="bg-[#0000004a] border border-[#000000] rounded-md px-2 py-1"
        />

        <button
          onClick={handleFilterSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Filtrar
        </button>

        <button
          onClick={() => {
            setFilter("");
            setNoResultsMessage("");
            fetchTasks();
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
        >
          Limpar
        </button>
      </div>

      {noResultsMessage && (
        <p className="text-red-500 mb-2">{noResultsMessage}</p>
      )}

      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto bg-[#0000004b] text-white rounded-md shadow-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tasks) &&
              tasks.map((task, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="text-[#d0d0d0] px-4 py-2 font-normal">
                    {task.id ? task.id : "ID não disponível"}
                  </td>
                  <td className="px-4 py-2 font-normal text-[#d0d0d0]">
                    {task.title}
                  </td>
                  <td className="px-4 py-2 font-normal text-[#d0d0d0]">
                    {task.description}
                  </td>
                  <td className="px-4 py-2 font-normal text-[#d0d0d0]">
                    {getStatusDisplay(task.status)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => handleOpenDialog(task)}>
                      <BsInfoCircleFill className="w-5 h-5 mt-1 text-[#ffffffd0] hover:scale-[1.05] transition hover:text-white" />
                    </button>

                    <button onClick={() => handleDeleteTask(task.id)}>
                      <BsTrash className="w-5 h-5 text-red-700 ml-2 hover:scale-[1.05] transition hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTasks;
