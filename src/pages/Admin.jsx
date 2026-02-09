import React, { useState } from "react";

const Admin = () => {
  const [active, setActive] = useState("assign");
  const [empCode, setEmpCode] = useState("");
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!empCode || !title) {
      alert("Employee code & title required");
      return;
    }

    setTasks([
      ...tasks,
      {
        empCode,
        title,
        isEditing: false,
      },
    ]);

    setEmpCode("");
    setTitle("");
  };

  const editTask = (index) => {
    const updated = [...tasks];
    updated[index].isEditing = true;
    setTasks(updated);
  };

  const saveTask = (index, updatedTask) => {
  const updated = [...tasks];
  updated[index] = {
    ...updatedTask,
    isEditing: false,
  };
  setTasks(updated);
};

  return (
    <div className="h-screen bg-gray-100">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-xl h-20">
        <div className="flex gap-2 items-center h-full ml-10">
          <div className="bg-red-700 text-white rounded-xl h-12 w-12 text-center py-2 text-2xl">
            T
          </div>
          <h4 className="font-bold text-2xl">Task Management</h4>
        </div>
      </header>

      <div className="flex pt-20 h-full">

        {/* SIDEBAR */}
        <div className="w-64 bg-black text-white p-6 flex flex-col gap-4 h-full">
         <button
            onClick={() => setActive("assign")}
            className={`block w-full text-left px-4 py-2 rounded mb-3 ${
              active === "assign" ? "bg-red-700" : "hover:bg-gray-800"
            }`}
          >
            Assign Task
          </button>

          <button
            onClick={() => setActive("feedback")}
            className={`block w-full text-left px-4 py-2 rounded ${
              active === "feedback" ? "bg-red-700" : "hover:bg-gray-800"
            }`}
          >
            Feedback
          </button>

        </div>

        {/* CONTENT */}
        <main className="flex-1 p-6">

          {active === "assign" && (
            <>
              {/* FORM */}
              <div className="bg-white p-4 rounded shadow mb-6 w-96">
                <h2 className="font-bold mb-3">Assign Task</h2>

                <input
                  type="text"
                  placeholder="Employee Code"
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                  className="border p-2 w-full mb-3"
                />

                <input
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 w-full mb-3"
                />

                <button
                  onClick={addTask}
                  className="bg-red-700 text-white px-4 py-2 rounded"
                >
                  Add Task
                </button>
              </div>

            {/* TASK LIST */}
<div className="grid gap-3">
  {tasks.map((task, index) => (
    <div
      key={index}
      className="bg-white p-4 rounded shadow"
    >
      {task.isEditing ? (
        <>
          {/* EDIT MODE */}
          <input
            defaultValue={task.empCode}
            onChange={(e) =>
              (task.empCode = e.target.value)
            }
            className="border p-2 w-full mb-2"
            placeholder="Employee Code"
          />

          <input
            defaultValue={task.title}
            onChange={(e) =>
              (task.title = e.target.value)
            }
            className="border p-2 w-full mb-2"
            placeholder="Task Title"
          />

          <button
            onClick={() => saveTask(index, task)}
            className="bg-green-600 text-white px-3 py-1 rounded ml-250"
          >
        Save
          </button>
        </>
      ) : (
        <>
          {/* VIEW MODE */}
          <p className="text-sm text-gray-500">
            Emp Code: {task.empCode}
          </p>

          <p className="font-semibold mb-2">
            {task.title}
          </p>

          <button
            onClick={() => editTask(index)}
            className=" text-white px-3 py-1 rounded ml-250"
          >
            ✏️
          </button>
        </>
      )}
    </div>
  ))}
</div>

              
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
