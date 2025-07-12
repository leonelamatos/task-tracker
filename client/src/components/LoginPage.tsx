import { useAppStore } from '@/states/appState';
import { account, client } from '@/util/appwriteConfig';
import { handleAsync } from '@/util/handleAsync';
import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from '@style/LoginPage.module.css';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export function LoginPage() {

    const { handleSubmit, register, control } = useForm({ mode: 'all', defaultValues: { userEmail: '', password: '' } })

    const logUserIn = async (userEmail, password) => {
        console.log(userEmail, password)

        account.createEmailPasswordSession('test@user.com', 'password').then(session => {

            notifications.show({
                title: 'Login Successfully',
                message: 'Redirecting to homepage',
                position: 'top-center',
                color: '#0b3e19',
                style: {
                    backgroundColor: '#23c552', color: '#0b3e19'
                },
                styles: { title: { color: '#0b3e19' }, description: { color: '#0b3e19' } },
                autoClose: 3000,
                loading: true,
                onClose: () => { useAppStore.setState({ userSession: session }) }
            })
        }).catch(error => {
            notifications.show({
                title: 'Login failed',
                message: error.message,
                position: 'top-center',
                color: '#ffffff',
                style: { backgroundColor: '#fa5252', color: '#fff' },
                styles: { title: { color: '#fff' }, description: { color: '#fff' } },
                autoClose: 8000,

            })

        })


        // useAppStore.setState({ userSession:})



    }
    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>

            <Text className={classes.subtitle}>
                Do not have an account yet? <Anchor>Create account</Anchor>
            </Text>
            <form onSubmit={handleSubmit(logUserIn)}>

                <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                    <Controller name='userEmail' control={control} render={({ field }) => {
                        return <TextInput label="Email" placeholder="you@mantine.dev" required radius="md" {...field} />
                    }} />

                    <Controller name='password' control={control} render={({ field }) => {
                        return <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" {...field} />

                    }} />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" radius="md" type='submit'>
                        Sign in
                    </Button>
                </Paper>
            </form>

        </Container>
    );
}