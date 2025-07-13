import { useForm } from 'react-hook-form';
import AuthenticationForm, { type FormDataType, type InputType } from './AuthenticationForm';
import { account } from '@/util/appwriteConfig';
import { ID } from 'appwrite';
import { notifications } from '@mantine/notifications';
import { useAppStore } from '@/states/appState';

// const schema = z.object({ userName: z.string().min(5), userEmail: z.email(), password: z.string().min(8) })

const formData: InputType[] = [ {
    key: 1,
    inputName: "userName",
    label: 'Name',
    placeholder: "Joe Doe",
    required: true,
    componentType: 'TextInput'
}, {
    key: 2,
    inputName: "userEmail",
    label: 'Email',
    placeholder: "youremail@example.com",
    required: true,
    componentType: 'TextInput'
}, {
    key: 3,
    inputName: "password",
    label: 'Password',
    placeholder: "Your Password",
    required: true,
    componentType: 'PasswordInput'
}, {
    key: 4,
    inputName: "confirmPassword",
    label: 'Confirm Password',
    placeholder: "Comfim Password",
    required: true,
    componentType: 'PasswordInput'
} ]


export function SignupPage() {
    const saveToStore = useAppStore(state => state.saveToStore)
    const userAccount = useAppStore(state => state.userAccount)

    console.log(userAccount)

    const { handleSubmit, control } = useForm({ mode: 'all', defaultValues: { userEmail: '', password: '' } })
    const handleSignup = async (formData: FormDataType) => {

        try {

            const result = await account.create(ID.unique(), formData.userEmail, formData.password, formData.userName)
            notifications.show({
                title: 'Login Successfully',
                message: 'Redirecting to homepage',
                position: 'top-center',
                // color: '#0b3e19',
                // style: {
                //     backgroundColor: '#23c552', color: '#0b3e19'
                // },
                // styles: { title: { color: '#0b3e19' }, description: { color: '#0b3e19' } },
                autoClose: 3000,
                loading: true,
                onClose: () => { useAppStore.setState({ signup: false }) }
            })

            saveToStore('userAccount', result)

        } catch (error:any) {

            console.log('ERROR', error)
            notifications.show({
                title: 'Login failed',
                message: error?.message,
                position: 'top-center',
                color: '#ffffff',
                style: { backgroundColor: '#fa5252', color: '#fff' },
                styles: { title: { color: '#fff' }, description: { color: '#fff' } },
                autoClose: 8000,

            })

        }

    }


    return (
        <AuthenticationForm control={control} formInput={formData} formAction={handleSubmit(handleSignup)} name='signup' />
    );
}