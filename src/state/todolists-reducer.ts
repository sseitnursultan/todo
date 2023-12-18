import {ToDoListType} from "../App";
import {v1} from "uuid";
import {FilterValuesType} from '../App'


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId:string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export type ActionType =
    AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todolistsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                filter: 'all',
                title: action.title
            }]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            const todoLists = state.find(tl => tl.id === action.id)
            if (todoLists) {
                todoLists.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let toDoList = state.find(tl => tl.id === action.id)
            if (toDoList) {
                toDoList.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error("New Error")
    }


}


export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodoListAC = (title: string,): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title,todolistId:v1()}
}

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}