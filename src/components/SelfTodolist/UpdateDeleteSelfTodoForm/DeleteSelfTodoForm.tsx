import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { todoApi } from "../../../api/TodoApi";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const DeleteSelfTodoForm = ({
    open,
    onClose,
    onDelete,
    id
}: {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    id: string;
}) => {

    const handleDelete = async () => {
        try {
            await todoApi.deleteTodo(id)
        } catch {
            throw new Error("This todo doesn't exist.");
        } finally {
            onDelete();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 5, width: 350 , backgroundColor:'#F7C3BC'} }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'5%'}}>
                <ErrorOutlineOutlinedIcon sx={{fontSize:'6rem', color:'#750909'}}/>
            </div>
            <DialogTitle id="EdittaskTitle">Do you want to delete it ?</DialogTitle>
            <DialogActions sx={{ justifyContent: 'center', margin: '2%' }}>
                <Button id="DeleteBtn" onClick={handleDelete}>Delete</Button>
                <Button id="CancelBtn" onClick={onClose} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>

    )
}

export default DeleteSelfTodoForm
