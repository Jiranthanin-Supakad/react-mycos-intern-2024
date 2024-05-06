import { useForm } from "react-hook-form"
import { ITodoForm } from "./ITodoForm"
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material"

const TodoForm = () => {

    // const {newTodo} = useNewTodo()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ITodoForm>({
		defaultValues: {
			name: "",
			description: "",
			status: "todo",
		},
	})

    const newTodo = async (data: ITodoForm) => {
        return await new Promise(resolve => setTimeout(resolve, 3000))
    }
	const onFormValid = async (data: ITodoForm) => {
        await newTodo(data)
        console.log("send to api success: ", data)
	}

	const onFormInValid = (err: any) => {
		console.log("form err: ", err)
	}

	const onSubmit = handleSubmit(onFormValid, onFormInValid)

	console.log("errors errors errors: ", errors)
	return (
		<form onSubmit={onSubmit}>
			<Stack gap={2} mt={4}>
				<TextField
					error={!!errors?.name}
					label="name"
					variant="outlined"
					autoComplete="off"
					{...register("name", { required: true })}
					helperText={errors?.name ? "name is required" : ""}
				/>
				<TextField
					label="description"
					variant="outlined"
					autoComplete="off"
					{...register("description")}
					multiline
					rows={4}
				/>

				<FormControl fullWidth error={!!errors?.status}>
					<InputLabel id="status-select-label">Status</InputLabel>
					<Select
						labelId="status-select-label"
						id="status"
						label="Status"
						{...register("status", { required: true })}
                        defaultValue={""}
                        aria-describedby="select-status-helper-text"
					>
						<MenuItem value={"todo"}>Todo</MenuItem>
						<MenuItem value={"doing"}>Doing</MenuItem>
						<MenuItem value={"done"}>Done</MenuItem>
					</Select>
                    {!!errors?.status && <FormHelperText id="select-status-helper-text">please select status</FormHelperText>}
				</FormControl>
				<Button type="submit" disabled={isSubmitting}>Submit</Button>
			</Stack>
		</form>
	)
}

export default TodoForm