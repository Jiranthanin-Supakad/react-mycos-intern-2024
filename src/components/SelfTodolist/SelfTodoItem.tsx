import { Checkbox, Grid } from '@mui/material';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import "./styles/SelfTodoItemstyle.css";

const SelfTodoItem = () => {
    return (
        <Grid item xs={12} md={9} className="full-height">
            <div className="box-right">
                <h1>All</h1>
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
                        <p className='Title'>อย่าลืมสั่งข้าวๆๆๆ</p>
                        <p className='Description'>กินข้าวกะเพราไก่+ไข่ดาว</p>
                        <span>
                            <CalendarMonthOutlinedIcon sx={{ fontSize: '1rem', color: '#35383C' }} />
                            <span className='DueDate'>16/04/2024</span>
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
            </div>
        </Grid>

    );
};

export default SelfTodoItem;
