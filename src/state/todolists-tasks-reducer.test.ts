import {taskStateType, ToDoListType} from "../App";
import {addTodoListAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equal',()=>{

    const startTasksState:taskStateType = {}
    const startTodoListsState:Array<ToDoListType> = []


    const action = addTodoListAC('new todoList')

    const endTasksState = tasksReducer(startTasksState,action)
    const endTodoListsState = todolistsReducer(startTodoListsState,action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodoLists).toBe(action.todolistId)
})