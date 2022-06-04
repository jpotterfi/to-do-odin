import { createProjectModal } from './createProjectModal'

function createNewProject () {
    let newProjectAnchor = document.getElementById("newProjectAnchor");
    let newProject = document.createElement("div");
    newProject.id = "newProject"

    newProject.innerHTML = "New Project +"
    
    newProject.addEventListener("click", function(){
        createProjectModal();
    })

    newProjectAnchor.appendChild(newProject);
} export {
    createNewProject
}