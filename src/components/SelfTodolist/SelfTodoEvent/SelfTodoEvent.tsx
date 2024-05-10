import { useState, useEffect, useRef } from "react";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import UpdateSelfTodoForm from "../UpdateDeleteSelfTodoForm/UpdateSelfTodoForm";
import { ITodo } from "../SelfTodolist";

const SelfTodoEvent = ({
    onSuccess,
    onDelete
}: {
    onSuccess: () => void;
    onDelete: () => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null); 

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <>
            <div className="event" ref={dropdownRef}>
                <div className="event-title" onClick={toggleDropdown}>
                    <MoreHorizOutlinedIcon sx={{ color: isOpen ? '#9ca1a7' : '#35383C' }} />
                </div>
                {isOpen && (
                    <div className='event-container'>
                        <button onClick={onSuccess}>
                            <span>Edit</span>
                            <ModeEditOutlinedIcon sx={{ fontSize: '1rem' }} />
                            <UpdateSelfTodoForm open={openForm} onClose={handleCloseForm} onSuccess={onSuccess} />
                        </button>
                        <button onClick={onDelete}>
                            <span>Delete</span>
                            <DeleteOutlinedIcon sx={{ fontSize: '1rem' }} />
                            {/* <DeleteSelfTodoForm open={openForm} onClose={handleCloseForm} onDelete={onDelete}/> */}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SelfTodoEvent;



