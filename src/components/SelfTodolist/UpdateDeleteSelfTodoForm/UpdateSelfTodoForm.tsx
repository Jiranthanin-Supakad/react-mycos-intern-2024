import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@mui/material";
import { todoApi } from "../../../api/TodoApi";
import "/Users/jiran/Documents/GitHub/react-mycos-intern-2024/src/components/SelfTodolist/styles/SelfTodoFormpopup.css"
import { useForm } from "react-hook-form";
import { ISelfTodoForm } from "../SelfTodoForm/ISelfTodoForm";
import { ITodo } from "../SelfTodolist";
import { useParams } from "react-router-dom";

const UpdateSelfTodoForm = ({
    open,
    onClose,
    onSuccess,
    dataToEdit,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    dataToEdit?: ITodo;
}) => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoDueDate, setTodoDueDate] = useState("");
    const [todo, setTodo] = useState<ITodo>();
    const { id } = useParams();

    const onSave = async () => {
        setTodo({
            id: dataToEdit?.id,
            title: todoTitle,
            description: todoDescription,
            dueDate: todoDueDate
        })
        if (dataToEdit) {
            await todoApi.updateTodo(dataToEdit.id!, {
                ...dataToEdit,
                description: todoDescription,
                title: todoTitle,
                dueDate: todoDueDate
            });
        }
        onSuccess?.();
        onClose();
        window.location.reload();
    };

    useEffect(() => {
        if (open) {
            if (dataToEdit) {
                setTodoTitle(dataToEdit.title);
                setTodoDescription(dataToEdit?.description ? dataToEdit?.description : "");
                setTodoDueDate(dataToEdit?.dueDate ? dataToEdit.dueDate : "")
            }
        }
    }, [open]);

    const newTodo = async (data: ISelfTodoForm) => {
        return await new Promise(resolve => setTimeout(resolve, 3000))
    }
    const onFormValid = async (data: ISelfTodoForm) => {
        await newTodo(data)
        console.log("send to api success: ", data)
    }

    const onFormInValid = (err: any) => {
        console.log("form err: ", err)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISelfTodoForm>({
        defaultValues: {
            title: "",
            description: "",
            dueDate: ""
        },
    })

    const onSubmit = handleSubmit(onFormValid, onFormInValid)

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 5, width: 400 } }}>
            <form onSubmit={onSubmit} className="Edit-Box">
                <DialogTitle id="AddtaskTitle">Edit your task</DialogTitle>
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
                                {...register("title", { required: !dataToEdit })} 
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
                    <Button type="submit" id="DoneBtn" onClick={onSave}>Done</Button>
                    <Button id="CancelBtn" onClick={onClose} color="secondary">Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateSelfTodoForm
