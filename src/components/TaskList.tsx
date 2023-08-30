import React from 'react';
import DailyTask from '../components/DailyTask';

interface TaskListProps {
  tasks: List[];
}

interface List {
    id: string,
    taskName: string,
    taskDescription: string,
    proofInstructions: string,
    image:string
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="mt-2 task-list flex justify-center  flex-wrap -mx-1 lg:-mx-4">
      {tasks.map((task, index) => (
        <DailyTask key={index} id={task.id} imageDef={task.image} taskName={task.taskName} taskDescription={task.taskDescription} proofInstructions={task.proofInstructions} />
      ))}
    </div>
  );
};

export default TaskList;
