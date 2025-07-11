import type { TaskType } from "@/constants/types";
import { Badge, Text } from "@mantine/core";

export default function TaskCount({ value }: { value: TaskType[] }) {
    return <Badge variant="light" ml={10} bg='#c2c2c263' c="gray" autoContrast><Text fw='bolder'>{value?.length}</Text></Badge>
}
