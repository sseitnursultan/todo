import {useState} from "react";
import {v1} from "uuid";
import {taskStateType} from "../App";
import {todolistsReducer, addTodoListAC, removeTodoListAC} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";


test('correct task should remove task', () => {

    let startState: taskStateType = {
        "todoListId1": [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "js", isDone: false},
            {id: '3', title: "HTML", isDone: true},],
        "todoListId2": [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Water", isDone: true},
        ]
    }

    const action = removeTaskAC('2', "todoListId2")

    let endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t=>t.id!=='2')).toBeTruthy()

})


test('correct task should add task',()=>{

    let startState: taskStateType = {
        "todoListId1": [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "js", isDone: false},
            {id: '3', title: "HTML", isDone: true},],
        "todoListId2": [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Water", isDone: true},
        ]
    }

    const newTitle = 'Hello'

    const action = addTaskAC(newTitle,'todoListId2')

    const endState = tasksReducer(startState,action)


    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe(newTitle)

})

test('correct task should change status',()=>{

    let startState: taskStateType = {
        "todoListId1": [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "js", isDone: false},
            {id: '3', title: "HTML", isDone: true},],
        "todoListId2": [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Water", isDone: true},
        ]
    }

    const action  = changeTaskStatusAC('2',true,'todoListId2')

    const endState = tasksReducer(startState,action)

    expect(endState['todoListId2'][1].isDone).toBe(true)
    expect(endState['todoListId1'][1].isDone).toBe(false)


})

test('title of specified task should be changed',()=>{

    let startState: taskStateType = {
        "todoListId1": [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "js", isDone: false},
            {id: '3', title: "HTML", isDone: true},],
        "todoListId2": [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Water", isDone: true},
        ]
    }

    const action  = changeTaskTitleAC('2','Молоко','todoListId2')

    const endState = tasksReducer(startState,action)

    expect(endState['todoListId2'][1].title).toBe('Молоко')
    expect(endState['todoListId1'][1].title).toBe('js')

})


test('new property with new array should be added when new todolist is added',()=>{
    let startState: taskStateType = {
        "todoListId1": [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "js", isDone: false},
            {id: '3', title: "HTML", isDone: true},],
        "todoListId2": [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Water", isDone: true},
        ]
    }

    const action = addTodoListAC('title no matter')
    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2' )
    if(!newKey){
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])

})


test('property with todolistId should be deleted',()=>{

    const  startState: taskStateType = {
        "todoListId1": [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "js", isDone: false},
            {id: '3', title: "HTML", isDone: true},],
        "todoListId2": [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Water", isDone: true},
        ]
    }

    const action = removeTodoListAC('todoListId2')
    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).toBeUndefined()


})
