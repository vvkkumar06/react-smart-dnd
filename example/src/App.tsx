import React, { useState } from 'react'

import { useSimpleDnD } from 'simple-dnd';
const tasksData = [{
  id: 1,
  name: 'task-1'
},{
  id: 2,
  name: 'task-2'
},{
  id: 3,
  name: 'task-3'
}
]

const App = () => {
  const [dragTasks, setDragTasks] = useState(tasksData)
  const onDataChange =(data: any) => {
    const updatedTasks = dragTasks.filter((t: any) => t.id !== data.id);
    setDragTasks(updatedTasks);
  }

  return (
    <div className='App'>
      <section id="draggables" >
        {
          dragTasks.map((task: any) => (
            <Card data={task} key={task.id}/>
          ))
        }
      </section>

      <DropArea onDataChange={onDataChange}/>
    </div>
  )
}






const Card = ({ data }: any) => {
  const { Draggable } = useSimpleDnD({});

  return (
    <Draggable id={data.id} data={{task: JSON.stringify(data)}}>
      <section className="card">
        {data.name}
      </section>
    </Draggable>
  )
}



const DropArea = ({onDataChange}: any) => {
  const [tasks, setTasks] = useState([] as any)


  const { Dropzone } = useSimpleDnD({
    onDrop: (data: any, dropzoneId: any) => {
      const task = JSON.parse(data.task);
      console.log(task, dropzoneId);

      // Remove item from original list
      onDataChange(task);
      
      // // Add to dropzone
      const newTasks = [...tasks, task]
      setTasks(newTasks);
    },
    dataNames: ['task']
  });

  return (
    <Dropzone id="drop-id-1" >

      <section className="drop-area">
        {
          tasks.length ? tasks.map((task: any) => (
            <section className="card" key={task.id}>
              {task.name}
            </section>
          )) : "Simple Drop"
        }
      </section>
    </Dropzone>
  )
}






export default App
