# simple-dnd

> Turn any element into draggable, transfer data easily to dropzone

[![NPM](https://img.shields.io/npm/v/simple-dnd.svg)](https://www.npmjs.com/package/simple-dnd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save simple-dnd
```

## Usage


```tsx
//Card.tsx
import { useSimpleDnD } from 'simple-dnd';
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
```

```tsx

//DropArea.tsx
import { useSimpleDnD } from 'simple-dnd';
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
