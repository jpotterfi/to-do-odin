import './css/style.css';
import './css/ToDoTaskFormstyle.css'
import './css/AddTaskButtonstyle.css'
import './css/projectModal.css'
import './css/rightContentstyle.css'



import { createAddTaskButton } from './javascript/createAddTaskButton';
import { createNewProject } from './javascript/createNewProject';
import { localStorageToTaskArray, localStorageToProjectArray } from './javascript/localStorageToArray'
import { renderProjectHeadings, renderProjectPage } from './javascript/renderProjects'
import { setFolder, getFolder } from './javascript/setFolder'

let inboxFolder = document.getElementById("inboxHeader");
inboxFolder.addEventListener("click", function(){
    setFolder("Inbox");
    console.log("current folder is " + getFolder());
    renderProjectPage("Inbox");
});


//set inbox as initial project

if (localStorage.length < 1){
    const projectFactory = (type, projectName, projectDescription, position) => {
        type =  type;
        projectName = projectName;
        projectDescription = projectDescription
        position = position;
        return {type, projectName, projectDescription, position};
      } 

    let project = projectFactory("project", "Inbox", "An inbox of tasks for all projects.", localStorage.length)
    project = JSON.stringify(project);
    localStorage.setItem("0", project);
}

//set inbox as initial project

//createAddTaskButton();
createNewProject();
renderProjectHeadings();
renderProjectPage("Inbox");

console.log(localStorageToTaskArray())

console.log(localStorageToProjectArray())



/*
let rightContent = document.getElementById("right-content");

let arr = ["jeremy", "29", "luna", "28", "seth", "30"];

let newArr = JSON.stringify(arr);


localStorage.setItem("1", JSON.stringify(arr))

let parse = localStorage.getValue()
*/