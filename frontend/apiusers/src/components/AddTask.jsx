import { useForm } from "react-hook-form";

const AddTask = ({ handleFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full items-center flex gap-4"
    >
      <div className="w-full">
        <label htmlFor="title" className="block text-lg font-normal">
          Título
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "O Título é obrigatório!" })}
          className="w-full px-4 py-2 bg-[#0000004a] border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o título"
        />
        {errors.title && (
          <p className="absolute text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <label htmlFor="description" className="block text-lg font-normal">
          Descrição
        </label>
        <input
          type="text"
          id="description"
          {...register("description", {
            required: "A Descrição é obrigatória!",
          })}
          className="w-full px-4 py-2 bg-[#0000004a] border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite a descrição"
        />
        {errors.description && (
          <p className="absolute text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full h-[42px] mt-7 bg-[#151585] text-white rounded-md bg-[linear-gradient(90deg,_#3a266e_50%,_transparent)] hover:bg-[linear-gradient(90deg,_#35359e_0%,_transparent)] hover:animate-fill-color focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Adicionar Task
      </button>
    </form>
  );
};

export default AddTask;
