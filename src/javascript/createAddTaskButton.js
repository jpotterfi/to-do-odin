import { createToDoTaskForm } from './createToDoTaskForm';

function createAddTaskButton() {
    let addTaskButton = document.createElement("div");
    addTaskButton.id = "addTaskButton";
    addTaskButton.innerText = "New Task +";

    addTaskButton.addEventListener("click", function (){
        addTaskButton.remove();
        createToDoTaskForm();
    });


    let rightContent = document.getElementById("right-content");
    rightContent.appendChild(addTaskButton);
}

export {
    createAddTaskButton
}