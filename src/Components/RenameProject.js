import React, { useContext, useState } from "react";
import  ProjectForm from './ProjectForm';
import firebase from "../Firebase";
import { TodoContext } from "../Context";

function RenameProject({project, setShowModal}){
    const [newProjectName, setNewProjectName] = useState(project.name)
    const {selectedProject, setSelectedProject} = useContext(TodoContext)

    const renameProject = (project, newProjectName) => {
        const projectRef = firebase.firestore().collection('projects')
        const todoRef = firebase.firestore().collection('todos')
        const {name: oldProjectName} = project

        projectRef
        .where('name', '==', newProjectName)
        .get()
        .then(querySnapshot => {
            if(!querySnapshot.empty) {
                alert("Project with the same name already exists!")
            } else {
                projectRef
                .doc(project.id)
                .update(
                    {
                        name: newProjectName
                    }
                )
                .then(() => {
                    todoRef
                    .where('project','==',oldProjectName)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            doc.ref.update(
                                {
                                    project: newProjectName
                                }
                            )
                        })
                    })
                    .then(() => {
                        if(selectedProject === oldProjectName){
                            setSelectedProject(newProjectName)
                        }
                    })
                })
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        renameProject(project, newProjectName)
        setShowModal(false)
    }
    
    return(
        <div className="RenameProject">
            <ProjectForm handleSubmit={handleSubmit} heading='Edit Project name' value={newProjectName} setValue={setNewProjectName} setShowModal={setShowModal} confirmButtonText='Confirm' />

        </div>
    )
}

export default RenameProject