import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from 'uuid'
import {FilterValuesType, ToDoListType} from "../App";
import {useState} from "react";

test('correct todolist should be removed', () => {

    let todoListId1 = v1();
    let todoListId2 = v1()

    let startState: Array<ToDoListType> = [
        {id: todoListId1, title: "What to buy", filter: "all"},
        {id: todoListId2, title: "What to Plan", filter: "all"}
    ]

    let endState = todolistsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)

})

test('correct todolist should be added', () => {

    let todoListId1 = v1();
    let todoListId2 = v1()

    let newTitle = "What you Buying?"

    let startState: Array<ToDoListType> = [
        {id: todoListId1, title: "What to buy", filter: "all"},
        {id: todoListId2, title: "What to Plan", filter: "all"}
    ]

    let endState = todolistsReducer(startState, addTodoListAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
    expect(endState[2].filter).toBe("all")
})


test('correct todolist should change title', () => {

    let todoListId1 = v1();
    let todoListId2 = v1()

    let newTitle = "What you Buying?"

    let startState: Array<ToDoListType> = [
        {id: todoListId1, title: "What to buy", filter: "all"},
        {id: todoListId2, title: "What to Plan", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as any,
        id: todoListId2,
        title: newTitle
    }

    const endState = todolistsReducer(startState, changeTodoListTitleAC(todoListId2, newTitle))

    expect(endState[0].title).toBe("What to buy")
    expect(endState[1].title).toBe(newTitle)

})

test('correct todolist should change filter', () => {
    let todoListId1 = v1();
    let todoListId2 = v1()

    let newFilter = "completed" as FilterValuesType

    let startState: Array<ToDoListType> = [
        {id: todoListId1, title: "What to buy", filter: "all"},
        {id: todoListId2, title: "What to Plan", filter: "all"}
    ]

    const action = {
        type: "CHANGE-TODOLIST-FILTER" as any,
        id: todoListId2,
        filter: newFilter,
    }

    let endState = todolistsReducer(startState, changeTodoListFilterAC(todoListId2, newFilter))


    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].filter).toBe('all')
})