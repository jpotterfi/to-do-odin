function localStorageToTaskArray(){
    let taskArray = []
    for (let i = 0; i < localStorage.length; i ++) {
        let retrieved = localStorage.getItem(i);

        retrieved = JSON.parse(retrieved);
        
        if (retrieved.type == "task") {
            
            const prototypedTaskFactory = (type, folder, task, priority, date, position, isCompleted) => {
                //const changeCompletion = () => console.log('hello!');

                return {type, folder, task, priority, date, position, isCompleted}
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


export {
    localStorageToTaskArray,
    localStorageToProjectArray
}