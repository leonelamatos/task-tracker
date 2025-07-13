import type { TaskType } from '@/constants/types'
import { handleAsync } from '@/util/handleAsync'
import type { Models } from 'appwrite'
import axios from 'axios'
// import type { Mode } from 'react-hook-form'
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
    userAccount: Models.User<Models.Preferences>|undefined
    userSession: {} | undefined
    signup:boolean
    setIsLoading:(arg:boolean)=>void
    setSelectedTaskFn:(task:TaskType)=>void
    openDrawerFn:()=>void,
    closeDrawerFn:()=>void,
    openCreateModalFn:()=>void
    closeCreateModalFn: () => void
    fetchTasks: (url: string) => void
    saveTasks: (arg: TaskType) => void
    saveToStore: (arg:Record<any,any>|any) => void
}

export const useAppStore = create<AppStore>()(
    persist((set) => ({
        isLoading: true,
        isModalOpened: false,
        isDrawerOpened: false,
        selectedTask: taskSchema,
        taskArray: [],
        isUserLoggedIn: false,
        userSession: undefined,
        signup: false,
        userAccount: undefined,
        setIsLoading: (arg: boolean) => set({ isLoading: arg }),
        setSelectedTaskFn: (task) => set(state => ({ selectedTask: { ...state.selectedTask, ...task } })),
        openDrawerFn: () => set({ isDrawerOpened: true }),
        closeDrawerFn: () => set({ isDrawerOpened: false }),
        openCreateModalFn: () => set({ isModalOpened: true }),
        closeCreateModalFn: () => set({ isModalOpened: false, selectedTask: undefined }),
        fetchTasks: async (url) => {
            set({ isLoading: true })
            const [ error, data ] = await handleAsync(axios.get(url))
            if (error) {
                console.log(error)
                set({ isLoading: false })
                return error
            }
            set({ isLoading: false, taskArray: [ ...data.data ] })
            
        },
       
        saveTasks: (taskArray: TaskType) => { set(state => ({ taskArray: [ ...state.taskArray, taskArray ] })) },
        saveToStore: (arg) => { set(arg) }
    }),
    
     {
        name: 'app-state',
        storage: createJSONStorage(()=>localStorage)
        }))
    
export const saveToStore = (args:Record<any,any>) => {
        useAppStore.setState(state=>({...state,...args}))
}
    
export const removeTaskForStore = (id: string) => {
const tasksTempArr = useAppStore.getState().taskArray
    const filteredArray = tasksTempArr.filter(task => task.$id !== id)
console.log(filteredArray)
    useAppStore.setState(state => ({ taskArray: filteredArray, isDrawerOpened: false }))
    
    console.log('ARRAY UPDATED',useAppStore.getState().taskArray)
}