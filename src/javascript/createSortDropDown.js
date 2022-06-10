import { getSort, setSort } from "./currentSort";
import { renderProjectPage } from "./renderProjects";
import { getFolder } from "./setFolder";

function createSortDropDown() {
    let sortBox = document.getElementById("sortBox");
    let sortDropDown = document.createElement("select");
    sortDropDown.id = "sortDropDown";
    let sortByDueDate = document.createElement("option");
    sortByDueDate.id = "sortByDueDate";
    sortByDueDate.value = "dueDate";

    sortByDueDate.innerText = "due date";
    let sortByPriority = document.createElement("option");
    sortByPriority.id = "sortByPriority";
    sortByPriority.value = "priority";
    sortByPriority.innerText = "priority";
    let sortByAlpha = document.createElement("option");
    sortByAlpha.id = "sortByAlpha";
    sortByAlpha.value = "alpha";
    sortByAlpha.innerText = "alphabetical";

    if (getSort() == "dueDate"){
        sortDropDown.appendChild(sortByDueDate);
        sortDropDown.appendChild(sortByAlpha);
        sortDropDown.appendChild(sortByPriority);
    }
    if (getSort() == "priority"){
        sortDropDown.appendChild(sortByPriority);
        sortDropDown.appendChild(sortByDueDate);
        sortDropDown.appendChild(sortByAlpha);
    }
    if (getSort() == "alpha"){
        sortDropDown.appendChild(sortByAlpha);
        sortDropDown.appendChild(sortByDueDate);
        sortDropDown.appendChild(sortByPriority);
        
    }

    
    let previousField = document.getElementById("sortAnchor");
    previousField.remove();

    //event listener for change
    sortDropDown.addEventListener("change", function(){
        setSort(this.value);
        renderProjectPage(getFolder());
    })
    sortDropDown.addEventListener("focusout", function(){
        renderProjectPage(getFolder());
    })


    //event listener for change

    sortBox.appendChild(sortDropDown);
    sortDropDown.focus();

} export {
    createSortDropDown
}