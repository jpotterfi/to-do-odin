import './style.css';

let rightContent = document.getElementById("right-content");

let arr = ["jeremy", "29", "luna", "28", "seth", "30"];

let newArr = JSON.stringify(arr);


localStorage.setItem("1", JSON.stringify(arr))

let parse = localStorage.getValue()