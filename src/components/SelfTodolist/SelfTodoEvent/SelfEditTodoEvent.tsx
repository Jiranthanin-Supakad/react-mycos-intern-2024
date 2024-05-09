import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import UpdateSelfTodoForm from "../UpdateDeleteSelfTodoForm/UpdateSelfTodoForm";
import { useState } from 'react';
import { ITodo } from '../SelfTodolist';
const SelfEditTodoEvent = ({
    onSuccess,
}: {
    onSuccess?: () => void;
}) => {
    const [openForm, setOpenForm] = useState(false);
    const [todos, setTodos] = useState<ITodo[]>([]);

    const handleCloseForm = () => {
        setOpenForm(false);
    };
    return (
        <>
            <span>Edit</span>
            <ModeEditOutlinedIcon sx={{ fontSize: '1rem' }} />
            <UpdateSelfTodoForm open={openForm} onClose={handleCloseForm} onSuccess={onSuccess} />
        </>
    )
}

export default SelfEditTodoEvent