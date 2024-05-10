import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useState } from 'react';
import UpdateSelfTodoForm from '../UpdateSelfTodoForm/UpdateSelfTodoForm';
const SelfEditTodoEvent = ({
    onSuccess,
}: {
    onSuccess?: () => void;
}) => {
    const [openForm, setOpenForm] = useState(false);

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