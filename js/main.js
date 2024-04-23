const button = document.querySelector('.submit-button');
const taskTab = document.querySelector('.list-container');
const taskAppended = document.querySelector('.task-notification');

let taskName;
let taskDeadline;
let newTask;
let notif;

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Function to update the task list
function updateTaskList() {
    const tasks = [];
    const taskElements = taskTab.querySelectorAll('.taskBox');
    taskElements.forEach(task => {
        tasks.push(task.innerHTML);
    });
    setCookie('tasks', JSON.stringify(tasks), 30);
}

// Function to load tasks from cookie
function loadTasks() {
    const tasksCookie = getCookie('tasks');
    if (tasksCookie !== "") {
        const tasks = JSON.parse(tasksCookie);
        tasks.forEach(i => {
            taskTab.innerHTML += "<li class='taskBox'>"+ i + "</li>";
        });
    }
}

// Load tasks when the page is loaded
window.onload = loadTasks;

button.addEventListener('click', () => {
    taskAppended.style.display = "flex";
    taskName = document.querySelector('.taskEntry');
    taskDeadline = document.querySelector('.taskDeadline');

    if (taskName.value !== '' && taskDeadline.value !== '') {
        notif = "<h4>Task has been added</h4><i id='checkicon' class='bx bx-check'></i>";

        newTask = "<li class='taskBox'><div class='text'><h2>" + taskName.value + "</h2> <p>Due by: " + formatDate(taskDeadline.value) + "</p></div><input type='checkbox' class='removeButton'></li>";

        taskTab.innerHTML += newTask;
        taskName.value = '';
        taskDeadline.value = '';

        // Update the task list in the cookie
        updateTaskList();
    }
    else {
        notif = "<h4>Invalid Task</h4><i id='crossicon' class='bx bx-x'></i>";
    }

    taskAppended.innerHTML = notif;

    taskAppended.setAttribute("id", "drop-animation");
    setTimeout(() => {
        taskAppended.style.display = "none";
        taskAppended.removeAttribute("id");
    }, 2000);
});

taskTab.addEventListener('change', (event) => {
    if (event.target.classList.contains('removeButton') && event.target.checked) {
        event.target.parentNode.remove();
        // Update the task list in the cookie
        updateTaskList();
    }
});
