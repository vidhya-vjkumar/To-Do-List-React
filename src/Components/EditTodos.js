import React, {useContext, useEffect, useState} from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from "../Context";
import moment from "moment";
import firebase from "../Firebase";

function EditTodos(){{
    const {selectedTodo, projects} = useContext(TodoContext)
    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [todoProject, setTodoProject] = useState('')

    useEffect(() => {
        if(selectedTodo){
            setText(selectedTodo.text)
            setDay(moment(selectedTodo.date, 'DD/MM/YYYY'))
            setTime(moment(selectedTodo.time, 'hh:mm A'))
            setTodoProject(selectedTodo.project)
        }
    }, [selectedTodo])

    useEffect(() => {
        if(selectedTodo){
            firebase
            .firestore()
            .collection('todos')
            .doc(selectedTodo.id)
            .update(
                {
                    text,
                    date: moment(day).format('DD/MM/YYYY'),
                    day: moment(day).format('d'),
                    time: moment(time).format('hh:mm A'),
                    project: todoProject
                }
            )
        }
    }, [text, day, time, todoProject])

    function handleSubmit(e){

    }

    return(
        <div>
            {
                selectedTodo &&
            
                <div className="EditTodos">
                    <div className="header">Edit Todo</div>
                        <div className="container">
                            <TodoForm 
                                handleSubmit={handleSubmit} 
                                text={text} 
                                setText={setText} 
                                day={day}
                                setDay={setDay}
                                time={time}
                                setTime={setTime}
                                projects={projects}
                                todoProject={todoProject}
                                setTodoProject={setTodoProject}
                                
                            />
                        </div>
                </div>
            }
        </div>
        
    )
}}

export default EditTodos