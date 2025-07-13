import { useAppStore } from "@/states/appState";
import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title, type __InputStylesNames, } from "@mantine/core";
import React, { Fragment, } from "react";
import { Controller, type Control } from "react-hook-form";
import classes from '@style/AuthenticationForm.module.css'
type FormProps = {
    control: Control<any, any>
    formInput: InputType[]
    name: string
    formAction: (arg: React.BaseSyntheticEvent) => Promise<void>
}
type ComponentToRenderType = 'PasswordInput' | 'TextInput'

export type InputType = { key: number, inputName: string, label: string, placeholder: string, required: boolean, componentType: ComponentToRenderType }

export type FormDataType = {
    userEmail: string;
    userName?: string
    password: string
    confirmPassword?: string
}
const componentMap = {
    TextInput: TextInput,
    PasswordInput: PasswordInput
}

export default function AuthenticationForm({ control, formInput, name, formAction }: FormProps) {

    const isLoginForm = name === 'login'

    return <Container size={420} my={40}>

        {isLoginForm ? <Group justify="center">
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>

            <Text className={classes.subtitle}>
                Do not have an account yet? <Anchor onClick={() => useAppStore.setState(state => ({ signup: !state.signup }))}>Create account</Anchor>
            </Text>
        </Group> : <Group justify="center">
            <Title ta="center" className={classes.title}>
                Please Create an Account
            </Title>

            <Text className={classes.subtitle}>
                Or Log In if you have and account <Anchor onClick={() => useAppStore.setState(state => ({ signup: !state.signup }))}>Login</Anchor>
            </Text>
        </Group>


        }

        <form onSubmit={formAction}>

            <Paper withBorder shadow="sm" p={22} mt={30} radius="md">

                {formInput.map(ele => {
                    const ComponetToRender = componentMap[ ele.componentType ]

                    return <Fragment key={ele.key}>

                        <Controller name={ele.inputName} control={control} render={({ field }) => {
                            return <ComponetToRender label={ele.label} placeholder={ele.placeholder} required={ele.required} mt="md" radius="md" {...field} />
                        }}
                        />
                    </Fragment>
                }
                )}
                {isLoginForm ? <Group justify="space-between" mt="lg">
                    <Controller name='rememberMe' control={control} render={({ field }) => {
                        return <Checkbox label="Remember me" value={field.value} />
                    }}
                    />
                    {/* <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor> */}
                </Group> : null}
                <Button fullWidth mt="xl" radius="md" type='submit'>
                    {isLoginForm ? 'Sign in' : 'Sign up'}
                </Button>
            </Paper>
        </form>

    </Container >
}
