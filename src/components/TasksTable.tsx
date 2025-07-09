import { useState } from 'react';
import cx from 'clsx';
import { Badge, ScrollArea, Table } from '@mantine/core';
import classes from '@style/TasksTable.module.css';
import { badgeColor, priorityColors } from '@/constants/badgeColors';



export function TasksTable({data}) {
  const [ scrolled, setScrolled ] = useState(false);
  
  const rows = data.map((row) => (
    <Table.Tr key={row.taskName}>
      <Table.Td>{row.taskName}</Table.Td>
      <Table.Td>{row.description}</Table.Td>

      <Table.Td><Badge variant="light" color={badgeColor[row.status]}>{row.status}</Badge></Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.dueDate}</Table.Td>
      <Table.Td><Badge variant="light" color={priorityColors[row.priority.toLowerCase()]}>{row.priority}</Badge></Table.Td>
      <Table.Td>{row.assignee}</Table.Td>
      <Table.Td>{row.creationDate}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={600} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700} highlightOnHover>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
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
    </ScrollArea>
  );
}