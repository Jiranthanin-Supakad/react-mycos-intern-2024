import React, { useState } from "react";
import { Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SelfTodoForm from "../SelfTodoForm/SelfTodoForm";


const SelfTodoAddEvent = ({
    onSuccess,
}: {
    onSuccess?: () => void;
}) => {
    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    return (
        <>
            <Button id="AddTaskBtn" variant="outlined"
                onClick={handleOpenForm}
                startIcon={<AddCircleOutlineOutlinedIcon
                    sx={{ color: '#FFFFFF', fontSize: '0.9rem' }} />}
            >
                <span className="AddTask">Add new task</span>
            </Button>
            <SelfTodoForm open={openForm} onClose={handleCloseForm} onSuccess={onSuccess} />
        </>
    );
}

export default SelfTodoAddEvent;
