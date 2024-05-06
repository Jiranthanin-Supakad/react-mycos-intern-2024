export interface ITodoForm {
    name: string
    description?: string
    status: 'todo' | 'doing' | 'done'
}