function createToDoTaskForm(){
    let formTemplate = document.createElement("div");
    formTemplate.className = "formTemplate";
    let form = document.createElement("form");
    form.className = "form";


    ///task Box
    let taskBox = document.createElement("div");
    taskBox.id = "taskBox";
    let taskHeading = document.createElement("div");
    taskHeading.id = "taskHeading";
    taskHeading.innerHTML = "Task Name";
    let taskField = document.createElement("div");
    taskField.id = "taskField";
    let taskInputLabel = document.createElement("label");
    taskInputLabel.htmlFor = "taskInput";
    let taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.id = "taskInput";
    taskInput.name = "taskInput";

    taskField.appendChild(taskInputLabel);
    taskField.appendChild(taskInput);

    taskBox.appendChild(taskHeading);
    taskBox.appendChild(taskField);

    form.appendChild(taskBox);

    ///task Box

    ///priority Box
    let priorityBox = document.createElement("div");
    priorityBox.id = "priorityBox";
    let priorityHeading = document.createElement("div");
    priorityHeading.id = "priorityHeading";
    priorityHeading.innerHTML = "Priority";
    let switchField = document.createElement("div");
    switchField.className = "switch-field";

    let priorityGreenInput = document.createElement("input");
    priorityGreenInput.id = "priorityGreen";
    priorityGreenInput.type = "radio";
    priorityGreenInput.name = "priorityGreen";
    priorityGreenInput.value = "green";
    let priorityGreenLabel = document.createElement("label");
    priorityGreenLabel.id = "greenButton";
    priorityGreenLabel.htmlFor = "priorityGreen";

    let priorityOrangeInput = document.createElement("input");
    priorityOrangeInput.id = "priorityOrange";
    priorityOrangeInput.type = "radio";
    priorityOrangeInput.name = "priorityOrange";
    priorityOrangeInput.value = "orange";
    let priorityOrangeLabel = document.createElement("label");
    priorityOrangeLabel.id = "orangeButton";
    priorityOrangeLabel.htmlFor = "priorityOrange";

    let priorityRedInput = document.createElement("input");
    priorityRedInput.id = "priorityRed"
    priorityRedInput.type = "radio";
    priorityRedInput.name = "priorityRed";
    priorityRedInput.value = "red";
    let priorityRedLabel = document.createElement("label");
    priorityRedLabel.id = "redButton";
    priorityRedLabel.htmlFor = "priorityRed";

    let prioritySelection = "green";
    ///priority button event listeners
    priorityGreenLabel.addEventListener("click", function (){
        prioritySelection = "green";
    });

    priorityOrangeLabel.addEventListener("click", function (){
        prioritySelection = "orange";
    });
    priorityRedLabel.addEventListener("click", function (){
        prioritySelection = "red";
    });



    switchField.appendChild(priorityGreenInput);
    switchField.appendChild(priorityGreenLabel);
    switchField.appendChild(priorityOrangeInput);
    switchField.appendChild(priorityOrangeLabel);
    switchField.appendChild(priorityRedInput);
    switchField.appendChild(priorityRedLabel);

    priorityBox.appendChild(priorityHeading);
    priorityBox.appendChild(switchField);

    form.appendChild(priorityBox);

    ///priority Box

    ///date Box
    let dateBox = document.createElement("div");
    dateBox.id = "dateBox";
    let dateHeading = document.createElement("div");
    dateHeading.id = "dateHeading";
    dateHeading.innerHTML = "Due Date";
    let dateField = document.createElement("div");
    dateField.id = "dateField";
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "dateInput";
    dateInput.name = "dateInput";
    dateInput.value = "2022-05-30";
    dateInput.min = "2022-05=30";
    dateInput.max = "2025-12-31";

    dateField.appendChild(dateInput);

    dateBox.appendChild(dateHeading);
    dateBox.appendChild(dateField);

    form.appendChild(dateBox);
    ///date Box

    //confirm Box
    let confirmBox = document.createElement("div");
    confirmBox.id = "confirmBox";
    let confirmButton = document.createElement("div");
    confirmButton.id = "confirmButton";
    confirmButton.type = "button";
    confirmButton.onclick = "return false;"
    let denyButton = document.createElement("div");
    denyButton.id = "denyButton";
    denyButton.type = "button";

    ///confirmBox event listener
    confirmButton.addEventListener("click", function(){
        let taskData = taskInput.value;
        let priorityData = prioritySelection;
        let dateData = dateInput.value;

        console.log(taskData, priorityData, dateData);

        const taskFactory = (type, folder, task, priority, date, position, isCompleted) => {
            this.type =  type;
            this.folder = folder;
            this.task = task;
            this.priority = priority;
            this.date = date;
            this.position = position;
            this.isCompleted = false;

            return {type, folder, task, priority, date, position, isCompleted};
          }

        let task = taskFactory("task", "inbox", taskData, priorityData, dateData, localStorage.length);

        task = JSON.stringify(task);

        localStorage.setItem(localStorage.length, task);

        console.log(JSON.parse(localStorage.getItem(localStorage.length - 1)))

        rightContent.removeChild(form);

    });







    //////confirmBox event listener

    confirmBox.appendChild(confirmButton);
    confirmBox.appendChild(denyButton);
    //confirm Box


    form.appendChild(confirmBox);

    let rightContent = document.getElementById("right-content");
    rightContent.appendChild(form);
}

export {
    createToDoTaskForm
}

