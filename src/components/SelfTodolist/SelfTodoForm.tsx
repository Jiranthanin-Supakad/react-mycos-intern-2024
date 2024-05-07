import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import "./styles/SelfTodoFormpopup.css"

const SelfTodoForm = ({
    open,
    onClose,
    onSuccess,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}) => {
    const [todoName, setTodoName] = useState("");
    const [todoDetail, setTodoDetail] = useState("");
    const [todoDueDate, setTodoDueDate] = useState("");

    const onSave = async () => {
        await todoApi.addTodo({
            title: todoName,
            description: todoDetail,
            dueDate: todoDueDate
        });
        onSuccess?.();
        onClose();
    };

    useEffect(() => {
        if (open) {
            setTodoName("");
            setTodoDetail("");
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>TODO</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} direction={"column"}>
                    <Grid item>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={todoName}
                            onChange={(e) => {
                                setTodoName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Detail"
                            variant="outlined"
                            value={todoDetail}
                            onChange={(e) => {
                                setTodoDetail(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Date"
                            type="date"
                            variant="outlined"
                            value={todoDueDate}
                            onChange={(e) => {
                                setTodoDueDate(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Time"
                            type="time"
                            variant="outlined"
                            value={todoDueDate}
                            onChange={(e) => {
                                setTodoDueDate(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSave}>Save</Button>
                <Button onClick={onClose} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SelfTodoForm;
