import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, Text } from '@mantine/core';
import NewTaskForm from './NewTaskForm';

export default function AddNewTask() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={<Title order={2}>Create Task</Title>} centered size='55rem' withCloseButton={false}>
        <NewTaskForm/>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}