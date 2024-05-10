import { useEffect, useState } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TextRotateVerticalTwoToneIcon from '@mui/icons-material/TextRotateVerticalTwoTone';
import { ITodo } from '../SelfTodolist';

const SelfTodoFilter = ({ 
    onUpdateInnerTodo 
}: { 
    onUpdateInnerTodo: (todo: ITodo[]) => void; 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [innerTodo] = useState<ITodo[]>([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            sortTodo();
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const eventContainer = document.querySelector('.dropdown-title');
            if (eventContainer && !eventContainer.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    const sortTodo = () => {
        onUpdateInnerTodo(innerTodo); 
    };

    return (
        <>
            <div className='filter'>
                <div className="dropdown-title" onClick={toggleDropdown}>
                    <FilterAltOutlinedIcon sx={{ fontSize: '2rem', color: isOpen ? '#9ca1a7' : '#35383C' }} />
                </div>
                {isOpen && (
                    <div className='filter-container' onClick={sortTodo}>
                        <button className='filter-container-btn'>
                            <p>Title</p>
                            <TextRotateVerticalTwoToneIcon />
                        </button>
                    </div>
                )}
            </div>
        </>

    );
};

export default SelfTodoFilter;
