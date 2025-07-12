import { ActionIcon, Button, CheckIcon, Divider, Drawer, Flex, Group, Select, Table, Textarea, TextInput } from '@mantine/core';
import type { EditTaskType } from '@/constants/types';
import { useAppStore } from '@/states/appState';
import { Controller, useForm, type FieldValues } from 'react-hook-form';
import { notifications } from '@mantine/notifications';
import { handleAsync } from '@/util/handleAsync';
import axios from 'axios';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconTrashFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';

export default function EditTaskDrawer({ closeOnClick }: EditTaskType) {
  const isDrawerOpened = useAppStore(state => state.isDrawerOpened)
  const setIsLoading = useAppStore(state => state.setIsLoading)
  const selectedTask = useAppStore(state => state.selectedTask)
  const closeDrawerFn = useAppStore(state => state.closeDrawerFn)

  const { handleSubmit, control } = useForm({})

  const updateTaskHandler = async (formData: FieldValues) => {

    setIsLoading(true)
    const [ error, data ] = await handleAsync(axios.put(`http://localhost:3000/tasks/${formData?.$id}`, formData))

    if (error) {
      notifications.show({
        title: data?.data?.status,
        message: 'There was an error updating task',
        position: 'top-center',
        color: "red",
        style: { background: '#f1d9d9' },
        withCloseButton: true,
        onClose: () => console.log('unmounted'),
        onOpen: () => console.log('mounted'),
        autoClose: 10000,
      })

      setIsLoading(false)
      return error
    }

    console.log('return Data', data)
    const findTaskIndex = useAppStore.getState().taskArray.findIndex(savedTask => savedTask.$id === data?.data.task?.$id)
    const updatedArray = useAppStore.getState().taskArray.map((savedTask, index) => {
      if (index === findTaskIndex) {
        return { ...savedTask, ...data?.data.task }
      }
      return savedTask
    })
    notifications.show({
      id: 'success',
      position: 'top-center',
      color: "green",
      style: { background: '#e8f5e9' },
      withCloseButton: true,
      onClose: () => console.log('unmounted'),
      onOpen: () => console.log('mounted'),
      autoClose: 5000,
      icon: <CheckIcon size={18} />,
      title: data?.data?.status,
      message: 'Task has saved successfully.',
    });
    useAppStore.setState({ isLoading: false, isDrawerOpened: false, taskArray: updatedArray, selectedTask: undefined })

  }

  const deleteTask = async () => {
    useAppStore.setState({ isLoading: true })
    const [ error, { data } ] = await handleAsync(axios.delete(`http://localhost:300/tasks/${selectedTask.$id}`))
    if (error) {
      console.log(error)
      useAppStore.setState({ isLoading: false })
      return error
    }

    useAppStore.setState({ isLoading: false })
    const removeDeletedTask = useAppStore.getState().taskArray.filter(task => task.$id != data?.$id)
    console.log('return Data', data)
    useAppStore.setState({ isLoading: false, isDrawerOpened: false, taskArray: removeDeletedTask })
  }

  return (
    <>
      <Drawer id='edit' opened={isDrawerOpened} closeOnClickOutside={closeOnClick} onClose={closeDrawerFn}
        position='right' size='40rem' withCloseButton={false}

      >
        <form onSubmit={handleSubmit(updateTaskHandler)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Controller name='taskName' control={control} render={({ field }) => (
            <TextInput
              placeholder={field.value}
              variant='transparent'
              styles={{ label: { marginBottom: 10 } }}
              value={field.value}
              onChange={field.onChange}
              fw='bolder'
              size='25'
              p='3'
            />

          )} />
          <Table variant="vertical" layout="fixed" withRowBorders={false} withColumnBorders={false} verticalSpacing={'lg'} mb={50}>
            <Table.Tbody>
              <Table.Tr >
                <Table.Th bg='transparent' w='10rem'>Status</Table.Th>
                <Table.Td>
                  <Controller defaultValue={selectedTask?.status} name='status' control={control} render={({ field: { onChange, value, name } }) => {
                    return <Select
                      variant='filled'
                      styles={{ label: { marginBottom: 10 } }
                      }
                      data={[ 'New Task', 'Scheduled', 'In Progress', 'Completed' ]}
                      value={value}
                      onChange={onChange} />

                  }} />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th bg='transparent'>Type</Table.Th>
                <Table.Td>
                  <Controller defaultValue={selectedTask?.type} name='type' control={control} render={({ field: { onChange } }) => (
                    <Select
                      variant='filled'
                      styles={{ label: { marginBottom: 10 } }}
                      data={[ 'BugFix', 'Backend', 'New Feature', 'UI/UX', 'In Progress' ]}
                      value={selectedTask?.type}
                      onChange={onChange}
                    />
                  )} />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th bg='transparent'>Due Date</Table.Th>
                <Table.Td>
                  <Controller defaultValue={selectedTask?.dueDate} name='dueDate' control={control} render={({ field: { onChange } }) => (
                    <DatePickerInput
                      variant='filled'
                      leftSection={<IconCalendar size={18} stroke={1.5} />}
                      numberOfColumns={2}
                      styles={{ label: { marginBottom: 10 } }}
                      presets={[
                        { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                      ]}
                      value={selectedTask?.dueDate}
                      radius="md"
                      size="md"
                      onChange={onChange} />
                  )} />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th bg='transparent'>Priority</Table.Th>
                <Table.Td>
                  <Controller defaultValue={selectedTask?.priority} name='priority' control={control} render={({ field: { onChange, value } }) => (
                    <Select
                      variant='filled'
                      styles={{ label: { marginBottom: 10 } }}
                      data={[ 'Critical', 'High', 'Medium', 'Low' ]}
                      // value={value}
                      defaultValue={value}
                      onChange={onChange}
                    />
                  )} />
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>

          <Divider />
          <Controller defaultValue={selectedTask?.description} name='description' control={control} render={({ field: { onChange } }) => (
            <Textarea
              pb={40}
              h='20rem'
              rows={10}
              size="md"
              value={selectedTask?.description}
              onChange={onChange}
            />
          )} />
          <Divider />

          <Controller defaultValue={selectedTask?.creationDate} name='creationDate' control={control} render={({ field: { onChange, value } }) => (
            <DatePickerInput
              variant='filled'
              leftSection={<IconCalendar size={18} stroke={1.5} />}
              numberOfColumns={2}
              styles={{ label: { marginBottom: 10 } }}
              presets={[
                { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
              ]}
              label='Scheduled Work'
              defaultValue={selectedTask?.creationDate}
              value={value}
              radius="md"
              size="md"
              my={40}
              onChange={onChange}
            />
          )} />

          <Flex justify='space-between' >
            <Group>
              <Button variant='light' onClick={closeDrawerFn}>Cancel</Button>
              <Button type='submit'>Save</Button>
            </Group>
            <ActionIcon variant="filled" color="red" size="xl" radius="xl" aria-label="Settings" onClick={() => deleteTask()}>
              <IconTrashFilled />
            </ActionIcon >

          </Flex >
        </form >
      </Drawer >


    </>
  );
}