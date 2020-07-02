window.onload = () => {
  const date = document.getElementById('date');
  const today = new Date()
  date.innerText += ` ${today.toString()}`;
  // get all todos
  fetch('http://localhost:3000/toDo')
    .then(response => response.json())
    .then(data => {
      data.todos.forEach(todo => loadToDos(todo))
    })

  function loadToDos(todo) {
    // when loaded for the first time
    const newUpdate = document.createElement('li')
    newUpdate.setAttribute('id', todo._id)
    newUpdate.innerHTML = `<div><p class='titleid'>Title: ${todo.title}</p><p class='descriptionid'>Description: ${todo.description}</p><p>Done<input type="checkbox"/></p><button class='edit' id='edit-${todo._id}'>Edit</button><button class='delete' id='delete-${todo._id}'>Delete</button></div>`
    const ul = document.getElementById('todolist');
    ul.appendChild(newUpdate);

    // when click edit button to update values
    let editButton = document.getElementById(`edit-${todo._id}`)
    editButton.addEventListener('click', () => {
      // change title and description type from text to input fields
      newUpdate.innerHTML = `<div id=${todo._id}><input id='title-${todo._id}' type='text' placeholder='Title'/><input type='text' id='description-${todo._id}' placeholder='Description'/><p>Done<input type="checkbox"/></p><button class='editSubmit' id='submit-${todo._id}'>Edit</button></div>`;

      // after edit button is clicked, submit button appears 
      // & then add event listener to it
      let submitButton = document.getElementById(`submit-${todo._id}`)
      submitButton.addEventListener('click', () => {
        let newTitleInput = document.getElementById(`title-${todo._id}`).value
        let newDescriptionInput = document.getElementById(`description-${todo._id}`).value

        // PUT http://localhost:3000/todo/:id
        const data = {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify({
            'title': newTitleInput,
            'description': newDescriptionInput
          })
        }

        fetch(`http://localhost:3000/todo/${todo._id}`, data)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            newUpdate.innerHTML = `<div id=${data.todo._id}><p class='titleid'>Title: ${data.todo.title}</p><p class='descriptionid'>Description: ${data.todo.description}</p><p>Done<input type="checkbox"/></p><button class='edit' id='edit-${data.todo._id}'>Edit</button><button class='delete' id='delete-${data.todo._id}>Delete</button></div>`
          })
      })
    })

    // delete button
    let deleteButton = document.getElementById(`delete-${todo._id}`)
    deleteButton.addEventListener('click', () => {
      fetch(`http://localhost:3000/todo/${todo._id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          let removedToDo = document.getElementById(todo._id)
          removedToDo.parentNode.removeChild(removedToDo)
        })
    })
  }
  // fetch request with input from button
  // event listener for button
  const button = document.getElementById('submittodo')
  button.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    console.log(title, description)
    fetch('http://localhost:3000/toDo', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          'title': title,
          'description': description
        })
      })
      .then(response => response.json())
      .then(todo => loadToDos(todo))
  })
}
// event listener for modify

// checkbox updates done (toggles)

// event listener for delete 