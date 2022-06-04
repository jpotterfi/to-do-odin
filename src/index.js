import './css/style.css';
import './css/ToDoTaskFormstyle.css'
import './css/AddTaskButtonstyle.css'
import './css/projectModal.css'



import { createAddTaskButton } from './javascript/createAddTaskButton';
import { createNewProject } from './javascript/createNewProject';
import { localStorageToTaskArray, localStorageToProjectArray } from './javascript/localStorageToArray'
import { renderProjectHeadings, renderProjectPage } from './javascript/renderProjects'
import { setFolder, getFolder } from './javascript/setFolder'

let inboxFolder = document.getElementById("inboxHeader");
inboxFolder.addEventListener("click", function(){
    setFolder("inbox");
    console.log("current folder is " + getFolder());
});

createAddTaskButton();
createNewProject();
renderProjectHeadings();
renderProjectPage("inbox");

console.log(localStorageToTaskArray())

console.log(localStorageToProjectArray())



/*
let rightContent = document.getElementById("right-content");

let arr = ["jeremy", "29", "luna", "28", "seth", "30"];

let newArr = JSON.stringify(arr);


localStorage.setItem("1", JSON.stringify(arr))

let parse = localStorage.getValue()
*/