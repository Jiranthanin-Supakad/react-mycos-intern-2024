import { useState, useEffect, useCallback } from 'react';
import { Button, Grid } from "@mui/material";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import "./styles/SelfTodoliststyle.css";
import SelfTodoItem from "./SelfTodoItem";
import { todoApi } from "../../api/TodoApi";
import SelfTodoAddEvent from './SelfTodoPopup/SelfTodoAddEvent';

export interface ITodo {
    id?: string;
    title: string;
    description?: string;
    dueDate: string;
}

const SelfTodolist = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const getTodos = useCallback(async () => {
        try {
            const result = await todoApi.getTodos();
            setTodos(result.data);
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
                        <span className="showIncompeletetask">10</span>
                    </Button>

                    <Button id="Todaybtn" variant="outlined"
                        startIcon={<CalendarTodayOutlinedIcon sx={iconStyle} />}
                    >
                        <span className="showTodaytask">Today</span>
                        <span className="showIncompeletetask">1</span>
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
                        <FilterAltOutlinedIcon sx={{ fontSize: '2rem', color: '#35383C', marginRight: '5%' }} />
                    </div>
                    <div className="todo-list">
                        {todos.map((t) => (
                            <SelfTodoItem key={t.id} todoItem={t} />
                        ))}
                    </div>
                </div>
            </Grid>

        </Grid>
    );
};

export default SelfTodolist;
