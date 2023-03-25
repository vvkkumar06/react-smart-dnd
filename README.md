# react-smart-dnd

> Turn any element into draggable, transfer data easily to dropzone


## Install

```bash
npm install --save react-smart-dnd
```

## [Demo](https://gilded-dieffenbachia-67ae76.netlify.app)

## Usage


```tsx
//Card.tsx
import { useSmartDnd } from 'react-smart-dnd';
const Card = ({ data }: any) => {
  const { Draggable } = useSmartDnd({});

  return (
    <Draggable id={data.id} data={{task: JSON.stringify(data)}}>
      <section className="card">
        {data.name}
      </section>
    </Draggable>
  )
}
```

```tsx

//DropArea.tsx
import { useSmartDnd } from 'react-smart-dnd';
const DropArea = ({onDataChange}: any) => {
  const [tasks, setTasks] = useState([] as any)


  const { Dropzone } = useSmartDnd({
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
          )) : "Smart Drop"
        }
      </section>
    </Dropzone>
  )
}
```

```tsx
//App.tsx
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
```

## License

MIT © [vvkkumar06](https://github.com/vvkkumar06)
