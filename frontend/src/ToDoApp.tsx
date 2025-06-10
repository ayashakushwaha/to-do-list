import './App.css';
import { menu } from './lib/data';
import TaskCard from './components/custom/TaskCard';
import { getTasks, type Task } from './lib/actions';
import { Outlet, useLoaderData, type Params } from 'react-router-dom';
import { Toggle } from './components/ui/toggle';
import { useState } from 'react';

function ToDoApp() {
  // Extract the current section label from the sidebar menu based on route path
  const currentSectionLabel = menu.sidebar.items.find((item: any) => item.path === location.pathname)?.label;

  // Load tasks using loader function
  const allTasks = useLoaderData();
  const [filteredTasks, setFilteredTasks] = useState(allTasks);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className='flex flex-col items-start max-h-screen space-y-4 py-2 px-0'>
      <Outlet />
      <h1 className='text-3xl font-semibold mb-6'>{currentSectionLabel}</h1>

      <div className='flex -mx-2'>
        {menu.categories.map((categoryItem, index: number) => (
          <div className='mx-2' key={index}>
            <Toggle
              variant="outline"
              size="lg"
              className='data-[state=on]:bg-slate-200'
              pressed={selectedCategory === categoryItem.label}
              onPressedChange={(isPressed) => {
                const newCategory = isPressed ? categoryItem.label : "";
                setSelectedCategory(newCategory);
                setFilteredTasks(
                  isPressed
                    ? allTasks.filter((task: Task) => task.category === categoryItem.label)
                    : allTasks
                );
              }}
            >
              <categoryItem.icon className=' hidden md:inline' />
              {categoryItem.label}
            </Toggle>
          </div>
        ))}
      </div>

      {allTasks.length > 0 && !selectedCategory ? (
        allTasks.map((task: Task) => <TaskCard task={task} key={task.id} />)
      ) : (
        selectedCategory ? filteredTasks.map((task: Task) => <TaskCard task={task} key={task.id} />) :
          <p className='m-auto p-20 text-gray-600'>No Tasks Found! 📝✒️</p>
      )}
    </div>
  );
}

export default ToDoApp;

// Loader function to fetch tasks based on section parameter
export const loader = async ({ params }: { params: Params<"section"> }): Promise<Task[]> => {
  const tasks = await getTasks(params.section);
  return tasks;
};