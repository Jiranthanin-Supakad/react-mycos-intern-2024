import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@mui/material";
import { todoApi } from "../../../api/TodoApi";
import "../styles/SelfTodoFormpopup.css"
import { ISelfTodoForm } from "./ISelfTodoForm";
import { useForm } from "react-hook-form";

const SelfTodoForm = ({
    open,
    onClose,
    onSuccess,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}) => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoDueDate, setTodoDueDate] = useState("");

    const onSave = async () => {
        await todoApi.addTodo({
            title: todoTitle,
            description: todoDescription,
            dueDate: todoDueDate || undefined,
        });
        onSuccess?.();
        onClose();
    }

    useEffect(() => {
        if (open) {
            setTodoTitle("");
            setTodoDescription("");
        }
    }, [open]);



    const onFormValid = async (data: ISelfTodoForm) => {
        // await newTodo(data)
        console.log("send to api success: ", data)
    }

    const onFormInValid = (err: any) => {
        console.log("form err: ", err)
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ISelfTodoForm>({
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const onSubmit = handleSubmit(onFormValid, onFormInValid)

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 5, width: 400 } }}>
            <form onSubmit={onSubmit} className="Add-Box">
                <DialogTitle id="AddtaskTitle">Add your task</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} direction="column" sx={{ marginTop: '5px' }}>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="title"
                                placeholder="Type your title ...."
                                error={!!errors?.title}
                                variant="outlined"
                                value={todoTitle}
                                autoComplete="off"
                                {...register("title", { required: true })}
                                helperText={errors?.title ? "title is required" : ""}
                                onChange={(e) => {
                                    setTodoTitle(e.target.value);
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 400,
                                        borderRadius: "10px",
                                        backgroundColor: "#F6F4F4",
                                        color: "#000000",
                                    },
                                }}
                            />

                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="description"
                                placeholder="Type your description ...."
                                variant="outlined"
                                value={todoDescription}
                                autoComplete="off"
                                multiline
                                rows={4}
                                onChange={(e) => {
                                    setTodoDescription(e.target.value);
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 400,
                                        borderRadius: "10px",
                                        backgroundColor: "#F6F4F4",
                                        color: "#000000",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                type="date"
                                variant="outlined"
                                value={todoDueDate}
                                onChange={(e) => {
                                    setTodoDueDate(e.target.value);
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 400,
                                        borderRadius: "10px",
                                        backgroundColor: "#F6F4F4",
                                        color: "#000000",
                                    },
                                }}
                            />
                        </Grid>
                        {/* <Grid item>
                            <TextField
                                fullWidth
                                type="time"
                                variant="outlined"
                                value={todoDueDate}
                                onChange={(e) => {
                                    setTodoDueDate(e.target.value);
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: 12,
                                        fontWeight: 400,
                                        borderRadius: "10px",
                                        backgroundColor: "#F6F4F4",
                                        color: "#000000",
                                    },
                                }}
                            />
                        </Grid> */}
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', margin: '2%' }}>
                    <Button type="submit" id="DoneBtn" onClick={onSave} disabled={isSubmitting}>Done</Button>
                    <Button id="CancelBtn" onClick={onClose} color="secondary">Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default SelfTodoForm
