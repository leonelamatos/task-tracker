import { useState } from 'react';
import cx from 'clsx';
import { Badge, Box, Divider, Group, ScrollArea, Select, Table, Text, Textarea, TextInput } from '@mantine/core';
import classes from '@style/TasksTable.module.css';
import { badgeColor, priorityColors } from '@/constants/badgeColors';
import EditTaskDrawer from './EditTaskDrawer';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import type { TableProps, TaskType } from '@/constants/types';
import { useAppStore } from '@/states/appState';




export function TasksTable({ data, variant }: TableProps) {
  const [ scrolled, setScrolled ] = useState(false);
  const openDrawerFn = useAppStore(state => state.openDrawerFn)
  const setSelectedTaskFn = useAppStore(state => state.setSelectedTaskFn)


  const selectedTask = data[ 0 ]

  const rows = data.map((row) => (

    <Table.Tr key={row.$id} onClick={() => { openDrawerFn(); setSelectedTaskFn(row) }} styles={{ tr: { cursor: 'pointer' } }}>
      <Table.Td>{row.taskName}</Table.Td>
      <Table.Td>{row.description}</Table.Td>

      <Table.Td><Badge variant="light" color={badgeColor[ row.status ]}>{row.status}</Badge></Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.dueDate}</Table.Td>
      <Table.Td><Badge variant="light" color={priorityColors[ row.priority ]}>{row.priority}</Badge></Table.Td>
      <Table.Td>{row.assignee}</Table.Td>
      <Table.Td>{row.creationDate}</Table.Td>
    </Table.Tr>

  ));


  return (
    <>

      <ScrollArea h='100%' onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        {variant ?

          <>
            <Table variant="vertical" layout="fixed" withRowBorders={false} withColumnBorders={false} verticalSpacing={'lg'} mb={50}>
              <Table.Tbody>
                <Table.Tr >
                  <Table.Th bg='transparent' w='10rem'>Status</Table.Th>
                  <Table.Td>
                    <Select
                      variant='filled'
                      styles={{ label: { marginBottom: 10 } }}
                      data={[ 'New Task', 'Scheduled', 'In Progress', 'Completed' ]}
                      value={selectedTask.status}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th bg='transparent'>Type</Table.Th>
                  <Table.Td>
                    <Select
                      variant='filled'
                      styles={{ label: { marginBottom: 10 } }}
                      data={[ 'BugFix', 'Backend', 'New Feature', 'UI/UX', 'In Progress' ]}
                      value={selectedTask.type}
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th bg='transparent'>Due Date</Table.Th>
                  <Table.Td>
                    <DatePickerInput
                      variant='filled'
                      leftSection={<IconCalendar size={18} stroke={1.5} />}
                      numberOfColumns={2}
                      styles={{ label: { marginBottom: 10 } }}
                      presets={[
                        { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                      ]}
                      value={selectedTask.dueDate}
                      radius="md"
                      size="md"
                    />
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Th bg='transparent'>Assignee</Table.Th>
                  <Table.Td>
                    <TextInput size="md" variant='filled' value={selectedTask.assignee} />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th bg='transparent'>Priority</Table.Th>
                  <Table.Td>
                    <Select
                      variant='filled'
                      styles={{ label: { marginBottom: 10 } }}
                      data={[ 'Critical', 'High', 'Medium', 'Low' ]}
                      value={selectedTask.priority}
                    />
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <Divider />
            <Textarea
              pb={40}
              h='20rem'
              rows={10}
              size="md"
              value={selectedTask.description}
            />
            <Divider />

            <DatePickerInput
              variant='filled'
              leftSection={<IconCalendar size={18} stroke={1.5} />}
              numberOfColumns={2}
              styles={{ label: { marginBottom: 10 } }}
              presets={[
                { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
              ]}
              label='Scheduled Work'
              value={selectedTask.creationDate}
              radius="md"
              size="md"
              my={40}
            />
          </>

          :
          <>
            <Table miw={700} highlightOnHover>
              <Table.Thead className={cx(classes.header, { [ classes.scrolled ]: scrolled })}>
                <Table.Tr >
                  <Table.Th>Task Name</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Due Date</Table.Th>
                  <Table.Th>Priority</Table.Th>
                  <Table.Th>Assignee</Table.Th>
                  <Table.Th>Creation Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>

          </>
        }
      </ScrollArea>
    </>
  );
}