import { Button, Container, Divider, Flex, Group, Select, Stack, Textarea, TextInput, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function NewTaskForm() {
    return <form >
        <Container fluid p={20}>
            <Flex gap={20}>
                {/* <Grid.Col span={{ base: 8, md: 8 }} >  */}
                <Group flex={1} p={0}>

                    <Stack w='100%'>
                        <Title order={3}>Create Task</Title>
                        <TextInput placeholder="Task Name" size="md" />
                        <Textarea
                            h='20rem'
                            rows={10}
                            size="md"
                            placeholder="Task description"
                        />
                        <Divider />
                        <Group justify="flex-end" pt={10}>
                            <Button variant="subtle" color="gray">Cancel</Button>
                            <Button>Create Task</Button>
                        </Group>
                    </Stack>
                </Group>

                <Stack justify="space-between">
                    <Select
                        styles={{ label: { marginBottom: 10 } }}
                        label="Type"
                        placeholder="Pick value"
                        data={[ 'BugFix', 'Backend', 'New Feature', 'UI/UX', 'In Progress' ]}
                        defaultValue="New Feature"
                    />
                    <Select
                        styles={{ label: { marginBottom: 10 } }}
                        label="Status"
                        placeholder="Pick value"
                        data={[ 'New Task', 'Schedule', 'In Progress', 'Comoleted' ]}
                        defaultValue="New Task"
                    // clearable
                    />

                    <DatePickerInput
                        leftSection={<IconCalendar size={18} stroke={1.5} />}
                        numberOfColumns={2}
                        styles={{ label: { marginBottom: 10 } }}
                        presets={[
                            { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                        ]}
                        defaultDate={dayjs().format('YYYY-MM-DD')}
                        placeholder="Today"
                        label="Pick date"
                        radius="md"
                        size="md"
                    />
                    <DatePickerInput
                        leftSection={<IconCalendar size={18} stroke={1.5} />}
                        styles={{ label: { marginBottom: 10 } }}
                        presets={[
                            { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
                        ]}
                        defaultValue={dayjs().format('YYYY-MM-DD')}
                        placeholder="No due day"
                        label="Due Date"
                        radius="md"
                        size="md"
                    />

                    <Select
                        styles={{ label: { marginBottom: 10 } }}
                        label="Priority"
                        placeholder="None"
                        data={[ 'Critical', 'High', 'Medium', 'Low' ]}
                        defaultValue="React"
                    />
                </Stack>

            </Flex>
        </Container>
    </form>;
}
