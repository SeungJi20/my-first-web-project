document.getElementById('add-btn').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;
    if (todoText === '') return;
  
    const todoList = document.getElementById('todo-list');
    const listItem = document.createElement('li');
    listItem.textContent = todoText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', function() {
      todoList.removeChild(listItem);
    });
  
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);
  
    todoInput.value = '';
  });
  