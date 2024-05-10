import { Checkbox } from '@mui/material';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import "./styles/SelfTodoItemstyle.css";
import { useCallback, useEffect, useState } from 'react';
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
    sentId,
    onCheck
}: {
    props: ITodo;
    onEdit: (todo: ITodo) => void;
    onDelete: () => void;
    sentId: (id: string) => void;
    onCheck: () => void;
}) => {
    const todoItem = { ...props };
    const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);
    const [isChecked, setIsChecked] = useState(false);

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

    // const handleCheckboxChange = async () => {
    //     try{
    //         await todoApi.updateTodo(innerTodo.id!, 
    //             {
    //                 ...innerTodo,
    //                 status: isChecked ? "Incomplete" : "Complete"
    //             })
    //     } catch {
    //         throw new Error("Update status fail")
    //     } finally {
    //         setIsChecked(!isChecked);
    //         onCheck(!isChecked);
    //     }
    // }

    const handleCheckboxChange = async () => {
        try {
            const updatedTodo = {
                ...innerTodo,
                status: isChecked ? "Incomplete" : "Complete"
            };
    
            await todoApi.updateTodo(innerTodo.id!, updatedTodo);
            // setInnerTodo(updatedTodo);
            setIsChecked(!isChecked);
            onCheck();
        } catch (error) {
            console.error("Update status failed:", error);
        }
    };

    const checkBox = () => {
        if (innerTodo.status === "Complete")
            setIsChecked(true);
    }

    useEffect(() => {
        checkBox();
    }, []);

    // useEffect(() => {
    //     if (open) {
    //         if (dataToEdit) {
    //             setTodoTitle(dataToEdit.title);
    //             setTodoDescription(dataToEdit?.description ? dataToEdit?.description : "");
    //             setTodoDueDate(dataToEdit?.dueDate ? dataToEdit.dueDate : "")
    //         }
    //     }
    // }, [open]);


    return (
        <>
            <div className="ActitiesCard">
                <Checkbox
                    icon={<RadioButtonUncheckedOutlinedIcon />}
                    checkedIcon={<RadioButtonCheckedOutlinedIcon />}
                    style={{ margin: '1% 2%' }}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className={`ActitiesDetail`} style={{textDecoration: isChecked ? 'line-through' : 'none'}}>
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
