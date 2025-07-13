import { badgeColor, priorityColors } from "@/constants/badgeColors";
import type { TaskType } from "@/constants/types";
import { useAppStore } from "@/states/appState";
import { Badge, Table } from "@mantine/core";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from "dayjs";
dayjs.extend(localizedFormat)


export default function TableRow({ data }: { data: TaskType[] }) {
    const openDrawerFn = useAppStore(state => state.openDrawerFn)
    const setSelectedTaskFn = useAppStore(state => state.setSelectedTaskFn)
    return data.map((row) => (
        <Table.Tr key={row?.$id} onClick={() => {
            setSelectedTaskFn(row)
            openDrawerFn()
        }} styles={{ tr: { cursor: 'pointer' } }}>
            <Table.Td>{row?.taskName}</Table.Td>
            <Table.Td>{row?.description}</Table.Td>

            <Table.Td><Badge variant="light" color={badgeColor[ row?.status ]}>{row?.status}</Badge></Table.Td>
            <Table.Td>{row?.type}</Table.Td>
            <Table.Td>{dayjs(row?.dueDate).format('LL')}</Table.Td>
            <Table.Td><Badge variant="light" color={priorityColors[ row?.priority ]}>{row?.priority}</Badge></Table.Td>
            <Table.Td>{row?.assignee}</Table.Td>
            <Table.Td>{dayjs(row?.creationDate).format('LL')}</Table.Td>
        </Table.Tr>
    ));
}
