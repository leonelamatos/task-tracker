import { Button, Container, Divider, Grid, Group, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React from "react";

export default function NewTaskForm() {
    return <form>
        <Container fluid>
            <Grid gutter='sm'>
                <Grid.Col span={{ base: 8, md: 8 }}> 
                    <Stack >
                        <TextInput placeholder="Task Name" size="md"/>
                        <Textarea
                            h='20rem'
                            rows={10}
                            size="md"
                            placeholder="Task description"
                        />
                    </Stack>
                    <Divider/>
                    <Group justify="flex-end" py={20}>
                        <Button variant="subtle" color="gray">Cancel</Button>
                        <Button>Create Task</Button>
                    </Group>
                    
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                        label="Type"
                        placeholder="Pick value"
                        data={['BugFix', 'Backend', 'New Feature', 'UI/UX']}
                        defaultValue="React"
                    />
                    <Select
                        label="Status"
                        placeholder="Pick value"
                        data={['New Task', 'Schedule', 'In Progress', 'Comoleted']}
                        defaultValue="New Task"
                        // clearable
                    />

                    <DatePickerInput
                        defaultValue='today'
                        placeholder="Today"
                        label="Pick date"
                        radius="md"
                        size="md"
                    />
                    <DatePickerInput
                        defaultValue='none'
                        placeholder="No due day"
                        label="Due Date"
                        radius="md"
                        size="md"
                    />

                     <Select
                        label="Priority"
                        placeholder="None"
                        data={['Critical', 'High', 'Medium', 'Low']}
                        defaultValue="React"
                    />
                </Grid.Col>
            </Grid>
      </Container>
  </form>;
}
