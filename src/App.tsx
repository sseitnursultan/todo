import React, {useState} from 'react';
import {TodoList, TasksType} from './TodoList';
import './App.css';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValuesType = "all" | "active" | "completed"
export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


 export type taskStateType = {
    [key: string]: Array<TasksType>
}


function App() {


    let todoListId1 = v1();
    let todoListId2 = v1()

    let [ToDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: todoListId1, title: "What to buy", filter: "all"},
        {id: todoListId2, title: "What to Plan", filter: "all"}
    ])

    let [tasksObj, setTasks] = useState<taskStateType>({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "js", isDone: false},
            {id: v1(), title: "HTML", isDone: true},],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Water", isDone: true},
        ]
    })



    function changeFilter(value: FilterValuesType, toDoListId: string) {
        let toDoList = ToDoLists.find(tl => tl.id === toDoListId)
        if (toDoList) {
            toDoList.filter = value
            setToDoLists([...ToDoLists])
        }

    }

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter((t) => {
            return t.id !== id
        })
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newValue
            setTasks({...tasksObj})
        }
    }

    function changeToDoListTitle(todoListId: string, newTitle: string) {
        const todoLists = ToDoLists.find(tl => tl.id === todoListId)
        if (todoLists) {
            todoLists.title = newTitle
            setToDoLists([...ToDoLists])
        }
    }

    function addTodoList(title: string) {
        let todoList: ToDoListType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setToDoLists([todoList, ...ToDoLists])
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = ToDoLists.filter(tl => tl.id !== todoListId)
        setToDoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    return (

        <div className="App">

            <AppBar position={'static'}>

                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={(title) => {
                        addTodoList(title)
                    }}/>
                </Grid>
                <Grid container spacing={3}>
                    {ToDoLists.map((tl) => {

                        let tasksForToDoList = tasksObj[tl.id];
                        if (tl.filter === "completed") {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
                        }
                        if (tl.filter === "active") {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
                        }


                        return <Grid item>
                            <Paper style={{padding: "3px 10px"}}>
                                <TodoList
                                    id={tl.id}
                                    key={tl.id}
                                    tasks={tasksForToDoList}
                                    title={tl.title}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeToDolistTitle={changeToDoListTitle}
                                />
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
 