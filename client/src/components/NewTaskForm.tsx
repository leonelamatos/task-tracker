import { useAppStore } from "@/states/appState";
import { handleAsync } from "@/util/handleAsync";
import ShowCustomNotification from "@/components/ShowNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Divider, Flex, Group, Select, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import axios from "axios";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import z from "zod";


const schema = z.object({
    taskName: z.string({ error: 'test' }).min(1),
    description: z.string().optional(),
    status: z.enum([ 'New Task', 'Schedule', 'In Progress', 'Completed' ]).default('New Task'),
    type: z.enum([ 'BugFix', 'Backend', 'New Feature', 'UI/UX' ]).default('New Feature'),
    creationDate: z.string().default(dayjs().format('YYYY-MM-DD')),
    dueDate: z.string().default(dayjs().format('YYYY-MM-DD')),
    priority: z.enum([ 'Critical', 'High', 'Medium', 'Low' ]).default('Low')

})

type TaskSchema = z.infer<typeof schema>

export default function NewTaskForm() {
    const closeCreateModal = useAppStore(state => state.closeCreateModalFn)
    const saveTasks = useAppStore(state => state.saveTasks)

    const { handleSubmit, formState: { errors }, control } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })


    const handleCreateTask = async (formData: TaskSchema) => {
        const notificationArgs = {
            type: 'success',
            title: `Saving task ${formData.taskName}`,
            message: 'Done',
            loading: true,
            autoClose: false,
            withCloseButton: false,
        }
        const id = ShowCustomNotification(notificationArgs)

        const [ error, data ] = await handleAsync(axios.post('/api/tasks', formData, { headers: { "Content-Type": 'application/json' } }))

        if (error) {
            const notificationArgs = {
                title: error.message,
                type: 'error',
                message: ' There was an error connecting to the server',
            }
            ShowCustomNotification(notificationArgs)
            return
        }

        setTimeout(() => {
            const updateNotification = {
                id,
                type: 'update',
                title: 'Task Saved',
                message: `Task ${formData.taskName} saved successfully`,
                loading: false,
                autoClose: 2000,
            }
            ShowCustomNotification(updateNotification)

        }, 1000);

        saveTasks(data.task)
        closeCreateModal()
    }

    return <form onSubmit={handleSubmit(handleCreateTask)}>
        <Container fluid p={20}>
            <Flex gap={20}>
                {/* <Grid.Col span={{ base: 8, md: 8 }} >  */}
                <Group flex={1} p={0}>

                    <Stack w='100%'>
                        <Title order={3}>Create Task</Title>
                        <Controller control={control} name='taskName' render={({ field: { onChange, onBlur } }) => (

                            <TextInput placeholder={!errors.taskName ? "Task Name" : 'Task name is required'} size="md" styles={{ input: { borderColor: errors.taskName ? 'red' : 'gray' } }} onChange={onChange} autoFocus onBlur={onBlur} />
                        )} />
                        <Controller control={control} name='description' render={({ field: { onChange, onBlur } }) => (
                            <Textarea
                                h='20rem'
                                rows={10}
                                size="md"
                                placeholder="Task description"
                                onChange={onChange}
                                onBlur={onBlur}
                            />)} />
                        <Divider />
                        <Group justify="flex-end" pt={10}>
                            <Button variant="subtle" color="gray" onClick={closeCreateModal}>Cancel</Button>
                            <Button type="submit">Create Task</Button>
                        </Group>
                    </Stack>
                </Group>
                <Stack justify="space-between">
                    <Controller control={control} name='type' render={({ field: { onChange } }) => (
                        <Select
                            styles={{ label: { marginBottom: 10 } }}
                            label="Type"
                            placeholder="Pick value"
                            data={[ 'BugFix', 'Backend', 'New Feature', 'UI/UX' ]}
                            defaultValue="New Feature"
                            // {...register('type')}
                            onChange={onChange}
                        />)} />
                    <Controller control={control} name='status' render={({ field: { onChange } }) => (
                        <Select
                            styles={{ label: { marginBottom: 10 } }}
                            label="Status"
                            // placeholder="Select Status"
                            data={[ 'New Task', 'Schedule', 'In Progress', 'Completed' ]}
                            defaultValue="New Task"
                            onChange={onChange}
                        // clearable
                        />)} />
                    <Controller control={control} name='creationDate' render={({ field: { onChange } }) => (
                        <DatePickerInput
                            leftSection={<IconCalendar size={18} stroke={1.5} />}
                            numberOfColumns={2}
                            styles={{ label: { marginBottom: 10 } }}
                            presets={[
                                { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                            ]}
                            defaultDate={dayjs().format('YYYY-MM-DD')}
                            placeholder="Today"
                            label="Creation Day"
                            radius="md"
                            size="md"
                            onChange={onChange}
                        />)} />

                    <Controller control={control} name='dueDate' render={({ field: { onChange } }) => (
                        <DatePickerInput
                            leftSection={<IconCalendar size={18} stroke={1.5} />}
                            styles={{ label: { marginBottom: 10 } }}
                            presets={[
                                { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                            ]}
                            // defaultValue={dayjs().format('YYYY-MM-DD')}
                            placeholder="Today"
                            label="Due Date"
                            radius="md"
                            size="md"
                            onChange={onChange}
                        />)} />

                    <Controller control={control} name='priority' render={({ field: { onChange } }) => (
                        <Select
                            styles={{ label: { marginBottom: 10 } }}
                            label="Priority"
                            placeholder="None"
                            data={[ 'Critical', 'High', 'Medium', 'Low' ]}
                            defaultValue="Low"
                            onChange={onChange}
                        />)} />
                </Stack>

            </Flex>
        </Container>
    </form>;
}
