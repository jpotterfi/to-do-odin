import { localStorageToCombinedArray, localStorageToProjectArray, localStorageToTaskArray } from './localStorageToArray'
import { setFolder, getFolder } from './setFolder'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { createAddTaskButton } from './createAddTaskButton';
import { writeToLocalStorage } from './writeToLocalStorage';
import startOfToday from 'date-fns/startOfToday';
import parseISO from 'date-fns/parseISO';
import { createEditFolderInputField, createEditTaskNameInputField, createEditDateInputField, createEditProjectDescriptionInputField, createEditProjectNameInputField } from './createEditInputField';
import { deleteFromLocalStorage } from './deleteFromLocalStorage';
import { sortArray } from './sortArray';
import { getSort, setSort } from './currentSort';
import { createSortDropDown } from './createSortDropDown';




    function renderProjectHeadings (){
        let projectsContainer = document.getElementById("projectsContainer");
        let projectArray = localStorageToProjectArray();
        projectsContainer.innerHTML = "";
        projectArray.forEach(renderHeadings)
        function renderHeadings(project){
            if (project.projectName != "Inbox"){
                let projectFolder = document.createElement("div"); 
                projectFolder.className = "projectFolderTitle";
                projectFolder.id = project.projectName;
                projectFolder.innerHTML = "- " + project.projectName;

                projectFolder.addEventListener("click", function(){
                    setFolder(project.projectName);
                    renderProjectPage(getFolder());
                    console.log("current folder is " + getFolder());
                });
                projectsContainer.appendChild(projectFolder);
            }
        }
    }

    function renderProjectPage (folder){
        let folderName = folder;
        let rightContent = document.getElementById("right-content");
        
         function clearRightContent() {
             let taskListing = document.getElementById("taskListing");
             taskListing.innerHTML = "";
             //let addTaskButton = document.getElementById("addTaskButton");
             //addTaskButton.remove();

            let folderBox = document.getElementById("folderBox");
            if (typeof(folderBox) != 'undefined' && folderBox != null)
            {
                folderBox.remove();
            } else {
                return;
            }
             
         }
     
         function createFolderBox(){
         let folderBox = document.createElement("div");
         folderBox.id = "folderBox";
         
         let folderBoxHeader = document.createElement("div");
         folderBoxHeader.id = "folderBoxHeader";
         
         let folderHeaderContainer = document.createElement("div");
         folderHeaderContainer.id = "folderHeaderContainer";

         let folderHeaderName = document.createElement("div");
         folderHeaderName.id = "folderHeaderName"
         folderHeaderName.innerHTML = folderName;
        
         if (folderName != "Inbox"){
             folderHeaderName.className = "folderHeaderNameEditable"
            folderHeaderName.addEventListener("click", function(){
                createEditProjectNameInputField(folderName);
            })
         }
         
         /*
         let timeHeaderContainer = document.createElement("div");
         timeHeaderContainer.id = "timeHeaderContainer";

         let todayHeader = document.createElement("div");
         todayHeader.id = "todayHeader";
         todayHeader.innerHTML = "Today";

         let weekHeader = document.createElement("div");
         weekHeader.id = "weekHeader";
         weekHeader.innerHTML = "This Week";

         timeHeaderContainer.appendChild(todayHeader);
         timeHeaderContainer.appendChild(weekHeader);
         */

         folderHeaderContainer.appendChild(folderHeaderName);
         //folderHeaderContainer.appendChild(timeHeaderContainer);
        
         folderBoxHeader.appendChild(folderHeaderContainer);

         folderBox.appendChild(folderBoxHeader);

         rightContent.appendChild(folderBox);

        //get description for current folder/project;
         let projectArray = localStorageToProjectArray();
         console.log(projectArray[0].projectDescription);

         function getDescription (){
            for (let i = 0; i < projectArray.length; i++) {
                if (projectArray[i].projectName == folderName){
                    return projectArray[i].projectDescription;
                }
            }
        }
         let folderDescription = document.createElement("div");
         folderDescription.className = "folderDescription";
         folderDescription.id = "folderDescription";
         folderDescription.innerHTML = getDescription();
        //event listener for folderDescription
        if (folder != "Inbox"){
            folderDescription.className = "folderDescriptionEditable";
            folderDescription.addEventListener("click", function(){
                createEditProjectDescriptionInputField(folderName, getDescription());
            })
        }

        



        //event listener for folderDescription
        //get description for current folder/project;
        
         folderBox.appendChild(folderDescription);

         let sortBox = document.createElement("div");
         sortBox.id = "sortBox";
         let sortHeading = document.createElement("div");
         sortHeading.id = "sortHeading";
         sortHeading.innerHTML = "sort by"

         let sortAnchor = document.createElement("div");
         sortAnchor.id = "sortAnchor";

        if (getSort() == "dueDate"){
            sortAnchor.innerHTML = "due date"
        }
        if (getSort() == "priority"){
            sortAnchor.innerHTML = "priority"
        }
        if (getSort() == "alpha"){
            sortAnchor.innerHTML = "alphabetical"
        }

         
         sortAnchor.addEventListener("click", function(){
            createSortDropDown();
         });

         sortBox.appendChild(sortHeading);
         sortBox.appendChild(sortAnchor);

         folderBox.appendChild(sortBox);
        }

        function renderTasksToFolder() {
            let tasksArray = localStorageToTaskArray();
            let taskListing = document.getElementById("taskListing");
            let combinedArray = localStorageToCombinedArray();
            combinedArray = sortArray();
            console.log(combinedArray);
            let currentDate = startOfToday();
            console.log(currentDate);
            
            for (let i = 0; i < combinedArray.length; i ++){
                if (combinedArray[i].type == "task") {
                    let taskName = combinedArray[i].task;
                    let taskPriority = combinedArray[i].priority;
                    let taskDate = parseISO(combinedArray[i].date);
                    let taskFolder = combinedArray[i].folder;
                    let taskPosition = combinedArray[i].position;
                    let taskIsCompleted = combinedArray[i].isCompleted;

                    if ((taskFolder == folderName) || (folderName == "Inbox")){ 
                    console.log("went thru");

                    let taskListingBox = document.createElement("div");
                    taskListingBox.className = "taskListingBox";
                    taskListingBox.id = "taskListingBox" + taskPosition; 

                    let taskListingLeftContainer = document.createElement("div");
                    taskListingLeftContainer.className = "taskListingLeftContainer";
                    taskListingLeftContainer.id = "taskListingLeftContainer" + taskPosition;
                    let taskListingIsCompleted = document.createElement("div");
                    taskListingIsCompleted.className = "taskListingIsCompleted";
                    taskListingIsCompleted.id = taskPosition;
                    console.log("task position in combined array is" + taskPosition);
                    console.table(combinedArray);


                    //event listener for IsCompleted
                    taskListingIsCompleted.addEventListener("click", function(){
                        combinedArray = localStorageToCombinedArray();
                        combinedArray[taskListingIsCompleted.id].changeCompletion();
                        writeToLocalStorage(combinedArray);
                        renderProjectPage(getFolder());
                    })





                    //event listener for IsCompleted

                    let taskListingName = document.createElement("div");
                    taskListingName.className = "taskListingName";
                    taskListingName.innerHTML = taskName;
                    taskListingName.id = "taskListingName" + taskPosition;

                    taskListingName.addEventListener("click", function(){
                    let storedPosition = taskPosition;
                    createEditTaskNameInputField(storedPosition, taskName);

                    });

                    let taskListingFolder = document.createElement("div");
                    taskListingFolder.className = "taskListingFolder";
                    taskListingFolder.innerHTML = "(" + taskFolder + ")";
                    taskListingFolder.id = "taskListingFolder" + taskPosition; 

                    //event listener for taskListingFolder
                    taskListingFolder.addEventListener("click", function(){
                    let storedPosition = taskPosition;
                    let storedFolder = taskFolder;
                    createEditFolderInputField(storedPosition, storedFolder);    
                    })


                    //event listener for taskListingFolder

                    if (taskIsCompleted == true){
                        taskListingIsCompleted.style.borderColor = "white";
                        taskListingIsCompleted.style.backgroundColor = "white";
                    }

                    if (taskIsCompleted == false){
                        taskListingIsCompleted.style.borderColor = "white"
                        
                    }

                    taskListingLeftContainer.appendChild(taskListingIsCompleted);
                    taskListingLeftContainer.appendChild(taskListingName);
                    taskListingLeftContainer.appendChild(taskListingFolder);


                    let taskListingRightContainer = document.createElement("div");
                    taskListingRightContainer.className = "taskListingRightContainer";
                    taskListingRightContainer.id = "taskListingRightContainer" + taskPosition;
                    let taskListingDueTime = document.createElement("div");
                    taskListingDueTime.className = "taskListingDueTime";
                    taskListingDueTime.id = "taskListingDueTime" + taskPosition;
                    taskListingDueTime.innerHTML = formatDistance(
                        taskDate,
                        currentDate,
                        { addSuffix: true }
                    )
                    //event listner for taskListingDueTime
                    taskListingDueTime.addEventListener("click", function(){
                        let storedPosition = taskPosition;
                        createEditDateInputField(storedPosition);  
                    });

                    let taskListingDelete = document.createElement("div");
                    taskListingDelete.className = "taskListingDelete";
                    taskListingDelete.id = "taskListingDelete" + taskPosition;
                    taskListingDelete.innerHTML = "X";

                    //delete eventlistener
                    taskListingDelete.addEventListener("click", function(){
                    let storedValue = taskPosition;
                    console.log(storedValue);
                    let deleteForm = document.getElementById("taskListingBox" + storedValue);
                    deleteFromLocalStorage(storedValue);
                    //deleteForm.remove();
                    //localStorage.removeItem(storedValue);
                    //renderProjectPage(getFolder());
                    });


                    ///delete eventlistener

                    taskListingRightContainer.appendChild(taskListingDueTime);
                    taskListingRightContainer.appendChild(taskListingDelete);

                    taskListingBox.appendChild(taskListingLeftContainer);
                    taskListingBox.appendChild(taskListingRightContainer);

                    if (taskPriority == "green"){
                        taskListingBox.style.borderColor = "#49FF00";    
                    }
                    if (taskPriority == "orange"){
                        taskListingBox.style.borderColor = "#FF9300";    
                    }
                    if (taskPriority == "red"){
                        taskListingBox.style.borderColor = "#FF0000"
                    }

                    taskListing.appendChild(taskListingBox);
                    } //end of if statement
                }
            } //end of loop
            
        }//end of renderTasksToFolder
        clearRightContent();


        createFolderBox();
        renderTasksToFolder();
        let addTaskButton = document.getElementById("addTaskButton");
        if (typeof(addTaskButton) != 'undefined' && addTaskButton != null)
        {
            return
        } else {
            createAddTaskButton();
        }   

    }//end of renderProjectPage
    
    
    
    export {
        renderProjectHeadings,
        renderProjectPage
    }
        