import { localStorageToCombinedArray, localStorageToProjectArray } from "./localStorageToArray";
import { renderProjectPage } from "./renderProjects";
import { getFolder } from "./setFolder";
import { writeToLocalStorage } from "./writeToLocalStorage";

function createEditTaskNameInputField(position, taskName){
    console.log("taskListingName" + position)
    let combinedArray = localStorageToCombinedArray();
    let previousField = document.getElementById("taskListingName" + position);
    previousField.remove(); //works!
    let taskListingLeftContainer = document.getElementById("taskListingLeftContainer" + position)
    
    let editTaskNameBox = document.createElement("div");
    editTaskNameBox.className = "editTaskNameBox"
    let editTaskNameInputField = document.createElement("input");
    editTaskNameInputField.className = "editTaskNameInputField";
    editTaskNameInputField.value = taskName;
    
    editTaskNameBox.appendChild(editTaskNameInputField);

    let editConfirm = document.createElement("div");
    editConfirm.className = "editConfirm";
    editConfirm.id = position;
    let editDeny = document.createElement("div");
    editDeny.className = "editDeny";
    editDeny.id = position;

    

    //event listeners
    editConfirm.addEventListener("click", function(){
        let newName = editTaskNameInputField.value;
        combinedArray[position].changeTaskName(newName);
        console.log(combinedArray[position].task)
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
    })

    //event listeners

    editTaskNameBox.appendChild(editConfirm);
    editTaskNameBox.appendChild(editDeny);

    taskListingLeftContainer.appendChild(editTaskNameBox);
}

function createEditFolderInputField(position, storedFolder){
    let projectArray = localStorageToProjectArray();
    let previousField = document.getElementById("taskListingFolder" + position);
    previousField.remove(previousField);
    let taskListingLeftContainer = document.getElementById("taskListingLeftContainer" + position);
    let folderDropDown = document.createElement("select");
    folderDropDown.className = "folderDropDown";

    let originalFolder = document.createElement("option");
    originalFolder.value = storedFolder;
    originalFolder.innerText = storedFolder;
    folderDropDown.appendChild(originalFolder);

    for (let i = 0; i < projectArray.length; i ++) {
        if (projectArray[i].projectName != storedFolder) {
        let projectName = document.createElement("option");
        projectName.value = projectArray[i].projectName;
        projectName.innerText = projectArray[i].projectName;
        folderDropDown.appendChild(projectName);
        }
    }
    folderDropDown.addEventListener("change", function(){
        let combinedArray = localStorageToCombinedArray();
        console.log(this.value);
        combinedArray[position].changeTaskFolder(this.value);
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
    })
    taskListingLeftContainer.appendChild(folderDropDown);
}

function createEditDateInputField(position) {
    let rightContainerBox = document.getElementById("taskListingRightContainer" + position);
    let previousField = document.getElementById("taskListingDueTime" + position);
    let combinedArray = localStorageToCombinedArray();
    console.log(combinedArray[position].date)
    previousField.remove();
    let editDateField = document.createElement("input");
    editDateField.type = "date";
    editDateField.id = "editDateField" + position;
    editDateField.className = "editDateField"
    editDateField.name = "editDateField";
    editDateField.value = combinedArray[position].date;
    editDateField.min = "2022-05=30";
    editDateField.max = "2025-12-31";
    editDateField.addEventListener("change", function(){
        combinedArray[position].changeTaskDate(this.value);
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
    })

    rightContainerBox.appendChild(editDateField);
}

export {
    createEditTaskNameInputField,
    createEditFolderInputField,
    createEditDateInputField
}