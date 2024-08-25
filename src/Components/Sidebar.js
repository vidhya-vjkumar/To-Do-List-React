import React, { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../Context";

function Sidebar({children}){
    const sidebarRef = useRef()
    const {setSelectedTodo} = useContext(TodoContext)
    
    const handleClick = e => {
        if(e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){
            setSelectedTodo(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
        
    }, [])
    
    return (
        <div className="Sidebar" ref={sidebarRef}>
            {children}
        </div>
    )
}

export default Sidebar