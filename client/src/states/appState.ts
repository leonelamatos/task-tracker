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
    isLoading: boolean
    isModalOpened: boolean
    isDrawerOpened: boolean
    selectedTask: TaskType
    setIsLoading:(arg:boolean)=>void
    setSelectedTaskFn:(task:TaskType)=>void
    openDrawerFn:()=>void,
        closeDrawerFn:()=>void,
    openCreateModalFn:()=>void
    closeCreateModalFn:()=>void
}

export const useAppStore = create<AppStore>()(
    persist(set => ({
        isLoading: true,
        isModalOpened: false,
        isDrawerOpened: false,
        selectedTask: taskSchema,
        setIsLoading:(arg:boolean)=>set({isLoading:arg}),
        setSelectedTaskFn:(task)=>set({selectedTask:task}),
        openDrawerFn:()=>set({isDrawerOpened:true}),
        closeDrawerFn:()=>set({isDrawerOpened:false}),
        openCreateModalFn:()=> set({isModalOpened: true}),
        closeCreateModalFn:()=> set({isModalOpened: false})
    }), {
        name: 'app-state',
        storage: createJSONStorage(()=>localStorage)
    }))