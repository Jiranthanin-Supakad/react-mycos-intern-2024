import { Checkbox, Grid } from '@mui/material';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import "./styles/SelfTodoItemstyle.css";
import { useState } from 'react';
import { ITodo } from './SelfTodolist';

interface ITodoItemProps {
    todoItem: ITodo;
}

const SelfTodoItem = (props: ITodoItemProps) => {
    const { todoItem } = props;
    const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);

    return (
        <div className="ActitiesCard">
            {/* <FormControlLabel
                    control={
                    <Checkbox
                        icon={<RadioButtonUncheckedOutlinedIcon />}
                        checkedIcon={<RadioButtonCheckedOutlinedIcon />}
                    />
                    }
                    label="Your Label Title - Your Label Description"
                    /> */}
            <Checkbox
                icon={<RadioButtonUncheckedOutlinedIcon />}
                checkedIcon={<RadioButtonCheckedOutlinedIcon />}
                style={{ padding: '3%' }}
            />
            <div className="ActitiesDetail">
                <p className='Title'>{innerTodo.title}</p>
                <p className='Description'>{innerTodo.description}</p>
                <span>
                    <CalendarMonthOutlinedIcon sx={{ fontSize: '1rem', color: '#35383C' }} />
                    <span className='DueDate'>{innerTodo.dueDate}</span>
                </span>
                <span>
                    <AlarmOutlinedIcon sx={{ fontSize: '1rem', color: '#35383C' }} />
                    <span className='DueTime'>9.35 AM</span>
                </span>
            </div>
            <div className="more-icon">
                <MoreHorizOutlinedIcon />
            </div>
        </div>

    );
};

export default SelfTodoItem;
