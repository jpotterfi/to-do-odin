import './css/style.css';
import './css/ToDoTaskFormstyle.css'
import './css/AddTaskButtonstyle.css'
import './css/projectModal.css'
import './css/rightContentstyle.css'
import './css/editTaskListingstyle.css'



import { createAddTaskButton } from './javascript/createAddTaskButton';
import { createNewProject } from './javascript/createNewProject';
import { localStorageToTaskArray, localStorageToProjectArray, localStorageToCombinedArray } from './javascript/localStorageToArray'
import { renderProjectHeadings, renderProjectPage } from './javascript/renderProjects'
import { setFolder, getFolder } from './javascript/setFolder'
import { differenceInDays } from 'date-fns'
import { startOfToday } from 'date-fns'
import { sortArray } from './javascript/sortArray';
import { setSort } from './javascript/currentSort';


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

    let project = projectFactory("project", "Inbox", "An inbox of tasks for all your projects. To create a task for a specific project, first navigate to the chosen project by clicking its name at the top of the screen.", localStorage.length)
    project = JSON.stringify(project);
    localStorage.setItem("0", project);
    project = projectFactory("project", "Example Project", "An example project. You can customize me by clicking my title and description.", localStorage.length)
    project = JSON.stringify(project);
    localStorage.setItem("1", project);
    
}

//set inbox as initial project

//createAddTaskButton();
createNewProject();
renderProjectHeadings();
renderProjectPage("Inbox");

console.log(localStorageToTaskArray())

console.log(localStorageToProjectArray())


//console.log("alpha" > "b");
//setSort("alpha");
//console.table(sortArray());


/*
let today = startOfToday();
        let combinedArray = localStorageToCombinedArray();
        const sorted = combinedArray.sort(function(a,b){
            if (a.type == "task" && b.type == "task"){
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);
                let differenceA = differenceInDays(today, dateA);
                let differenceB = differenceInDays(today, dateB);
                if (differenceA > differenceB){
                    return -1
                } else {
                    return 1
                }
            }

        });
        console.log(combinedArray);
        console.log(sorted)
*/



/*
let dateA = new Date(2020, 5, 1);
let dateB = new Date(2020, 2, 1);
let today = startOfToday();

let taskArray = localStorageToTaskArray();
for (let i = 0; i < taskArray.length; i ++){
    dateB = taskArray[i].date
    console.log(differenceInDays(today, dateB))
}

console.log(differenceInDays(today, dateB))
*/



/*
let rightContent = document.getElementById("right-content");

let arr = ["jeremy", "29", "luna", "28", "seth", "30"];

let newArr = JSON.stringify(arr);


localStorage.setItem("1", JSON.stringify(arr))

let parse = localStorage.getValue()
*/