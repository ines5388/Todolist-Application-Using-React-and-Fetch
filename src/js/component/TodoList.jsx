import React, {useState, useEffect} from "react";

const TodoList = () => {
	const [task,setTask] = useState("");
	const [allTasks, setAllTasks] = useState([]);

	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/inesina', {
			method:'POST',
			body: JSON.stringify([]),
			headers: {'Content-Type': 'applicantion/json'}
		})
		.then((response) => response.json)
		.then((data) => console.log(data))
		.catch((error) => console.log(error))
	}

	const getTodos = () => {
		fetch('https://playground.4geeks.com/todo/users/inesina')

		.then((response) => {
			if(response.status === 404) {
				createUser()
				return setAllTasks([])
			}
			return response.json()
		}) 
		.then((data) => setAllTasks(data.todos))
		.catch((error) => console.log(error))
	}

	const addTask = (e) => {
		if(e.key === "Enter" && task !== "") {
			fetch('https://playground.4geeks.com/todo/todos/inesina', {
				method:'POST',
				body: JSON.stringify({
					label: task,
					is_done: false
				}),
				headers: { 'Content-type': 'application/json'}
			})
			.then((response) => response.json())
			.then((data) => setAllTasks(allTasks.concat(data)))
			.catch((error) => console.log(error))
			setTask("")
		}
	}

	const deleteTask = (elem) => {
		fetch(`https://playground.4geeks.com/todo/todos/${elem}`, {
			method:'DELETE'
		})
		.then((response) => {
			if(response.status === 204) {
				setAllTasks(allTasks.filter((item) => item.id !== elem))				
			}
			return response.json()
		})
		.then((data) => console.log(data))
		.catch((error) => console.log(error))
	}

	const cleanAllTasks = () => {
        fetch('https://playground.4geeks.com/todo/users/inesina', {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json"
            }
        })
        .then((response) => {
			if(response.ok) {
				setAllTasks([])
			}
			return response.json()
		})
        .then(data => console.log(data))
        .catch(error => console.log(error))
    };

	useEffect (() => {
	  	getTodos();
	},[])

	return (
		<div className="principal">
			<p className="fw-lighter">todos</p>
			<div className="tarjeta">
				<input type="text" placeholder="What needs to be done?" onChange={(event) => setTask(event.target.value)} onKeyDown={addTask} value={task} />
				<ul>
					{allTasks.length === 0 ? (<li className="agregarTarea">No hay tareas, añadir tareas</li>)
					: allTasks.map((elem,index) => <li key={index}>{elem.label}<i className="icono" onClick={() => deleteTask(elem.id)}>X</i></li>)}
				</ul>
				<div className="contador">{allTasks.length} item left</div>
				<button className="btn btn-danger m-2" onClick={cleanAllTasks}>Clean All Tasks</button>
			</div>
			<div className="tarjeta2"></div>
            <div className="tarjeta3"></div>
		</div>
	);
};

export default TodoList;

