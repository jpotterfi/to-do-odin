import { renderProjectHeadings, renderProjectPage } from "./renderProjects";
import { getFolder } from "./setFolder";
import { updatePage } from "./updatePage";

function createProjectModal() {
    let modalBox = document.createElement("div");
    modalBox.id = "modalBox";
    modalBox.className = "modal"

    let projectNameBox = document.createElement("div");
    let projectNameHeading = document.createElement("div");
    let projectNameInput = document.createElement("input");
    projectNameBox.id = "projectNameBox";
    projectNameHeading.id = "projectNameHeading";
    projectNameInput.id = "projectNameInput";

    projectNameHeading.innerHTML = "Project Name"

    projectNameBox.appendChild(projectNameHeading);
    projectNameBox.appendChild(projectNameInput);

    let projectDescriptionBox = document.createElement("div");
    let projectDescriptionHeading = document.createElement("div");
    let projectDescriptionInput = document.createElement("textarea");
    projectDescriptionBox.id = "projectDescriptionBox";
    projectDescriptionHeading.id = "projectDescriptionHeading";
    projectDescriptionInput.id = "projectDescriptionInput";

    projectDescriptionHeading.innerHTML = "Project Description";

    projectDescriptionBox.appendChild(projectDescriptionHeading);
    projectDescriptionBox.appendChild(projectDescriptionInput);

    let projectConfirmBox = document.createElement("div");
    let projectConfirmButton = document.createElement("div");
    let projectDenyButton = document.createElement("div");
    projectConfirmBox.id = "projectConfirmBox";
    projectConfirmButton.id = "projectConfirmButton";
    projectDenyButton.id = "projectDenyButton";

    projectConfirmButton.innerHTML = "Accept";
    projectDenyButton.innerHTML = "Cancel"

    //event listeners
    projectDenyButton.addEventListener("click", function(){
        modalBox.remove();
        modalOverlay.remove()
    });


    projectConfirmButton.addEventListener("click", function(){
        let projectNameData = projectNameInput.value;
        let projectDescriptionData = projectDescriptionInput.value;
        
        const projectFactory = (type, projectName, projectDescription, position) => {
            this.type =  type;
            this.projectName = projectName;
            this.projectDescription = projectDescription
            this.position = position;

            return {type, projectName, projectDescription, position};
          } 

        let project = projectFactory("project", projectNameData, projectDescriptionData, localStorage.length)
        project = JSON.stringify(project);

        localStorage.setItem(localStorage.length, project);
        modalBox.remove();
        modalOverlay.remove()
        renderProjectHeadings();
        renderProjectPage(getFolder());
        
    });


    ///



    projectConfirmBox.appendChild(projectConfirmButton);
    projectConfirmBox.appendChild(projectDenyButton);

    modalBox.append(projectNameBox);
    modalBox.append(projectDescriptionBox);
    modalBox.append(projectConfirmBox);

    let content = document.getElementById("content");
    content.append(modalBox);
    let modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";


    content.append(modalOverlay);

} export {
    createProjectModal
}