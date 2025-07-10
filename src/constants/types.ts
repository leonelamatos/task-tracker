export type TaskType = {
  taskName: string
  description: string
  status: string
  dueDate: string
  type: string
  priority: string
  assignee: string
  creationDate: string
}

export type TableProps = {
  data: TaskType[]
  variant?: string
}

export type EditTaskType = {
    opened: boolean
    close: () => void
    selectedTask: TaskType
    closeOnClick:boolean
}