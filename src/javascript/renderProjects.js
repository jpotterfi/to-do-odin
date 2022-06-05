import { localStorageToProjectArray, localStorageToTaskArray } from './localStorageToArray'
import { setFolder, getFolder } from './setFolder'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { createAddTaskButton } from './createAddTaskButton';
import startOfToday from 'date-fns/startOfToday';
import parseISO from 'date-fns/parseISO';




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
                projectFolder.innerHTML = project.projectName;

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
         
         let folderHeader = document.createElement("div");
         folderHeader.id = "folderHeader"
         folderHeader.innerHTML = folderName;
         
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

         folderBoxHeader.appendChild(folderHeader);
         folderBoxHeader.appendChild(timeHeaderContainer);
        
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
         folderDescription.innerHTML = getDescription();
        //get description for current folder/project;
        
         folderBox.appendChild(folderDescription);

         let sortBox = document.createElement("div");
         sortBox.id = "sortBox";
         sortBox.innerHTML = "sort by date";
         //add sorts later

         folderBox.appendChild(sortBox);
        }

        function renderTasksToFolder() {
            let tasksArray = localStorageToTaskArray();
            let taskListing = document.getElementById("taskListing");
            let currentDate = startOfToday();
            console.log(currentDate);
            
            for (let i = 0; i < tasksArray.length; i ++){
                let taskName = tasksArray[i].task;
                let taskPriority = tasksArray[i].priority;
                let taskDate = parseISO(tasksArray[i].date);
                let taskFolder = tasksArray[i].folder;
                let taskPosition = tasksArray[i].position;
                let taskIsCompleted = tasksArray[i].isCompleted;

                if ((taskFolder == folderName) || (folderName == "Inbox")){ 
                console.log("went thru");

                let taskListingBox = document.createElement("div");
                taskListingBox.className = "taskListingBox";
                taskListingBox.id = "taskListingBox" + taskPosition; 

                let taskListingLeftContainer = document.createElement("div");
                taskListingLeftContainer.className = "taskListingLeftContainer";
                let taskListingIsCompleted = document.createElement("div");
                taskListingIsCompleted.className = "taskListingIsCompleted";

                let taskListingName = document.createElement("div");
                taskListingName.className = "taskListingName";
                taskListingName.innerHTML = taskName;

                let taskListingFolder = document.createElement("div");
                taskListingFolder.className = "taskListingFolder";
                taskListingFolder.innerHTML = "(" + taskFolder + ")"; 

                if (taskIsCompleted){
                    taskListingIsCompleted.borderColor = "green";
                }

                if (!taskIsCompleted){
                    taskListingIsCompleted.borderColor = "red";
                }

                taskListingLeftContainer.appendChild(taskListingIsCompleted);
                taskListingLeftContainer.appendChild(taskListingName);
                taskListingLeftContainer.appendChild(taskListingFolder);

                let taskListingRightContainer = document.createElement("div");
                taskListingRightContainer.className = "taskListingRightContainer";
                let taskListingDueTime = document.createElement("div");
                taskListingDueTime.className = "taskListingDueTime";
                taskListingDueTime.innerHTML = formatDistance(
                    taskDate,
                    currentDate,
                    { addSuffix: true }
                  )

                let taskListingDelete = document.createElement("div");
                taskListingDelete.className = "taskListingDelete";
                taskListingDelete.id = taskPosition;
                taskListingDelete.innerHTML = "X";

                taskListingRightContainer.appendChild(taskListingDueTime);
                taskListingRightContainer.appendChild(taskListingDelete);

                taskListingBox.appendChild(taskListingLeftContainer);
                taskListingBox.appendChild(taskListingRightContainer);

                if (taskPriority == "green"){
                    taskListingBox.style.borderColor = "green";    
                }
                if (taskPriority == "orange"){
                    taskListingBox.style.borderColor = "orange";    
                }
                if (taskPriority == "red"){
                    taskListingBox.style.borderColor = "red"
                }

                taskListing.appendChild(taskListingBox);
                } //end of if statement
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
        