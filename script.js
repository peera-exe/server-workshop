const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');

let tasks = [
{ id: 1, text: 'ติดตั้ง Node.js', done: false },
{ id: 2, text: 'ติดตั้ง VS Code', done: true }
];

function renderTasks() {
taskList.innerHTML = '';
tasks.forEach(function (task) {
const li = document.createElement('li');
li.textContent = task.text + (task.done ? ' (Done)' : '');
taskList.appendChild(li);
});
}

async function loadTasks() {
try {
const response = await fetch('/api/tasks');
if (!response.ok) throw new Error('API not available');
tasks = await response.json();
} catch (error) {
// หากรันบน GitHub Pages ที่ไม่มี Backend ให้ใช้ข้อมูล tasks ในเครื่องแทน
}
renderTasks();
}

async function addTask() {
const text = taskInput.value.trim();
if (text === '') return;

try {
const response = await fetch('/api/tasks', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text: text })
});
if (!response.ok) throw new Error('API not available');
} catch (error) {
// หากไม่มี Backend ให้จำลองเพิ่มรายการลงตัวแปรโดยตรง
tasks.push({ id: Date.now(), text: text, done: false });
}

taskInput.value = '';
renderTasks();
}

addBtn.addEventListener('click', addTask);
loadTasks();