import React from "react";
import "./styles/List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = (props) => {
       return (
           <div className="list" key={props.task.id}>
               <p>
                   <span
                       style={{
                           textDecoration: props.isCompleted ? "line-through" : ""
                       }}
                       onClick={() => props.complete(props.task.id)}
                   >
                       {props.task.value}
                   </span>
                   <span id="icons">
                       <FontAwesomeIcon
                           className="fa-icons"
                           icon="pen"
                           onClick={() => props.update(props.task)}
                       />
                        <FontAwesomeIcon
                            className="fa-icons"
                            icon="trash-alt"
                            onClick={() => props.delete(props.task.id)}
                        />
                   </span>
               </p>
           </div>
       )
};

export default List