import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void

}

function AddItemForm(props: AddItemFormType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (newTaskTitle.trim() === "") {
                setError("Title is Required")
                return;
            }
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is Required")

            return
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("")
    }

    return (
        <div >
            <TextField value={newTaskTitle}
                       label={"Type value"}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       variant={'outlined'}
                       size={"small"}
                       error={!!error}
                       helperText={error}
            />
            <IconButton color="primary" onClick={addTask}><ControlPoint/></IconButton>
        </div>
    );
}

export default AddItemForm;