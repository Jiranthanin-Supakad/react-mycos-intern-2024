import { Button, Grid } from "@mui/material";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "./styles/SelfTodoliststyle.css";
import SelfTodoItem from "./SelfTodoItem";

const SelfTodolist = () => {
    const iconStyle = {
        color: '#F8F8F8',
        backgroundColor: '#393939',
        borderRadius: '50%',
        padding: '5px',
    };

    return (
        <Grid container spacing={2}>
            {/* //Grid left */}
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="box-left">
                    <h1>Today</h1>
                    <p>23 April 2024. Tuesday</p>
                    <Button id="Allbtn" variant="outlined"
                        startIcon={<Inventory2OutlinedIcon sx={iconStyle} />
                        }>
                        <span className="showAlltask">All</span>
                        <span className="showIncompeletetask">10</span>
                    </Button>

                    <Button id="Todaybtn" variant="outlined"
                        startIcon={<CalendarTodayOutlinedIcon sx={iconStyle} />
                        }>
                        <span className="showTodaytask">Today</span>
                        <span className="showIncompeletetask">1</span>
                    </Button>
                </div>

                <div className="AddTaskBox">
                    <Button id="AddTaskBtn" variant="outlined"
                        startIcon={<AddCircleOutlineOutlinedIcon sx={{ color: '#FFFFFF', fontSize: '0.9rem' }} />
                        }>
                        <span className="AddTask">Add new task</span>
                    </Button>
                </div>
            </Grid>

            {/* //Grid right */}
            <SelfTodoItem />
        </Grid>
    );
};

export default SelfTodolist;
