import { localStorageToCombinedArray } from "./localStorageToArray";
import { renderProjectPage } from "./renderProjects";
import { writeToLocalStorage } from "./writeToLocalStorage";
import { getFolder } from "./setFolder";

function deleteFromLocalStorage(deletePosition){
    console.log(deletePosition);
    let combinedArray = localStorageToCombinedArray();
    for (let i = deletePosition; i < combinedArray.length; i++){
        combinedArray[i].position --;
    }
        combinedArray.splice(deletePosition, 1);
        console.log("after");
        console.log(combinedArray);
        writeToLocalStorage(combinedArray);
        renderProjectPage(getFolder());
}
export {
    deleteFromLocalStorage
}