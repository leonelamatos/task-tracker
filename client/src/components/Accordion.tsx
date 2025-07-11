import { Accordion, Badge, LoadingOverlay, Text } from "@mantine/core";
import { TasksTable } from "./TasksTable";
import { accordionData } from "@/constants/accordionData";
import type { TaskType } from "@/constants/types";
import useFetch from "@/hooks/useFetchTask";
import NoDataFound from "./NoTaskFound";
import TaskCount from "./TaskCount";
import NoTaskFound from "./NoTaskFound";
import { useAppStore } from "@/states/appState";
import EditTaskDrawer from "./EditTaskDrawer";


const filterActivetasks = (data: TaskType[]) => data?.filter(task => task?.status?.toLowerCase() !== 'completed')
const filterCompletedTasks = (data: TaskType[]) => data?.filter(task => task?.status?.toLowerCase() === 'completed')



export default function AccordionItem() {

  // const isModalOpened = useAppStore(state => state.isModalOpened)

  const { loading, error, value } = useFetch('http://localhost:3000/tasks')
  const activeTasks = filterActivetasks(value)
  const completedTasks = filterCompletedTasks(value)

  return (
    <>

      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <EditTaskDrawer closeOnClick={false} />

      <Accordion variant="contained" multiple defaultValue={[ 'active', 'completed' ]}>
        <Accordion.Item value="active" >
          <Accordion.Control >
            Active Task <TaskCount value={activeTasks} />
          </Accordion.Control>
          <Accordion.Panel>
            {
              !value?.length ? <NoTaskFound /> : <TasksTable data={activeTasks} />
            }

          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="completed">
          <Accordion.Control>
            Completed Task <TaskCount value={completedTasks} />
          </Accordion.Control>
          <Accordion.Panel>
            {
              !value?.length ? <NoTaskFound isCompletedTasks /> : <TasksTable data={completedTasks} />
            }

          </Accordion.Panel>
        </Accordion.Item>


      </Accordion>
    </>

  )
}
