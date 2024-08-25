import React, {createContext, useState} from "react";
import {useTodos, useProjects, useFilterTodos, useProjectsWithStats} from '../Hooks'

const TodoContext = createContext()

function TodoContextProvider({children}) {
    const defaultProject = 'Today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = useState(undefined)

    const todos = useTodos()
    const projects = useProjects(todos)
    const filteredTodos = useFilterTodos(todos, selectedProject)
    const projectsWithStats = useProjectsWithStats(todos, projects)

    return(
        <TodoContext.Provider value={
            {
                defaultProject,
                selectedProject,
                setSelectedProject,
                selectedTodo,
                setSelectedTodo,
                todos: filteredTodos,
                projects: projectsWithStats,
            }
        }>
            {children}
        </TodoContext.Provider>
    )
}
export { TodoContextProvider, TodoContext }