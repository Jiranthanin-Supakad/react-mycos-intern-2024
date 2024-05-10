import { useState, useEffect, useCallback } from 'react';
import { Button, Grid } from "@mui/material";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import "./styles/SelfTodoliststyle.css";
import SelfTodoItem from "./SelfTodoItem";
import { todoApi } from "../../api/TodoApi";
import SelfTodoAddEvent from './SelfTodoEvent/SelfTodoAddEvent';
import UpdateSelfTodoForm from './UpdateDeleteSelfTodoForm/UpdateSelfTodoForm';
import AddTodoDialog from '../TodoList/NewTodoDialog';
import DeleteSelfTodoForm from './UpdateDeleteSelfTodoForm/DeleteSelfTodoForm';

export interface ITodo {
    id?: string;
    title: string;
    description?: string;
    dueDate?: string;
    status?: string;
    // isDone: boolean;
}

const SelfTodolist = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [openAddToDoDialog, setOpenAddToDoDialog] = useState<boolean>(false);
    const [openEditTodo, setOpenEditTodo] = useState(false);
    const [openDeleteTodo, setOpenDeleteTodo] = useState(false);
    const [openCheckTodo, setOpenCheckTodo] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<ITodo>();
    const [idToDelete, setIdToDelete] = useState<string>('');
    

    const getTodos = useCallback(async () => {
        try {
            const result = await todoApi.getTodos();
            setTodos(result.data);
            // const incompleteTasks = result.data.filter(todo => !todo.isDone);
            // setIncompleteTaskCount(incompleteTasks.length);

            // const today = new Date().toLocaleDateString();
            // const todayTasks = result.data.filter(todo => todo.dueDate === today);
            // setTodayTaskCount(todayTasks.length);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }, []);

    const handleSuccess = () => {
        getTodos();
    };

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const iconStyle = {
        color: '#F8F8F8',
        backgroundColor: '#393939',
        borderRadius: '50%',
        padding: '5px',
    };

    return (
        <>
            <Grid container>
                {/* //Grid left */}
                <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="box-left">
                        <h1>Today</h1>
                        <p>23 April 2024. Tuesday</p>
                        <Button id="Allbtn" variant="outlined"
                            startIcon={<Inventory2OutlinedIcon sx={iconStyle} />}
                        >
                            <span className="showAlltask">All</span>
                            {/* <span className="showIncompeletetask">10</span> */}
                        </Button>

                        <Button id="Todaybtn" variant="outlined"
                            startIcon={<CalendarTodayOutlinedIcon sx={iconStyle} />}
                        >
                            <span className="showTodaytask">Today</span>
                            {/* <span className="showIncompeletetask">{todayTaskCount}</span> */}
                        </Button>
                    </div>

                    {/* Add-New-Task-btn */}
                    <div className="AddTaskBox">
                        <SelfTodoAddEvent onSuccess={handleSuccess} />
                    </div>

                </Grid>

                {/* //Grid right */}
                <Grid item xs={12} md={9}>
                    <div className="box-right">
                        <div className="header">
                            <h1>All</h1>
                            {/* <SelfTodoFilter /> */}
                        </div>
                        <div className="todo-list">
                            {todos.map((t) => (
                                <SelfTodoItem 
                                props={t} 
                                onEdit={(data) => { 
                                    setOpenEditTodo(true);
                                    setTodoToEdit(data);
                                }}
                                sentId={(id) => {
                                    setIdToDelete(id);
                                    setOpenDeleteTodo(true);
                                }}
                                onDelete={getTodos}
                                key={t.id}
                                onCheck={getTodos} 
                                />
                            ))}
                        </div>
                    </div>
                </Grid>
            </Grid>

            <AddTodoDialog
                open={openAddToDoDialog}
                onClose={() => setOpenAddToDoDialog(false)}
                onSuccess={getTodos}
            />
            <UpdateSelfTodoForm
                open={openEditTodo}
                onClose={() => setOpenEditTodo(false)}
                onSuccess={getTodos}
                dataToEdit={todoToEdit} />

            <DeleteSelfTodoForm
                open={openDeleteTodo}
                onClose={() => setOpenDeleteTodo(false)}
                onDelete={() => {getTodos(); 
                    setOpenDeleteTodo(false);}}
                id={idToDelete}
                />
        </>
    );
};

export default SelfTodolist;
