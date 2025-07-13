import { Accordion,  LoadingOverlay } from "@mantine/core";
import { TasksTable } from "./TasksTable";
import type { TaskType } from "@/constants/types";
import TaskCount from "./TaskCount";
import NoTaskFound from "./NoTaskFound";
import { useAppStore } from "@/states/appState";
import EditTaskDrawer from "./EditTaskDrawer";
import { useEffect } from "react";

export const filterActivetasks = (data: TaskType[]) => data?.filter(task => task?.status?.toLowerCase() !== 'completed')
export const filterCompletedTasks = (data: TaskType[]) => data?.filter(task => task?.status?.toLowerCase() === 'completed')

export default function AccordionItem() {

  const isLoading = useAppStore(state => state.isLoading)
  const fetchTasks = useAppStore(state => state.fetchTasks)
  const taskArray = useAppStore(state => state.taskArray)

  useEffect(() => {
    fetchTasks('/api/tasks')

  }, [])

  const activeTasks = filterActivetasks(taskArray)
  const completedTasks = filterCompletedTasks(taskArray)

  return (
    <>

      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

      <EditTaskDrawer />

      <Accordion variant="contained" multiple defaultValue={[ 'active', 'completed' ]}>
        <Accordion.Item value="active" >
          <Accordion.Control >
            Active Task <TaskCount value={activeTasks} />
          </Accordion.Control>
          <Accordion.Panel>
            {
              !activeTasks?.length ? <NoTaskFound /> : <TasksTable data={activeTasks} />
            }

          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="completed">
          <Accordion.Control>
            Completed Task <TaskCount value={completedTasks} />
          </Accordion.Control>
          <Accordion.Panel>
            {
              !taskArray?.length ? <NoTaskFound isCompletedTasks /> : <TasksTable data={completedTasks} />
            }

          </Accordion.Panel>
        </Accordion.Item>


      </Accordion>
    </>

  )
}
