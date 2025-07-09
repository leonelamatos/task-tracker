import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, UnstyledButton } from '@mantine/core';

export default function EditTaskDrawer({opened,close, selectedTask}) {


  return (
    <>
      <Drawer opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
        {selectedTask.taskName}
      </Drawer>

  
    </>
  );
}