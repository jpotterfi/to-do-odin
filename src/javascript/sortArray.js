import { localStorageToCombinedArray } from "./localStorageToArray";
import { startOfToday } from 'date-fns'
import { differenceInDays } from 'date-fns'
import { getSort } from "./currentSort";


function sortArray(){
    
    if (getSort() == "dueDate"){
        //console.log(getSort());
        return sortByDueDate();
    }
    if (getSort() == "priority"){
       return sortByPriority();
    }
    if (getSort() == "alpha"){
       return sortByAlpha();
    }

    function sortByDueDate(){
        let today = startOfToday();
        let combinedArray = localStorageToCombinedArray();
        let modifiedArray = []
        combinedArray.forEach(function (object){
            if (object.type == "task"){
                console.log("task found")
                modifiedArray.push(object);
            }
        });
        const sorted = modifiedArray.sort(function(a,b){
            if (a.type == "task" && b.type == "task"){
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);
                let differenceA = differenceInDays(today, dateA);
                let differenceB = differenceInDays(today, dateB);
                if (differenceA > differenceB){
                    return -1
                } else {
                    return 1
                }
            }

        });
        //console.log(combinedArray);
       // console.log(sorted)
       return sorted
    }
    function sortByPriority(){
        let combinedArray = localStorageToCombinedArray();
        let modifiedArray = []
        combinedArray.forEach(function (object){
            if (object.type == "task"){
                console.log("task found")
                modifiedArray.push(object);
            }
        });
        const sorted = modifiedArray.sort(function(a,b){
            if (a.type == "task" && b.type == "task"){
                let priorityA
                let priorityB
                if (a.priority == "green"){
                    priorityA = 3;
                }
                if (a.priority == "orange"){
                    priorityA = 2;
                }
                if (a.priority == "red"){
                    priorityA = 1;
                }
                if (b.priority == "green"){
                    priorityB = 3;
                }
                if (b.priority == "orange"){
                    priorityB = 2;
                }
                if (b.priority == "red"){
                    priorityB = 1;
                }
                
                if (priorityA > priorityB){
                    return 1
                } else {
                    return -1
                }
            }

        });
        return sorted
    }
    function sortByAlpha(){
        console.log("sorting by alpha");
        let combinedArray = localStorageToCombinedArray();
        let modifiedArray = []
        combinedArray.forEach(function (object){
            if (object.type == "task"){
                console.log("task found")
                modifiedArray.push(object);
            }
        });
        console.log("modified array");
        console.table(modifiedArray);

        const sorted = modifiedArray.sort(function(a,b){
            if (a.type == "task" && b.type == "task"){
                let textA = a.task.toUpperCase();
                let textB = b.task.toUpperCase();
                if (textA < textB){
                    console.log(textA + "is smaller than " + textB)
                    return -1
                } else if (textA > textB) {
                    console.log(textA + "is greater than " + textB)
                    return 1
                }
            }
        });
        //console.log(combinedArray);
       // console.log(sorted)
       return sorted
    }

} export {
    sortArray
}