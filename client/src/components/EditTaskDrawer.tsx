import { Drawer, Button, Text, Group, Flex, ActionIcon } from '@mantine/core';
import { TasksTable } from './TasksTable';
import { IconTrashFilled } from '@tabler/icons-react';
import type { EditTaskType } from '@/constants/types';

export default function EditTaskDrawer({ opened, close, selectedTask, closeOnClick }: EditTaskType) {


  return (
    <>
      <Drawer id='edit' opened={opened} onClose={close} closeOnClickOutside={closeOnClick}
        withOverlay={false}
        title={<Text size='xl' fw={900} c='#303030'>{selectedTask?.taskName}</Text>}
        position='right' size='40rem'>
        <form action="" method="post" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

          <TasksTable data={[ selectedTask ]} variant="vertical" />


          <Flex justify='space-between' >
            <Group>
              <Button variant='light' onClick={close}>Cancel</Button>
              <Button>Save</Button>
            </Group>
            <ActionIcon variant="filled" color="red" size="xl" radius="xl" aria-label="Settings">
              <IconTrashFilled />
            </ActionIcon>

          </Flex>
        </form>
      </Drawer>


    </>
  );
}