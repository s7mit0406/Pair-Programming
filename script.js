/* LOGIN */
const socket = io();

const editor = document.getElementById("editor");

editor.addEventListener("input", () => {
    socket.emit("codeChange", editor.value);
});

socket.on("codeChange", (data) => {
    editor.value = data;
});


function login() {
    let id = document.getElementById("userid").value;
    let pass = document.getElementById("password").value;

    if(id !== "" && pass !== "") {
        localStorage.setItem("loggedInUser", id);
        window.location.href = "workspace.html";
    } else {
        alert("Enter ID and Password");
    }
}

function logout(){
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

/* WORKSPACE */
let files = {
    "main.cpp": "// Start coding here\n",
    "index.html": "<!-- HTML file -->"
};

let currentFile = null;

function renderFiles() {
    let fileList = document.getElementById("fileList");
    if(!fileList) return;

    fileList.innerHTML = "";
    for (let fileName in files) {
        let div = document.createElement("div");
        div.className = "file";
        div.textContent = "📄 " + fileName;
        div.onclick = () => openFile(fileName);
        fileList.appendChild(div);
    }
}

function openFile(fileName) {
    currentFile = fileName;
    document.getElementById("editor").value = files[fileName];
    document.getElementById("currentFileName").textContent = fileName;
}

function saveFileContent() {
    if (currentFile) {
        files[currentFile] = document.getElementById("editor").value;
    }
}

function createFile() {
    let fileName = prompt("Enter file name:");
    if (fileName && !files[fileName]) {
        files[fileName] = "";
        renderFiles();
    }
}

/* CHAT */
function sendMessage() {
    let input = document.getElementById("messageInput");
    if(!input) return;

    let message = input.value.trim();
    if (!message) return;

    let chatBox = document.getElementById("chatBox");

    let msgDiv = document.createElement("div");
    msgDiv.className = "message";
    msgDiv.textContent = message;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";
}

/* SHOW USER */
if(localStorage.getItem("loggedInUser")){
    let welcome = document.getElementById("welcomeUser");
    if(welcome){
        welcome.innerText = "Welcome " + localStorage.getItem("loggedInUser");
    }
}

renderFiles();
