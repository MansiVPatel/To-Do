import React from "react";


export default function PrintTodo(props) {
    let Heading = props.categoryPrint + "heading" ;
    let Collapse = props.categoryPrint+ "collapse";
    return (
        <div class="accordion-item">
            <h2 class="accordion-header " id={Heading}>
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + Collapse} aria-expanded="true" aria-controls={Collapse}>
                    {props.categoryPrint}
                </button>
            </h2>
            <div id={Collapse} class="accordion-collapse collapse" aria-labelledby={Heading} data-bs-parent={"#"+ props.id}>
                <div class="accordion-body">
                    {props.Todo} 
                    
                </div>
            </div>
        </div>


    )
}