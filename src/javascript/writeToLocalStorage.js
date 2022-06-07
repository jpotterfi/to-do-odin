function writeToLocalStorage (array){
    localStorage.clear()
    for (let i = 0; i < array.length; i ++){
        let stringifiedContent = JSON.stringify(array[i])
        localStorage.setItem(i, stringifiedContent)
    }
} export {
    writeToLocalStorage
}