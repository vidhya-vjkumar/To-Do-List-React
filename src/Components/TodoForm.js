import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";

function TodoForm({handleSubmit, heading=false, text, setText, day, setDay, time, setTime, todoProject, setTodoProject, projects, showButtons=false, setShowModal=false}){
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit} className="TodoForm">
                <div className="text">
                    {
                        heading && <h3>{heading}</h3>
                    }
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="To Do..." autoFocus />
                </div>
                <div className="remind">
                    <Bell />
                    <p>Remind Me</p>
                </div>
                <div className="day-picker">
                    <div className="title">
                        <CalendarDay />
                        <p>Choose a day</p>
                    </div>
                    <DatePicker value={day} onChange={day => setDay(day)} />
                </div>
                <div className="time-picker">
                    <div className="title">
                        <Clock />
                        <p>Choose time</p>
                    </div>
                    <TimePicker value={time} onChange={time => setTime(time)} />
                </div>
                <div className="project-picker">
                    <div className="title">
                        <Palette />
                        <p>Choose a project</p>
                    </div>
                    <div className="projects">
                        {
                            projects.length > 0 ?

                            projects.map(project => 
                                <div className={`project ${project.name === todoProject ? "active" : ""}`} onClick={() => setTodoProject(project.name)} key={project.id}>{project.name}</div>
                            )

                            :
                            <div style={{color: "red"}}>
                                Please add a project before proceeding!
                            </div>
                        }
                    </div>
                </div>
                {
                    showButtons && 
                    <div>
                        <div className="cancel" onClick={() => setShowModal(false)}>
                            <X size='40' />
                        </div>
                        <div className="confirm">
                            <button>+ Add to do</button>
                        </div>
                    </div>
                }
            </form>
        </LocalizationProvider>
    )
}

export default TodoForm