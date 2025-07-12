import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, Text } from '@mantine/core';
import NewTaskForm from './NewTaskForm';
import { IconPlus } from '@tabler/icons-react';
import { useAppStore } from '@/states/appState';

export default function AddNewTask() {
  const isModalOpened = useAppStore(state => state.isModalOpened)
  const openCreateModal = useAppStore(state => state.openCreateModalFn)
  const closeCreateModal = useAppStore(state => state.closeCreateModalFn)
  // const [ opened, { open, close } ] = useDisclosure(false);

  return (
    <>
      <Modal opened={isModalOpened} onClose={closeCreateModal} centered size='55rem' withCloseButton={false} closeOnClickOutside={false} styles={{ body: { padding: 0 } }}>
        <NewTaskForm />
      </Modal>

      <Button variant="default" onClick={openCreateModal} my={18} >
        <IconPlus size={15} />  Add Task
      </Button>
    </>
  );
}