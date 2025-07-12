import type { Key } from "react"

export type TaskType = {
  $id?: Key | null | undefined
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
  control?:any
}

export type EditTaskType = {
    // opened: boolean
    // close: () => void
    // selectedTask: TaskType
    closeOnClick?:boolean
}

export type DocumentsFetchRespond = {
  total: number
  documents: TaskType[]
}