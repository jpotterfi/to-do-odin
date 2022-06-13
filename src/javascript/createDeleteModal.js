import { deleteFromLocalStorage } from "./deleteFromLocalStorage";
import { localStorageToCombinedArray, localStorageToProjectArray, localStorageToTaskArray } from "./localStorageToArray";
import { renderProjectHeadings, renderProjectPage } from "./renderProjects";
import { getFolder, setFolder } from "./setFolder";
import { writeToLocalStorage } from "./writeToLocalStorage";

function createDeleteModal() {
    let modalBox = document.createElement("div");
    modalBox.id = "deleteModal";
    modalBox.className = "modal";
    let modalMessage = document.createElement("div");
    modalMessage.innerHTML = "Are you sure you want to delete this project?";
    modalMessage.innerHTML += "<br><br>";
    modalMessage.innerHTML += "This will also delete all tasks belonging to this project."
    let buttonBox = document.createElement("div");
    buttonBox.id = "buttonBox";

    let projectConfirmButton = document.createElement("div");
    let projectDenyButton = document.createElement("div");
    projectConfirmButton.id = "projectConfirmButton";
    projectDenyButton.id = "projectDenyButton";

    projectConfirmButton.innerText = "Accept";
    projectDenyButton.innerText = "Cancel"

    //event listeners
    projectDenyButton.addEventListener("click", function(){
        modalBox.remove();
        modalOverlay.remove()
    });


    projectConfirmButton.addEventListener("click", function(){
        let deleteFolder = getFolder();
        let taskArray = localStorageToTaskArray();
        let projectArray = localStorageToProjectArray();
        let deleteArray = []

        projectArray.forEach(identifyDeletedProject);
        function identifyDeletedProject (project){
            if (project.projectName == deleteFolder){
                deleteArray.push(project.position)
            }
        }

        taskArray.forEach(identifyDeletedTasks);
        function identifyDeletedTasks (task){
            if (task.folder == deleteFolder){
                deleteArray.push(task.position)
            }
        }

        console.log("deleteArray is ");
        console.table(deleteArray);
        
        let combinedArray = localStorageToCombinedArray();

        for (let i = 0; i < deleteArray.length; i ++){
            testDelete(deleteArray[i] - i);
            function testDelete(deletePosition){
                for (let j = deletePosition; j < combinedArray.length; j++){
                    combinedArray[j].position --;
                }
                combinedArray.splice(deletePosition, 1); 
            } 

        }
        console.log("combined array after delete");
        console.log(combinedArray);
        modalBox.remove();
        modalOverlay.remove();
        writeToLocalStorage(combinedArray);
        setFolder("Inbox");
        renderProjectHeadings();
        renderProjectPage(getFolder());

        
        //setFolder("Inbox");
        
    });

    buttonBox.appendChild(projectConfirmButton)
    buttonBox.appendChild(projectDenyButton)

    modalBox.appendChild(modalMessage);
    modalBox.appendChild(buttonBox);

    let content = document.getElementById("content");
    content.append(modalBox);
    let modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";


    content.append(modalOverlay);

} export {
    createDeleteModal
}