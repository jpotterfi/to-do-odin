let currentFolder = "inbox";

function setFolder(newFolder) {
    currentFolder = newFolder;
}

function getFolder(){
    return currentFolder;
} export {
    setFolder,
    getFolder
}