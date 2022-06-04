import { localStorageToProjectArray, localStorageToTaskArray } from './localStorageToArray'
import { setFolder, getFolder } from './setFolder'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


    function renderProjectHeadings (){
        let projectsContainer = document.getElementById("projectsContainer");
        let projectArray = localStorageToProjectArray();
        projectsContainer.innerHTML = "";
        projectArray.forEach(renderHeadings)
        function renderHeadings(project){
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

    function renderProjectPage (folder){
        let folderName = folder;
        let rightContent = document.getElementById("right-content");
         function clearRightContent() {
             rightContent.innerHTML = "";
         }
     
         function createFolderHeader(){
         let folderHeader = document.createElement("div");
         folderHeader.id = "folderHeader";
         folderHeader.innerHTML = folderName;
         rightContent.appendChild(folderHeader);
        }

        function renderTasksToFolder() {
            let tasksArray = localStorageToTaskArray();
            let taskListing = document.createElement("div");
            taskListing.id = "taskListing";
            for (let i = 0; i < tasksArray.length; i ++){
                let taskName = tasksArray[i].task;
                let taskPriority = tasksArray[i].priority;
                let taskDate = tasksArray[i].date;
                let taskFolder = tasksArray[i].folder;
                let taskPosition = tasksArray[i].position;
                let taskIsCompleted = tasksArray[i].isCompleted;

                if (taskFolder == folderName){ 
                    
                let taskListingBox = document.createElement("div");
                taskListingBox.className = "taskListingBox";

                let taskListingLeftContainer = document.createElement("div");
                taskListingLeftContainer.className = "taskListingLeftContainer";
                let taskListingIsCompleted = document.createElement("div");
                taskListingIsCompleted.className = "taskListingIsCompleted";

                let taskListingName = document.createElement("div");
                taskListingName.className = "taskListingName";
                taskListingName.innerHTML = taskName;

                if (taskIsCompleted){
                    taskListingIsCompleted.borderColor = "green";
                }

                if (!taskIsCompleted){
                    taskListingIsCompleted.borderColor = "red";
                }

                taskListingLeftContainer.appendChild(taskListingIsCompleted);
                taskListingLeftContainer.appendChild(taskListingName);

                let taskListingRightContainer = document.createElement("div");
                taskListingRightContainer.className = "taskListingRightContainer";
                let taskListingDueTime = document.createElement("div");
                taskListingDueTime.className = "taskListingDueTime";
                taskListingDueTime.innerHTML = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });

                let taskListingDelete = document.createElement("div");
                taskListingDelete.className = "taskListingDelete";
                taskListingDelete.id = taskPosition;

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
            rightContent.appendChild(taskListing);
        }//end of renderTasksToFolder
        clearRightContent();
        createFolderHeader();
        renderTasksToFolder();

    }//end of renderProjectPage
    
    
    
    export {
        renderProjectHeadings,
        renderProjectPage
    }
        