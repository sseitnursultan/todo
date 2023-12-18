
import {taskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType =  {
    type: 'REMOVE-TASK',
    todoListId:string,
    taskId:string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title:string,
    todoListId:string
}

export type changeTaskStatusActionType = {
    type:'CHANGE-TASK-STATUS'
    taskId:string
    isDone:boolean
    todoListId:string
}

export type changeTaskTitleActionType = {
    type:'CHANGE-TASK-TITLE'
    taskId:string
    title:string
    todoListId:string
}


export type ActionType = RemoveTaskActionType | AddTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: taskStateType, action: ActionType): taskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t=>t.id!==action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            let stateCopy = {...state}
            let newTask = {id: v1(), title: action.title, isDone: false}
            let tasks = stateCopy[action.todoListId]
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS' : {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todoListId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todoListId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST':{
            const copyState = {...state}
            copyState[action.todolistId] = []

            return copyState
        }
        case 'REMOVE-TODOLIST':{
            const copyState = {...state}
            delete copyState[action.id]

            return copyState
        }

        default:
            throw new Error("New Error")
    }
}

export const removeTaskAC = (taskId:string,todolistId:string):RemoveTaskActionType => {
    return {type:'REMOVE-TASK',todoListId:todolistId,taskId:taskId}
}

export const addTaskAC = (title:string,todoListId:string):AddTaskActionType => {
    return {type:'ADD-TASK',title:title,todoListId:todoListId}
}
export const changeTaskStatusAC = (taskId:string,isDone:boolean,todoListId:string):changeTaskStatusActionType => {
    return {type:'CHANGE-TASK-STATUS',taskId:taskId,isDone:isDone,todoListId:todoListId}
}

export const changeTaskTitleAC = (taskId:string,title:string,todoListId:string):changeTaskTitleActionType => {
    return {type:'CHANGE-TASK-TITLE',taskId:taskId,title,todoListId:todoListId}
}

