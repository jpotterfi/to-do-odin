import isValid from "date-fns/isValid";
import { startOfToday, formatISO } from "date-fns";
import { localStorageToCombinedArray, localStorageToProjectArray } from "./localStorageToArray";
import { renderProjectHeadings, renderProjectPage } from "./renderProjects";
import { getFolder, setFolder } from "./setFolder";
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
    

    editTaskNameInputField.addEventListener("change", function(){
        let newName = editTaskNameInputField.value;
        combinedArray[position].changeTaskName(newName);
        console.log(combinedArray[position].task)
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
    })

    editTaskNameInputField.addEventListener("focusout", function(){
        renderProjectPage(getFolder());
    })


    editTaskNameBox.appendChild(editTaskNameInputField);

    /*
    let editConfirm = document.createElement("div");
    editConfirm.className = "editConfirm";
    editConfirm.id = position;
    let editDeny = document.createElement("div");
    editDeny.className = "editDeny";
    editDeny.id = position;

    editDeny.addEventListener("click", function(){
        renderProjectPage(getFolder());
    })
    

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
    */

    taskListingLeftContainer.appendChild(editTaskNameBox);
    editTaskNameInputField.focus();
}

function createEditFolderInputField(position, storedFolder){
    let projectArray = localStorageToProjectArray();
    let previousField = document.getElementById("taskListingFolder" + position);
    previousField.remove(previousField);
    let taskListingLeftContainer = document.getElementById("taskListingLeftContainer" + position);
    let folderDropDown = document.createElement("select");
    folderDropDown.className = "folderDropDown";

    folderDropDown.addEventListener('focusout', function(){
        renderProjectPage(getFolder());
    });

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
    folderDropDown.focus();
}

function createEditDateInputField(position) {
    let today = startOfToday();
    let ISOToday = formatISO(today, { representation: 'date' });
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
    editDateField.min = ISOToday;

    editDateField.addEventListener('focusout', function(){
        renderProjectPage(getFolder());
      });
    
    editDateField.addEventListener("change", function(){
        let dateObject = new Date(this.value);
        if (isValid(dateObject) === false){
            let today = startOfToday();
            let ISOToday = formatISO(today, { representation: 'date' });
            this.value = ISOToday;
        }
        combinedArray[position].changeTaskDate(this.value);
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
    })
    

    rightContainerBox.appendChild(editDateField);
    editDateField.focus();
}

