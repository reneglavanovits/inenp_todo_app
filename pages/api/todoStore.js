import devTodos from "./data/devTodos";
const db = require('../db');

let todos = devTodos;


export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getTodos(req, res);
        }

        case 'POST': {
            return createTodo(req, res);
        }

        case 'PUT': {
            return updateTodo(req, res);
        }

        case 'DELETE': {
            return deleteTodo(req, res);
        }
    }
}

async function getTodos() {
  const [rows] = await db.query('SELECT * FROM todos');
  return rows;
}

async function addTodo(title) {
  const [result] = await db.query('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false]);
  return { id: result.insertId, title, completed: false };
}

async function updateTodo(id, updates) {
  const fields = [];
  const values = [];

  if (updates.title !== undefined) {
    fields.push('title = ?');
    values.push(updates.title);
  }
  if (updates.completed !== undefined) {
    fields.push('completed = ?');
    values.push(updates.completed);
  }

  if (fields.length === 0) return;

  values.push(id);

  await db.query(`UPDATE todos SET ${fields.join(', ')} WHERE id = ?`, values);
}

async function deleteTodo(id) {
  await db.query('DELETE FROM todos WHERE id = ?', [id]);
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