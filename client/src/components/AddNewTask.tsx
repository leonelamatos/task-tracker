import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, Text } from '@mantine/core';
import NewTaskForm from './NewTaskForm';
import { IconPlus } from '@tabler/icons-react';

export default function AddNewTask() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close}  centered size='55rem' withCloseButton={false} styles={{body:{padding:0}}}>
        <NewTaskForm/>
      </Modal>

      <Button variant="default" onClick={open} >
       <IconPlus size={15}/>  Add Task
      </Button>
    </>
  );
}