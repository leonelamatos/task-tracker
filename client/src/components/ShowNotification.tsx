import { saveToStore } from "@/states/appState";
import { notifications } from "@mantine/notifications";
import { IconCheck } from '@tabler/icons-react';
type Props = {
    id?: string, type?: string, message: string, title: string, callback?: () => void, time?: number, loading?: boolean, autoClose?: number | boolean, saveToStore?: Record<any, any> | any
}
export default function ShowCustomNotification(props: Props): string | undefined {



    if (props.type === 'success') {
        return notifications.show({
            position: 'top-center',
            onClose: () => {
                saveToStore && saveToStore(props?.saveToStore),
                    props.callback && props.callback()
            },
            ...props
        })
    }
    props.type == 'update' ?
        notifications.update({
            position: 'top-center',
            icon: <IconCheck size={18} />,
            loading: false,
            autoClose: 2000,
            color: 'teal',
            onClose: () => {
                saveToStore && saveToStore(props?.saveToStore),
                    props.callback && props.callback()
            },
            ...props
        })
        : (notifications.show({
            position: 'top-center',
            color: '#ffffff',
            style: { backgroundColor: '#fa5252', color: '#fff', },
            styles: { title: { color: '#fff' }, description: { color: '#fff' }, root: { zIndex: 2000 } },
            autoClose: 3000,
            onClose: () => {
                saveToStore && saveToStore(props?.saveToStore),
                    props.callback && props.callback()
            },
            ...props

        }))
}