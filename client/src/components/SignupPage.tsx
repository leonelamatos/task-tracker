import { useForm } from 'react-hook-form';
import AuthenticationForm, { type FormDataType, type InputType } from './AuthenticationForm';
import { account } from '@/util/appwriteConfig';
import { ID } from 'appwrite';
import { useAppStore } from '@/states/appState';
import ShowCustomNotification from './ShowNotification';


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

    const { handleSubmit, control, } = useForm({ mode: 'all', defaultValues: { userEmail: '', password: '' } })


    const handleSignup = async (formData: FormDataType) => {

        // const id = 'createId'

        // const args = {
        //     type: 'success',
        //     title: 'Creating Account',
        //     message: 'Please wait...',
        //     autoClose: false,
        //     loading: true,
        // }
        // const notificationId = ShowCustomNotification(args)
        account.create(ID.unique(), formData.userEmail, formData.password, formData.userName).then(result => {

            setTimeout(() => {
                const args = {
                    // id: notificationId,
                    type: 'success',
                    title: 'Account created',
                    message: 'Account created successfully',
                    autoClose: 3000,
                    loading: false,
                    callback: () => useAppStore.setState({ signup: false, userAccount: result })
                }
                ShowCustomNotification(args)

            }, 1000)

        }).catch(error => {

            const args = {
                // id: notificationId,
                title: 'Login failed',
                message: error?.message,
                autoClose: 3000,

            }

            ShowCustomNotification(args)
        })






    }


    return (
        <AuthenticationForm control={control} formInput={formData} formAction={handleSubmit(handleSignup)} name='signup' />
    );
}