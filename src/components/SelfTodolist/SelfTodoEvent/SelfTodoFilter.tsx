import { useEffect, useState } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TextRotateVerticalTwoToneIcon from '@mui/icons-material/TextRotateVerticalTwoTone';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { Box, Grid } from '@mui/material';

const SelfTodoFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterByTitle, setFilterByTitle] = useState(false);
    const [filterByDate, setFilterByDate] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterByTitle = () => {
        setFilterByTitle(!filterByTitle);
        setFilterByDate(false);
    };

    const handleFilterByDate = () => {
        setFilterByDate(!filterByDate);
        setFilterByTitle(false);
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

    return (
        <>
            <div className='filter'>
                <div className="dropdown-title" onClick={toggleDropdown}>
                    <FilterAltOutlinedIcon sx={{ fontSize: '2rem', color: isOpen ? '#9ca1a7' : '#35383C' }} />
                    {/* <span style={{fontSize: 15, marginBottom: 0.3, color: isOpen ? '#9ca1a7' : '#35383C'}}>Filter</span> style={{display: 'flex', alignItems: "end", width:"4rem"}} */}
                </div>
                {isOpen && (
                    <div className='filter-container'>
                        <button className='filter-container-btn'>
                            <p>Title</p>
                            <TextRotateVerticalTwoToneIcon />
                            {/* <SelfTodoItem todos={filteredTodos} onFilterByTitle={handleFilterByTitle} /> */}
                        </button>
                        <button className='filter-container-btn' onClick={handleFilterByDate}>
                            <p>Date</p>
                            <EventNoteOutlinedIcon />
                        </button>
                    </div>
                )}
            </div>
        </>

    );
};

export default SelfTodoFilter;
