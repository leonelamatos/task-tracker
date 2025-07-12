
import { AppShell, Avatar, Burger, Center, Flex, Group, Menu, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AccordionItem from './components/Accordion';
import AddNewTask from './components/AddNewTask';
import { LoginPage } from './components/LOginPage';
import { useAppStore } from './states/appState';
import { IconLogout } from '@tabler/icons-react';
import { account } from './util/appwriteConfig';

export default function App() {
  const [ opened, { toggle } ] = useDisclosure();
  const userSession = useAppStore(state => state.userSession)

  console.log(userSession)
  const logOutUser = () => {
    setTimeout(() => {


      account.deleteSession('current')
      useAppStore.setState({ userSession: undefined })
    }, 1500)
  }

  return !userSession ?
    <LoginPage />
    :
    (

      <AppShell
        layout="alt"
        header={{ height: 60, }}
        padding="md"

      >
        <AppShell.Header>
          <Flex justify='space-between'>

            <Group h="100%" px="md" >
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Center>
                <h3 style={{ color: '#000' }}>LOGO</h3>
              </Center>
            </Group>
            <Group px='md'>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar variant='filled' src={null} color='blue' />

                </Menu.Target>

                <Menu.Dropdown onClick={logOutUser}>
                  <Menu.Item leftSection={<IconLogout size={14} />}>
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

            </Group>
          </Flex>

        </AppShell.Header>
        <AppShell.Main>
          <Title order={2}>Task Management</Title>
          <AddNewTask />
          <AccordionItem />
        </AppShell.Main>
      </AppShell >)

}