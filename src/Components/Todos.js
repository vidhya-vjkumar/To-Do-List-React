import React, { useContext } from "react";
import Todo from "./Todo";
import Next7Days from "./Next7Days";
import { TodoContext } from "../Context";

function Todos(){
    const {todos, selectedProject} = useContext(TodoContext)
    
    return(
        <div className="Todos">
            <div className="selected-project">
                {selectedProject}
            </div>
            <div className="todos">
                {
                    selectedProject === "Next 7 Days" ?
                    <Next7Days todos={todos} />
                    :
                    todos.map(todo => 
                        <Todo todo={todo} key={todo.id} />
                    )
                }
            </div>
        </div>
    )
}

export default Todos 