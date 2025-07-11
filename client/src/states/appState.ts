import type { TaskType } from '@/constants/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const taskSchema = {
            taskName: '',
            description: '',
            status: '',
            dueDate: '',
            type: '',
            priority: '',
            assignee: '',
            creationDate: ''
}
        
type AppStore = {
    isModalOpened: boolean
    isDrawerOpened: boolean
    selectedTask: TaskType
    setSelectedTaskFn:(task:TaskType)=>void
    openDrawerFn:()=>void,
        closeDrawerFn:()=>void,
    openCreateModalFn:()=>void
    closeCreateModalFn:()=>void
}

export const useAppStore = create<AppStore>()(
    persist(set => ({
        isModalOpened: false,
        isDrawerOpened: false,
        selectedTask: taskSchema,
        setSelectedTaskFn:(task)=>set({selectedTask:task}),
        openDrawerFn:()=>set({isDrawerOpened:true}),
        closeDrawerFn:()=>set({isDrawerOpened:false}),
        openCreateModalFn:()=> set({isModalOpened: true}),
        closeCreateModalFn:()=> set({isModalOpened: false})
    }), {
        name: 'app-state',
        storage: createJSONStorage(()=>localStorage)
    }))