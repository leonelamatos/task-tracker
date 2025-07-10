import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, UnstyledButton, Text, Group, Flex, ActionIcon } from '@mantine/core';
import { TasksTable } from './TasksTable';
import { IconTrashFilled } from '@tabler/icons-react';

export default function EditTaskDrawer({ opened, close, selectedTask, closeOnClick }) {


  return (
    <>
      <Drawer opened={opened} onClose={close} closeOnClickOutside={closeOnClick} withOverlay={false} title={<Text size='xl' fw={900} c='#303030'>{selectedTask.taskName}</Text>} position='right' size='40rem' >
        {/* Drawer content */}
        <form action="" method="post">
          <TasksTable data={[ selectedTask ]} variant="vertical" />

          <Flex justify='space-between'>
            <Group>
              <Button variant='light'>Cancel</Button>
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