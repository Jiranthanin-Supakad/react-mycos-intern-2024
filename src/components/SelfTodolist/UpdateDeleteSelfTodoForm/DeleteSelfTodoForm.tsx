import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@mui/material";
import { todoApi } from "../../../api/TodoApi";

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
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 5, width: 400 } }}>
            <DialogTitle>Do you want to delete it ?</DialogTitle>
            <DialogActions sx={{ justifyContent: 'center', margin: '2%' }}>
                <Button id="DeleteBtn" onClick={handleDelete}>Delete</Button>
                <Button id="CancelBtn" onClick={onClose} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>

    )
}

export default DeleteSelfTodoForm
