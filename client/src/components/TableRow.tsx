import { badgeColor, priorityColors } from "@/constants/badgeColors";
import type { TaskType } from "@/constants/types";
import { useAppStore } from "@/states/appState";
import { Badge, Table } from "@mantine/core";


export default function TableRow({ data }: { data: TaskType[] }) {
    const openDrawerFn = useAppStore(state => state.openDrawerFn)
    const setSelectedTaskFn = useAppStore(state => state.setSelectedTaskFn)
    return data.map((row) => (
        <Table.Tr key={row?.$id} onClick={() => {
            setSelectedTaskFn(row)
            openDrawerFn(row)
        }} styles={{ tr: { cursor: 'pointer' } }}>
            <Table.Td>{row?.taskName}</Table.Td>
            <Table.Td>{row?.description}</Table.Td>

            <Table.Td><Badge variant="light" color={badgeColor[ row?.status ]}>{row?.status}</Badge></Table.Td>
            <Table.Td>{row?.type}</Table.Td>
            <Table.Td>{row?.dueDate}</Table.Td>
            <Table.Td><Badge variant="light" color={priorityColors[ row?.priority ]}>{row?.priority}</Badge></Table.Td>
            <Table.Td>{row?.assignee}</Table.Td>
            <Table.Td>{row?.creationDate}</Table.Td>
        </Table.Tr>
    ));
}
