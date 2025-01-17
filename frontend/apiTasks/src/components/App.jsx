import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import TaskDialog from "./TaskDialog";
import useTasks from "./useTasks";

const App = () => {
  const {
    tasks,
    setTasks,
    fetchTasks,
    selectedTask,
    isDialogOpen,
    handleFormSubmit,
    handleDeleteTask,
    handleOpenDialog,
    handleCloseDialog,
    getStatusDisplay,
  } = useTasks();

  return (
    <div className="w-full h-screen bg-custom-radial-gradient flex items-center justify-center">
      <div className="flex flex-col items-center p-6 justify-center rounded-md text-white w-full max-w-3xl">
        <h1 className="text-5xl font-semibold font-coolvetica text-center mb-10">
          Cadastro de Tasks
        </h1>

        <AddTask handleFormSubmit={handleFormSubmit} />

        <AllTasks
          tasks={tasks}
          setTasks={setTasks}
          fetchTasks={fetchTasks}
          getStatusDisplay={getStatusDisplay}
          handleOpenDialog={handleOpenDialog}
          handleDeleteTask={handleDeleteTask}
        />
      </div>

      <TaskDialog
        task={selectedTask}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default App;
