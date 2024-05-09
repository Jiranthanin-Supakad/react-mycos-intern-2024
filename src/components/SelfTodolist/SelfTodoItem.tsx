import { Checkbox } from '@mui/material';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import "./styles/SelfTodoItemstyle.css";
import { useState } from 'react';
import { ITodo } from './SelfTodolist';
import SelfTodoEvent from './SelfTodoEvent/SelfTodoEvent';
import { todoApi } from '../../api/TodoApi';

interface ITodoItemProps {
    todoItem: ITodo;
}

const SelfTodoItem = ({
    props,
    onEdit,
    onDelete,
    sentId
}: {
    props: ITodo;
    onEdit: (todo: ITodo) => void;
    onDelete: () => void;
    sentId: (id: string) => void;
}) => {
    const todoItem = { ...props };
    const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);

    function handleSuccess(): void {
        try {
            onEdit(innerTodo);
        } catch {
            throw new Error("Function not implemented.");
        }
    }

    const handleDelete = async () => {
        try {
            // await todoApi.deleteTodo(innerTodo.id!)
            sentId(innerTodo.id!)
        } catch {
            throw new Error("This todo doesn't exist.");
        } finally {
            onDelete();
        }
    }

    return (
        <>
            <div className="ActitiesCard">
                <Checkbox
                    icon={<RadioButtonUncheckedOutlinedIcon />}
                    checkedIcon={<RadioButtonCheckedOutlinedIcon />}
                    style={{ margin: '1% 2%' }}
                />
                <div className="ActitiesDetail">
                    <p className='Title'>{innerTodo.title}</p>
                    <p className='Description'>{innerTodo.description}</p>
                    <span>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: '1rem', color: '#35383C' }} />
                        <span className='DueDate'>{innerTodo.dueDate}</span>
                    </span>
                    {/* <span>
                        <AlarmOutlinedIcon sx={{ fontSize: '1rem', color: '#35383C' }} />
                        <span className='DueTime'>9.35 AM</span>
                    </span> */}
                </div>
                <div className="more-icon">
                    <SelfTodoEvent onSuccess={handleSuccess} onDelete={handleDelete} />
                </div>
            </div>
        </>
    );
};

export default SelfTodoItem;
