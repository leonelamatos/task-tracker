import { Accordion } from "@mantine/core";
import { TasksTable } from "./TasksTable";
import { accordionData } from "@/constants/accordionData";
import type { TaskType } from "@/constants/types";


const filterActivetasks = (data:TaskType[]) => data.filter(task => task?.status?.toLowerCase() !== 'completed')
const filterCompletedTasks = (data:TaskType[]) => data.filter(task => task?.status?.toLowerCase() === 'completed')



export default function AccordionItem() {
  const activeTasks = filterActivetasks(accordionData)
  const completedTasks = filterCompletedTasks(accordionData)

  return (

    <Accordion variant="contained" multiple defaultValue={[ 'active', 'completed' ]}>
      <Accordion.Item value="active" >
        <Accordion.Control>
          Active Task {activeTasks.length}
        </Accordion.Control>
        <Accordion.Panel>
          <TasksTable data={activeTasks} />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="completed">
        <Accordion.Control>
          Completed Task {completedTasks.length}
        </Accordion.Control>
        <Accordion.Panel>
          <TasksTable data={completedTasks} />
        </Accordion.Panel>
      </Accordion.Item>


    </Accordion>
  )
}
