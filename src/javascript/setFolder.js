let currentFolder = "inbox";

function setFolder(newFolder) {
    currentFolder = newFolder;
    console.log("set folder to" + newFolder);
}

function getFolder(){
    return currentFolder;
} export {
    setFolder,
    getFolder
}