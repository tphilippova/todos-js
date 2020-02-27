let todoCounter = 0;

const showLoginForm = () => {
	let loginForm = document.getElementById('login-form');
	if (loginForm.style.display === 'none' || loginForm.style.display === '') {
		loginForm.style.display = 'block';
	} else {
		loginForm.style.display = 'none';
	}
};

const checkInput = () => {
	if (document.getElementById('myInput').value === '') {
		document.getElementById('addBtn').disabled = true;
	} else {
		document.getElementById('addBtn').disabled = false;
	}
};

const checkEnter = () => {
	if (event.keyCode === 13) {
		addNewElement();
	}
};

const checkFilters = () => {
	if (todoCounter === 0) {
		document.getElementById('filter').style.display = 'none';
	} else {
		document.getElementById('filter').style.display = 'block';
	}
};

//adds new todo
const addNewElement = () => {
	if (document.getElementById('myInput').value === '') {
		return;
	}

	todoCounter++;
	let newTodo = document.getElementById('myInput').value;
	let ul = document.getElementById('myList');
	let li = document.createElement('li');
	li.classList.add('list-group-item', 'unmarked');
	let label = document.createElement('label');
	let editTodo = document.createElement('input');
	editTodo.style.display = 'none';
	label.classList.add('mb-0', 'undone');
	label.appendChild(document.createTextNode(newTodo))
	li.appendChild(label);
	li.appendChild(editTodo);
	ul.appendChild(li);
	document.getElementById('allTodo').classList.add('active');

	document.getElementById('myInput').value = '';
	checkInput();

	// adds check mark
 	label.onclick = () => {
		label.style.display = 'inline';
		console.log(li)
		if (label.classList.contains('undone')) {
			label.className = 'done';
			li.classList.add('marked');
			li.classList.remove('unmarked');
		} else {
			label.className = 'undone';
			li.classList.add('unmarked');
			li.classList.remove('marked');
		}
	};

	//edits todo in the list
	label.ondblclick = () => {
		label.style.display = 'none';
		editTodo.style.display = 'inline-block';
		editTodo.value = label.textContent;
	};

	editTodo.onkeyup = () => {
		if (event.keyCode === 13) {
			label.innerHTML = editTodo.value;
			if (editTodo.value !== '') {
				label.innerHTML = editTodo.value;
			}
			label.style.display = 'inline-block';
			editTodo.style.display = 'none';
		}
	};

	editTodo.onblur = () => {
		if (editTodo.value !== '') {
			label.innerHTML = editTodo.value;
		}
		label.style.display = 'inline-block';
		editTodo.style.display = 'none';
	};

	let closeButton = document.createElement('span');
	closeButton.appendChild(document.createTextNode('x'));
	closeButton.classList.add('close');
	li.appendChild(closeButton);

	closeButton.onclick = () => {
		li.remove();
		todoCounter--;
		checkFilters();
	};

	checkFilters();
};

const showFilteredTodo = (filterName) => {

	let list = document.getElementsByTagName('li');
	let allFilterBtn = document.getElementById('allTodo');
	let doneFilterBtn = document.getElementById('doneTodo');
	let undoneFilterBtn = document.getElementById('undoneTodo');

	if (filterName === 'all') {
		allFilterBtn.classList.add('active');
		doneFilterBtn.classList.remove('active');
		undoneFilterBtn.classList.remove('active');
		for ( i=0; i<list.length; i++) {
			list[i].style.display = 'block';
		}
	}

	if (filterName === 'done') {
		allFilterBtn.classList.remove('active');
		doneFilterBtn.classList.add('active');
		undoneFilterBtn.classList.remove('active');
		for ( i=0; i<list.length; i++) {
			if (list[i].classList.contains('unmarked')) {
				list[i].style.display = 'none';
			} else {
				list[i].style.display = 'block';
			}
		}
	}

	if (filterName === 'undone') {
		allFilterBtn.classList.remove('active');
		doneFilterBtn.classList.remove('active');
		undoneFilterBtn.classList.add('active');
		for ( i=0; i<list.length; i++) {
			list[i].style.display = 'block';
		}

		for ( i=0; i<list.length; i++) {
			if (list[i].classList.contains('marked')) {
				list[i].style.display = 'none';
			} else {
				list[i].style.display = 'block';
			}
		}
	}
};

