function createTaskListing () {
    let listingBox = document.createElement("div");
    listingBox.className = "listingBox";
    let listedTask = document.createElement("div");
    listedTask.className = "listedTask";
    listedTask.innerHTML = "exampleTask";

    let priority = "green";
    let listedDate = document.createElement("div");
    listedDate.className = "listedDate";
    listedDate.innerHTML = "exampleDate";

    listingBox.appendChild(listedTask);
    listingBox.appendChild(listedDate);


    let rightContent = document.getElementById("right-content");
    rightContent.append(listingBox);
}

export {
    createTaskListing
}