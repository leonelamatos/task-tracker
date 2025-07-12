import { useState } from 'react';
import cx from 'clsx';
import { ScrollArea, Table, } from '@mantine/core';
import classes from '@style/TasksTable.module.css';
import type { TableProps } from '@/constants/types';
import TableRow from './TableRow';

export function TasksTable({ data }: TableProps) {
  const [ scrolled, setScrolled ] = useState(false);



  return (
    <ScrollArea h='100%' onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
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
        <Table.Tbody><TableRow data={data} /></Table.Tbody>
      </Table>
    </ScrollArea>
  );
}