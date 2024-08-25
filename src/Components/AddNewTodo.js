import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import {TodoContext} from '../Context'
import firebase from "../Firebase";
import randomColor from "randomcolor";
import moment from "moment";
import { calendarItems } from "../constants";

function AddNewTodo(){
    const {projects, selectedProject} = useContext(TodoContext)
    const [showModal, setShowModal] = useState(false)
    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [todoProject, setTodoProject] = useState(selectedProject)


    function handleSubmit(e) {
        e.preventDefault()
        if(text && !calendarItems.includes(todoProject)){
            firebase
                .firestore()
                .collection('todos')
                .add(
                    {
                        text: text,
                        date: moment(day).format('DD/MM/YYYY'),
                        day: moment(day).format('d'),
                        time: moment(time).format('hh:mm A'),
                        project: todoProject,
                        checked: false,
                        color: randomColor({luminosity: 'dark'})
                        
                    }
                )
            setShowModal(false)
            setText("")
            setTime(new Date())
            setDay(new Date())
                
        }
    }

    useEffect(() => {
        setTodoProject(selectedProject)
    }, [selectedProject] )

    return(
        <div className="AddNewTodo">
            <div className="btn">
                <button onClick={() => setShowModal(true)}>
                    + New Todo
                </button>

            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm
                    handleSubmit={handleSubmit}
                    heading='Add new to do'
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                    showButtons={true}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>
    )
}

export default AddNewTodo