import { ActionIcon, Button, Divider, Drawer, Flex, Group, Select, Table, Textarea, TextInput } from '@mantine/core';
import type { EditTaskType } from '@/constants/types';
import { useAppStore } from '@/states/appState';
import { Controller, useForm, type FieldValues } from 'react-hook-form';
import { handleAsync } from '@/util/handleAsync';
import axios from 'axios';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconTrashFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import ShowCustomNotification from './ShowNotification';
import { useEffect, useState } from 'react';

export default function EditTaskDrawer({ closeOnClick }: EditTaskType) {
  const isDrawerOpened = useAppStore(state => state.isDrawerOpened)
  const setIsLoading = useAppStore(state => state.setIsLoading)
  const selectedTask = useAppStore(state => state.selectedTask)
  const closeDrawerFn = useAppStore(state => state.closeDrawerFn)

  // const getSingleTaskById = useAppStore(state => state.getSingleTaskById)

  const { handleSubmit, control } = useForm({ mode: 'all', values: selectedTask })

  // console.log('selected Task', selectedTask)

  // useEffect(() => {
  //   setCurrentTask(selectedTask)

  //   console.log('set current task', currentTask)
  // }, [])

  const updateTaskHandler = async (formData: FieldValues) => {


    const notificationArgs = {
      title: `Updating`,
      message: `Updating task ${formData.taskName}.`,
      type: 'success',
    }
    const id = ShowCustomNotification(notificationArgs)
    const [ error, data ] = await handleAsync(axios.put(`/api/tasks/${formData?.$id}`, formData))
    console.log(data)
    if (error) {
      const errorArgs = {
        title: data?.status,
        message: 'There was an error updating task',

      }

      ShowCustomNotification(errorArgs)

      setIsLoading(false)
      return
    }



    const findTaskIndex = useAppStore.getState().taskArray.findIndex(savedTask => savedTask.$id === data?.task?.$id)
    const updatedArray = useAppStore.getState().taskArray.map((savedTask, index) => {
      if (index === findTaskIndex) {
        return { ...savedTask, ...data?.task }
      }
      return savedTask
    })


    const updatedArg = {
      type: 'update',
      id,
      title: 'Updated',
      message: `Task ${formData.taskName} has been updated`,
    }

    ShowCustomNotification(updatedArg)

    useAppStore.setState({ isLoading: false, isDrawerOpened: false, taskArray: updatedArray, selectedTask: undefined })

  }

  const deleteTask = async () => {
    let notificationProperties = {
      type: 'success',
      title: `Deleting`,
      message: `Deleting task ${selectedTask.taskName}`
    }

    const notificationID = ShowCustomNotification(notificationProperties)

    const [ error, data ] = await handleAsync(axios.delete(`/api/tasks/${selectedTask.$id}`))

    if (error) {
      useAppStore.setState({ isLoading: false })
      const errorNotificationProperties = {
        title: error.status,
        message: error.message,
        type: 'error'
      }

      ShowCustomNotification(errorNotificationProperties)
      return
    }


    const removeDeletedTask = useAppStore.getState().taskArray.filter(task => task.$id != data?.data?.id)

    useAppStore.setState({ taskArray: removeDeletedTask, isDrawerOpened: false })
    const updateNotification = {
      id: notificationID,

      title: 'Completed',
      message: `Task ${selectedTask.taskName} successfully deleted`,
      type: 'update',
    }
    ShowCustomNotification(updateNotification)
  }

  return (
    <>
      <Drawer id='edit' opened={isDrawerOpened} closeOnClickOutside={false} onClose={closeDrawerFn}
        position='right' size='40rem' withCloseButton={false} withOverlay={false}

      >
        <form onSubmit={handleSubmit(updateTaskHandler)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Controller name='taskName' control={control} render={({ field }) => (
            <TextInput
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
                  <Controller name='status' control={control} render={({ field: { onChange, value } }) => {
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
                  <Controller name='type' control={control} render={({ field: { onChange, value } }) => (
                    <Select
                      variant='filled'
                      styles={{ label: { marginBottom: 10 } }}
                      data={[ 'BugFix', 'Backend', 'New Feature', 'UI/UX', 'In Progress' ]}
                      value={value}
                      onChange={onChange}
                    />
                  )} />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th bg='transparent'>Due Date</Table.Th>
                <Table.Td>
                  <Controller name='dueDate' control={control} render={({ field: { onChange, value } }) => (
                    <DatePickerInput
                      variant='filled'
                      leftSection={<IconCalendar size={18} stroke={1.5} />}
                      numberOfColumns={2}
                      styles={{ label: { marginBottom: 10 } }}
                      presets={[
                        { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                      ]}
                      value={value}
                      radius="md"
                      size="md"
                      onChange={onChange} />
                  )} />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th bg='transparent'>Priority</Table.Th>
                <Table.Td>
                  <Controller name='priority' control={control} render={({ field: { onChange, value } }) => (
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
          <Controller name='description' control={control} render={({ field: { onChange, value } }) => (
            <Textarea
              pb={40}
              h='20rem'
              rows={10}
              size="md"
              value={value}
              onChange={onChange}
            />
          )} />
          <Divider />

          <Controller name='creationDate' control={control} render={({ field: { onChange, value } }) => (
            <DatePickerInput
              variant='filled'
              leftSection={<IconCalendar size={18} stroke={1.5} />}
              numberOfColumns={2}
              styles={{ label: { marginBottom: 10 } }}
              presets={[
                { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
              ]}
              label='Scheduled Work'
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