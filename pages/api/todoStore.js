import devTodos from "./data/devTodos";
const db = require('./db');

let todos = devTodos;


export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return res.status(200).json({message: {list: await getTodos(req, res)}, success: true});
        }

        case 'POST': {
            await addTodo(req, res);
            return res.status(200).json({message: "", success: true});
        }

        case 'PUT': {
            await updateTodo(req, res);
            return res.status(200).json({message: {}, success: true});;
        }

        case 'DELETE': {
            await deleteTodo(req, res);
            return res.status(200).json({message: "", success: true});;
        }
    }
}

async function getTodos(req, res) {
    console.log("get todos");
    const rows = (await db.query('SELECT * FROM todos')).at(0);
    return JSON.parse(JSON.stringify(rows));
}

async function addTodo(req, res) {
    let newTodo = JSON.parse(req.body);
    const [result] = await db.query('INSERT INTO todos (title, completed) VALUES (?, ?)', [newTodo.title, false]);
    return { };
}

async function updateTodo(req, res) {
  const values = [];

  let updateTodo = JSON.parse(req.body);

  values.push(updateTodo.title);
  values.push(updateTodo.completed);
  values.push(updateTodo.id);

  await db.query(`UPDATE todos SET title = ?, completed = ? WHERE id = ?`, [values]);
}

async function deleteTodo(req, res) {
    let deleteTodo = JSON.parse(req.body);
    await db.query('DELETE FROM todos WHERE id = ?', [deleteTodo.id]);
}

/* async function getTodos(req, res) {
    try {
        console.log("get todos");
        return res.json({
            message: JSON.parse(JSON.stringify(todos)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function createTodo(req, res) {
    console.log("create todo " + req.body)
    let newTodo = JSON.parse(req.body);
    todos.list.push(newTodo);
    return res.json({
        message: "",
        success: true,
    });
}

async function updateTodo(req, res) {
    console.log("update todo");
    console.log(req.body);
    let newTodo = JSON.parse(req.body);
    let todo = todos.list.find(t => t._id === newTodo._id);
    todo.text = newTodo.text;
    todo.finished = newTodo.finished;

    return res.json({
        message: {},
        success: true,
    });
}

async function deleteTodo(req, res) {
    console.log("delete todo");
    let deleteTodo = JSON.parse(req.body);
    var removeIndex = todos.list.map(item => item._id).indexOf(deleteTodo._id);
    (removeIndex >= 0) && todos.list.splice(removeIndex, 1);
    return res.json({
        message: "",
        success: true,
    });
} */