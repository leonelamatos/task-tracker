import { account } from '@/util/appwriteConfig';

import AuthenticationForm, { type FormDataType, type InputType } from './AuthenticationForm';
import { useForm } from 'react-hook-form';
import ShowCustomNotification from './ShowNotification';
import { notifications } from '@mantine/notifications';
import { useAppStore } from '@/states/appState';


const formData: InputType[] = [ {
    key: 1,
    inputName: "userEmail",
    label: 'Email',
    placeholder: "youremail@example.com",
    required: true,
    componentType: 'TextInput'
}, {
    key: 2,
    inputName: "password",
    label: 'Password',
    placeholder: "Your Password",
    required: true,
    componentType: 'PasswordInput'
} ]


export function LoginPage() {

    const { handleSubmit, control } = useForm({ mode: 'all', defaultValues: { userEmail: '', password: '', rememberMe: false } })

    const handleLogin = async (formData: FormDataType) => {

        account.createEmailPasswordSession(formData.userEmail, formData.password).then(session => {

            notifications.show({
                title: 'Login Successfully',
                message: 'Redirecting to homepage',
                position: 'top-center',
                autoClose: 1000,
                loading: true,
                onClose: () => { useAppStore.setState({ userSession: session }) }
            })
        }).catch(error => {
            console.log(JSON.stringify(error))
            const notificationArgs = {
                title: error.message,
                message: '',
                type: 'error',
                // message: ' There was an error connecting to the server'
            }
            ShowCustomNotification(notificationArgs)
        })

    }



    return <AuthenticationForm control={control} formInput={formData} formAction={handleSubmit(handleLogin)} name='login' />
}