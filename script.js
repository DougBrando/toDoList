const addInput = document.getElementById('addInput');
const addBtn = document.querySelector('.addBtn');
const todoList = document .getElementById('todoList');

function addTodo() {
    const todoText = addInput.value.trim();
    if (todoText === '') return; 

    const li = document.createElement('li');
    li.textContent = todoText;

    const remover = document.createElement('button');
    remover.textContent = 'Remover';
    remover.classList.add('remover');
    remover.addEventListener('click', () => {
        todoList.removeChild(li);
    });

    li.appendChild(remover); // Adiciona o botão ao <li>
    todoList.appendChild(li);
    addInput.value = '';
}

// Adiciona o event listener para o botão de adicionar
addBtn.addEventListener('click', addTodo);

// Permite adicionar tarefa pressionando a tecla Enter
addInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Função para salvar a lista no localStorage
function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(li => {
        todos.push(li.firstChild.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Função para carregar a lista do localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todoText => {
        const li = document.createElement('li');
        li.textContent = todoText;

        const remover = document.createElement('button');
        remover.textContent = 'Remover';
        remover.classList.add('remover');
        remover.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos(); // Atualiza o localStorage após remover
        });

        li.appendChild(remover);
        todoList.appendChild(li);
    });
}

// Carrega a lista ao iniciar
loadTodos();

// Salva a lista sempre que uma nova tarefa é adicionada
addBtn.addEventListener('click', () => {
    addTodo();
    saveTodos();
});

addInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo();
        saveTodos();
    }
});
