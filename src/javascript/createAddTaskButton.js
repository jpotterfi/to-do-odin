import { createToDoTaskForm } from './createToDoTaskForm';

function createAddTaskButton() {
    let addTaskButton = document.createElement("div");
    addTaskButton.id = "addTaskButton";

    addTaskButton.addEventListener("click", function (){
        rightContent.innerHTML = "";
        createToDoTaskForm();
    });


    let rightContent = document.getElementById("right-content");
    rightContent.appendChild(addTaskButton);
}

export {
    createAddTaskButton
}