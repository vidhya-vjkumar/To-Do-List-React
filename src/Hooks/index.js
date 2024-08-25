import { useEffect, useState } from "react";
import firebase from "../Firebase";
import moment from "moment";

export function useTodos(){
    const [todos, setTodos] = useState([])

    useEffect(() => {
        let unsubscribe = firebase
                            .firestore()
                            .collection("todos")
                            .onSnapshot(snapshot => {
                                const data = snapshot.docs.map(doc => {
                                    return {
                                        id: doc.id,
                                        ...doc.data()
                                    }
                                })
                                setTodos(data)
                            })
        return () => unsubscribe()
    }, [])
    return todos
}



export function useProjects(){
    const [projects, setProjects] = useState([])

    useEffect(() => {
        let unsubscribe = firebase
                            .firestore()
                            .collection("projects")
                            .onSnapshot(snapshot => {
                                const data = snapshot.docs.map(doc => {
                                    
                                    return {
                                        id: doc.id,
                                        name: doc.data().name                                        
                                    }
                                })
                                setProjects(data)
                            })
        return () => unsubscribe()

    }, [])
    return projects
}

export function useFilterTodos(todos, selectedProject){
    const [filteredTodos, setFilteredTodos] = useState([])

    useEffect(() => {
        let data
        const todayDateFormatted = moment().format('DD/MM/YYYY')

        if(selectedProject === 'Today'){
            data = todos.filter(todo => todo.date === todayDateFormatted)
        } else if(selectedProject === 'Next 7 Days'){
            data = todos.filter(todo => {
                const todoDate = moment(todo.date, 'DD/MM/YYYY')
                const todayDate = moment(todayDateFormatted, 'DD/MM/YYYY')

                const diffDays = todoDate.diff(todayDate, 'days')
                return diffDays >= 0 && diffDays < 7
            })
        } else if (selectedProject === 'All'){
            data = todos
        } else {
            data = todos.filter(todo => todo.project === selectedProject)
        }
        setFilteredTodos(data)
    }, [todos, selectedProject])

    return filteredTodos
}


export function useProjectsWithStats(todos, projects){

    const [projectsWithStats, setProjectWithStats] = useState([])

    useEffect(() => {
        const data = projects.map((project) => {
            return (
                {
                    numOfTodos: todos.filter(todo => todo.project === project.name && !todo.checked).length,
                    ...project
                }
            )
        })
        setProjectWithStats(data)

    }, [todos, projects])

    return projectsWithStats
}