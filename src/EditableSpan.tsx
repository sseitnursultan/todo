import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type editableSpanPropsTypes = {
    title: string,
    onChange:(newValue:string)=>void
}

export function EditableSpan(props: editableSpanPropsTypes) {
    let [editMode,setEditMode]=useState(false)
    let [title,setTitle] = useState(props.title)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {setEditMode(true)}
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    return editMode
        ? <TextField
            onChange={onChangeHandler}
            autoFocus
            onBlur={activateViewMode}
            value={title}

        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}