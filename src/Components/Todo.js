import React, { useContext, useState } from "react";
import { CheckCircleFill, Circle, Trash, ArrowClockwise } from "react-bootstrap-icons";
import firebase from "../Firebase";
import moment from "moment";
import { TodoContext } from "../Context";
import { useSpring, useTransition, animated } from "react-spring";

function Todo({todo}){
    
    const [hover, setHover] = useState(false)
    const {selectedTodo, setSelectedTodo} = useContext(TodoContext)

    const handleDelete = (todo) => {
        deleteTodo(todo)
        if(selectedTodo === todo){
            setSelectedTodo(false)
        }
    }

    const deleteTodo = (todo) => {
        firebase
        .firestore()
        .collection('todos')
        .doc(todo.id)
        .delete()
    }

    const checkTodo = (todo) => {
        firebase
        .firestore()
        .collection('todos')
        .doc(todo.id)
        .update(
            {
                checked: !todo.checked
            }
        )
    }

    const repeatNextDay = (todo) => {
        const nextDayDate = moment(todo.date, 'DD/MM/YYYY').add(1,'days')
        const repeatedTodo = {
            ...todo,
            checked: false,
            date: nextDayDate.format('DD/MM/YYYY'),
            day: nextDayDate.format('d')
        }
        delete repeatedTodo.id

        firebase
        .firestore()
        .collection('todos')
        .add(repeatedTodo)
    }


    const fadeIn = useSpring({
        from : {marginTop : '-12px', opacity : 0 },
        to : {marginTop : '0px', opacity : 1}
    })

    const checkTransitions = useTransition(todo.checked, {
        from : {position : 'absolute', transform : 'scale(0)' },
        enter : {transform : 'scale(1)' },
        leave : {transform : 'scale(0)' }
    })
    return(
        <animated.div style={fadeIn} className="Todo">
            <div className="todo-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                <div className="check-todo" onClick={() => checkTodo(todo)}>
                    {
                        checkTransitions((props, checked) =>
                            checked ? 
                            <animated.span style={props} className="checked">
                                <CheckCircleFill color="#bebebe" />
                            </animated.span>
                            :
                            <animated.span style={props} className="unchecked">
                                <Circle color={todo.color} />
                            </animated.span>
                        )
                    
                    }
                </div>
            
            
                <div className="text" onClick={() => setSelectedTodo(todo)}>
                    <p style={{color: todo.checked ? '#bebebe' : '#000'}}>{todo.text}</p>
                    <span>{todo.date} - {todo.time} - {todo.project}</span>
                    <div className={`line ${todo.checked ? 'line-through' : ''}` }></div>
                </div>
                <div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
                    {
                        todo.checked &&
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div className="delete-todo" onClick={() => handleDelete(todo)}>
                    {
                        (hover || todo.checked) && 
                        <span>
                            <Trash />
                        </span>
                    }
                </div>
            </div>
        </animated.div>
    )
}

export default Todo