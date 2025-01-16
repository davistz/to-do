import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterBy, setFilterBy] = useState("id");
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8080/users/", data);

      const response = await axios.get("http://localhost:8080/users/");
      setUsers(response.data);

      reset();
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  const handleFilterChange = async (e) => {
    const value = e.target.value;
    setFilter(value);

    try {
      if (value.length >= 1) {
        let response;
        if (filterBy === "id") {
          response = await axios.get(`http://localhost:8080/users/id/${value}`);
        } else if (filterBy === "name") {
          response = await axios.get(
            `http://localhost:8080/users/name/${value}`
          );
        } else if (filterBy === "email") {
          response = await axios.get(
            `http://localhost:8080/users/email/${value}`
          );
        } else {
          response = await axios.get("http://localhost:8080/users/");
        }

        if (response.data.length === 0) {
          setNoResultsMessage(
            `Não existe usuário com o ${filterBy} "${filter}"`
          );
        }
        setUsers(response.data);
      } else if (value.length === 0) {
        const response = await axios.get("http://localhost:8080/users/");
        setNoResultsMessage("");
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Erro ao filtrar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const getPlaceholder = () => {
    switch (filterBy) {
      case "id":
        return "Filtrar por ID";
      case "name":
        return "Filtrar por Nome";
      case "email":
        return "Filtrar por Email";
      default:
        return "Filtrar por ID, Nome ou Email";
    }
  };

  return (
    <div className="w-full h-screen bg-custom-radial-gradient flex items-center justify-center">
      <div className="flex flex-col items-center p-6 justify-center rounded-md text-white w-full max-w-3xl">
        <h1 className="text-5xl font-semibold font-coolvetica text-center mb-10">
          Cadastro de Usuários
        </h1>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full items-center flex gap-4"
        >
          <div className="w-full">
            <label htmlFor="name" className="block text-lg font-normal">
              Nome
            </label>
            <div>
              <input
                type="text"
                id="name"
                {...register("name", { required: "O Nome é obrigatório!" })}
                className="w-full px-4 py-2 bg-[#0000004a] border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o nome"
              />
              {errors.name && (
                <p className="absolute text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="email" className="block text-lg font-normal">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "O Email é obrigatório!" })}
              className="w-full px-4 py-2 bg-[#0000004a] border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o email"
            />
            {errors.email && (
              <p className="absolute text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="age" className="block text-lg font-normal">
              Idade
            </label>
            <input
              type="number"
              id="age"
              {...register("age", { required: "A Idade é obrigatória!" })}
              className="w-full px-4 py-2 bg-[#0000004a] border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a idade"
            />
            {errors.age && (
              <p className="absolute text-red-500 text-sm mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[42px] mt-7 bg-[#151585] text-white rounded-md bg-[linear-gradient(90deg,_#3a266e_50%,_transparent)] hover:bg-[linear-gradient(90deg,_#35359e_0%,_transparent)] hover:animate-fill-color focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Adicionar Usuário
          </button>
        </form>
        <div className="flex items-center justify-between mt-10">
          <h1 className="text-2xl">Todos os Usuários</h1>
          <div className="flex items-center ml-[180px]">
            {" "}
            <select
              name="filterBy"
              id="filterBy"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="bg-[#0000004a] text-white px-4 py-2 rounded-md border-b-2 border-[#0000008f] focus:outline-none focus:ring-0"
            >
              <option value="id">ID</option>
              <option value="name">Nome</option>
              <option value="email">Email</option>
            </select>
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder={getPlaceholder()}
              onBlur={handleFilterChange}
              className="w-[200px] ml-4 mr-2 px-4 py-2 bg-[#0000004a] border-b-2 border-[#0000008f] focus:outline-none focus:ring-0 text-white pr-10"
            />
            <div className="mt-1 transform text-[#cccccc]">
              <button
                onClick={handleFilterChange}
                className="bg-transparent border-none"
              >
                <FaSearch size={20} />
              </button>
            </div>
          </div>
        </div>

        {noResultsMessage ? (
          <div className="mt-14 text-[#ffffffd0]">{noResultsMessage}</div>
        ) : (
          <div className="overflow-x-auto w-full mt-4">
            <table className="min-w-full table-auto bg-[#0000004b] text-white rounded-md shadow-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Idade</th>
                  <th className="px-4 py-2 text-left">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="text-[#d0d0d0] px-4 py-2 font-normal">
                      {user.id ? user.id.substring(0, 8) : "ID não disponível"}
                    </td>
                    <td className="px-4 py-2 font-normal text-[#d0d0d0]">
                      {user.name}
                    </td>
                    <td className="px-4 py-2 font-normal text-[#d0d0d0]">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 font-normal text-[#d0d0d0]">
                      {user.age}
                    </td>
                    <td className="px-4 py-2 font-normal text-[#d0d0d0]">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
