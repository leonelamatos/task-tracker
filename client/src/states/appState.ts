import type { TaskType } from '@/constants/types'
import { handleAsync } from '@/util/handleAsync'
import axios from 'axios'
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
    taskArray: TaskType[]
    setIsLoading:(arg:boolean)=>void
    setSelectedTaskFn:(task:TaskType)=>void
    openDrawerFn:()=>void,
        closeDrawerFn:()=>void,
    openCreateModalFn:()=>void
    closeCreateModalFn: () => void
    fetchTasks: (url: string) => void
    saveTasks:(arg:TaskType)=>void
    
}

export const useAppStore = create<AppStore>()(
    persist((set) => ({
        isLoading: true,
        isModalOpened: false,
        isDrawerOpened: false,
        selectedTask: taskSchema,
        taskArray:[],
        setIsLoading:(arg:boolean)=>set({isLoading:arg}),
        setSelectedTaskFn:(task)=>set({selectedTask:task}),
        openDrawerFn:()=>set({isDrawerOpened:true}),
        closeDrawerFn:()=>set({isDrawerOpened:false}),
        openCreateModalFn:()=> set({isModalOpened: true}),
        closeCreateModalFn: () => set({ isModalOpened: false }),
        fetchTasks: async (url) => {
            set({isLoading: true})
            const [ error, data]  = await handleAsync(axios.get(url))
            if (error) {
                console.log(error)
            set({isLoading: false})
                return error
            }
            set({ isLoading: false, taskArray: [...data.data ]})
            
        },
        saveTasks:(taskArray:TaskType)=>{set(state=>({taskArray:[...state.taskArray, taskArray]}))}
    }), {
        name: 'app-state',
        storage: createJSONStorage(()=>localStorage)
    }))