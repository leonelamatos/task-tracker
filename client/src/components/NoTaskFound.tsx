import { Button, Center, Image, Stack, Text } from "@mantine/core";
import imageUrl from '../assets/no_data_available.png'
import { useAppStore } from "@/states/appState";

export default function NoTaskFound({ isCompletedTasks }: { isCompletedTasks?: boolean }) {

    const openCreateModal = useAppStore(state => state.openCreateModalFn)

    return (
        <Center>
            <Stack>
                <Image src={imageUrl} h={200} w={200} />
                <Text>{!isCompletedTasks ? 'No task has been created yet' : 'There is not completed tasks'}</Text>
                {!isCompletedTasks && <Button onClick={openCreateModal}>Create Task</Button>}
            </Stack>
        </Center>
    )
}