function createEditProjectDescriptionInputField (folder, previousDescription){
    let previousField = document.getElementById("folderDescription");
    let folderBoxHeader = document.getElementById("folderBoxHeader");
    previousField.remove();
    let editProjectDescriptionInputContainer = document.createElement("div");
    editProjectDescriptionInputContainer.id = "editProjectDescriptionInputContainer";
    
    /*
    let editProjectDescriptionConfirm = document.createElement("div");
    editProjectDescriptionConfirm.id = "editProjectDescriptionConfirm";
    
    editProjectDescriptionConfirm.addEventListener("click", function(){
        let newDescription = editProjectDescriptionInputField.value;
        let storedFolder = folder;
        let combinedArray = localStorageToCombinedArray();
        
        function findPosition(name){
            for (let i = 0; i < combinedArray.length; i ++){
                if (combinedArray[i].type == "project" && combinedArray[i].projectName == name){
                    let position = i;
                    return position
                }
            }
        }
        combinedArray[findPosition(storedFolder)].changeProjectDescription(newDescription);
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
        
    });
    
    
    let editProjectDescriptionDeny = document.createElement("div");
    editProjectDescriptionDeny.id = "editProjectDescriptionDeny";

    editProjectDescriptionDeny.addEventListener("click", function(){
        renderProjectPage(getFolder());
    })

    */



    let editProjectDescriptionInputField = document.createElement("textarea");
    editProjectDescriptionInputField.id = "editProjectDescriptionInputField";
    editProjectDescriptionInputField.cols = "15";
    editProjectDescriptionInputField.rows = "5";
    editProjectDescriptionInputField.value = previousDescription;
    editProjectDescriptionInputField.contentEditable = true;



    editProjectDescriptionInputField.addEventListener("change", function(){
        let newDescription = editProjectDescriptionInputField.value;
        let storedFolder = folder;
        let combinedArray = localStorageToCombinedArray();
        function findPosition(name){
            for (let i = 0; i < combinedArray.length; i ++){
                if (combinedArray[i].type == "project" && combinedArray[i].projectName == name){
                    let position = i;
                    return position
                }
            }
        }
        combinedArray[findPosition(storedFolder)].changeProjectDescription(newDescription);
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
    })

    editProjectDescriptionInputField.addEventListener("focusout", function(){
        renderProjectPage(getFolder());
    })


    //let editProjectDescriptionButtonContainer = document.createElement("div");
    //editProjectDescriptionButtonContainer.id = "editProjectDescriptionButtonContainer";

    editProjectDescriptionInputContainer.appendChild(editProjectDescriptionInputField);
    //editProjectDescriptionButtonContainer.appendChild(editProjectDescriptionConfirm);
    //editProjectDescriptionButtonContainer.appendChild(editProjectDescriptionDeny);

    //editProjectDescriptionInputContainer.appendChild(editProjectDescriptionButtonContainer);

    folderBoxHeader.appendChild(editProjectDescriptionInputContainer);

    editProjectDescriptionInputField.focus();
}
function createEditProjectNameInputField(folder){
    let previousField = document.getElementById("folderHeaderName");
    previousField.remove();
    let editProjectNameInputBox = document.createElement("div");
    editProjectNameInputBox.id = "editProjectNameInputBox"
    let editProjectNameInputField = document.createElement("input");
    editProjectNameInputField.id = "editProjectNameInputField";
    editProjectNameInputField.value = folder;

    /*
    let editProjectNameButtonBox = document.createElement("div");
    editProjectNameButtonBox.id = "editProjectNameButtonBox";
    let editProjectNameConfirm = document.createElement("div");
    editProjectNameConfirm.id = "editProjectNameConfirm";
    let editProjectNameDeny = document.createElement("div");
    editProjectNameDeny.id = "editProjectNameDeny";

    editProjectNameDeny.addEventListener("click", function(){
        renderProjectPage(getFolder());
    })
    editProjectNameButtonBox.appendChild(editProjectNameConfirm);
    editProjectNameButtonBox.appendChild(editProjectNameDeny);

    */
    editProjectNameInputField.addEventListener("change", function(){
        
            let combinedArray = localStorageToCombinedArray();
            let storedFolder = folder;
            let newName = editProjectNameInputField.value;
            function findPosition(name){
                for (let i = 0; i < combinedArray.length; i ++){
                    if (combinedArray[i].type == "project" && combinedArray[i].projectName == name){
                        let position = i;
                        return position
                    }
                }
            }
            console.log(findPosition(storedFolder));
            console.log(combinedArray[findPosition(storedFolder)].changeProjectName(newName));
            
            function moveTasksToNewFolder(oldProject, newProject){
                for (let i = 0; i < combinedArray.length; i ++){
                    if (combinedArray[i].type == "task"){
                        if (combinedArray[i].folder == oldProject){
                            combinedArray[i].changeTaskFolder(newProject);
                        }
                    }
                }
            }
    
            moveTasksToNewFolder(storedFolder, newName);
            writeToLocalStorage(combinedArray);
            setFolder(newName);
            renderProjectHeadings();
            renderProjectPage(getFolder());
    });
    editProjectNameInputField.addEventListener("focusout", function(){
        renderProjectPage(getFolder());
    })

    
    
    editProjectNameInputBox.appendChild(editProjectNameInputField);
    
    //editProjectNameInputBox.appendChild(editProjectNameButtonBox);

    let folderHeaderContainer = document.getElementById("folderHeaderContainer")
    folderHeaderContainer.appendChild(editProjectNameInputBox)
    editProjectNameInputField.focus();

    /*
    editProjectNameConfirm.addEventListener("click", function(){
        let combinedArray = localStorageToCombinedArray();
        let storedFolder = folder;
        let newName = editProjectNameInputField.value;
        function findPosition(name){
            for (let i = 0; i < combinedArray.length; i ++){
                if (combinedArray[i].type == "project" && combinedArray[i].projectName == name){
                    let position = i;
                    return position
                }
            }
        }
        console.log(findPosition(storedFolder));
        console.log(combinedArray[findPosition(storedFolder)].changeProjectName(newName));
        
        function moveTasksToNewFolder(oldProject, newProject){
            for (let i = 0; i < combinedArray.length; i ++){
                if (combinedArray[i].type == "task"){
                    if (combinedArray[i].folder == oldProject){
                        combinedArray[i].changeTaskFolder(newProject);
                    }
                }
            }
        }

        moveTasksToNewFolder(storedFolder, newName);
        writeToLocalStorage(combinedArray);
        setFolder(newName);
        renderProjectHeadings();
        renderProjectPage(getFolder());

    });
    */
}

export {
    createEditTaskNameInputField,
    createEditFolderInputField,
    createEditDateInputField,
    createEditProjectDescriptionInputField,
    createEditProjectNameInputField
}