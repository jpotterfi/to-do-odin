function localStorageToTaskArray(){
    let taskArray = []
    for (let i = 0; i < localStorage.length; i ++) {
        let retrieved = localStorage.getItem(i);

        retrieved = JSON.parse(retrieved);
        
        if (retrieved.type == "task") {
            
            const prototypedTaskFactory = (type, folder, task, priority, date, position, isCompleted) => {

                function changeCompletion(){
                    if (this.isCompleted == true){
                        this.isCompleted = false;
                    } else if
                       (this.isCompleted == false){
                        this.isCompleted = true;    
                       }
                }
                function changeTaskName(newName){
                   this.task = newName;
                }
                function changeTaskFolder(newFolder){
                    this.folder = newFolder;
                }

                

                return {type, folder, task, priority, date, position, isCompleted, changeCompletion, changeTaskName, changeTaskFolder}
            }
        
            let newTask = prototypedTaskFactory(retrieved.type,
                                                retrieved.folder,
                                                retrieved.task,
                                                retrieved.priority,
                                                retrieved.date,
                                                retrieved.position,
                                                retrieved.isCompleted)

            taskArray.push(newTask);
        }
        
    }
    console.log(taskArray);
    return taskArray;
}

function localStorageToProjectArray(){
    let projectArray = []
    for (let i = 0; i < localStorage.length; i ++) {
        let retrieved = localStorage.getItem(i);

        retrieved = JSON.parse(retrieved);
        
        if (retrieved.type == "project") {
            
            projectArray.push(retrieved);
        }
        
    }
    
    return projectArray;
}

function localStorageToCombinedArray(){
    let combinedArray = [];
    for (let i = 0; i < localStorage.length; i ++) {
        let retrieved = localStorage.getItem(i);
        retrieved = JSON.parse(retrieved);
        if (retrieved.type == "project") {   
            combinedArray.push(retrieved);
        }
        if (retrieved.type == "task") {
            
            const prototypedTaskFactory = (type, folder, task, priority, date, position, isCompleted) => {

                function changeCompletion(){
                    if (this.isCompleted == true){
                        
                        this.isCompleted = false;
                        
                    } else if (this.isCompleted == false){
                        this.isCompleted = true;
                       }
                }
                function changeTaskName(newName){
                    this.task = newName;
                }
                function changeTaskFolder(newFolder){
                    this.folder = newFolder;
                }
                function changeTaskDate(newDate){
                    this.date = newDate;
                }
                
                return {type, folder, task, priority, date, position, isCompleted, changeCompletion, changeTaskName, changeTaskFolder, changeTaskDate}
            }
        
            let newTask = prototypedTaskFactory(retrieved.type,
                                                retrieved.folder,
                                                retrieved.task,
                                                retrieved.priority,
                                                retrieved.date,
                                                retrieved.position,
                                                retrieved.isCompleted)

            combinedArray.push(newTask);
        }
        
    }
    return combinedArray
}



export {
    localStorageToTaskArray,
    localStorageToProjectArray,
    localStorageToCombinedArray
}