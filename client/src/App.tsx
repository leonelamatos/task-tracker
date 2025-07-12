import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconPlus,
  IconUser,
} from '@tabler/icons-react';
import { ActionIcon, AppShell, Avatar, Burger, Center, Flex, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AccordionItem from './components/Accordion';
import AddNewTask from './components/AddNewTask';
import EditTaskDrawer from './components/EditTaskDrawer';

export default function App() {
  const [ opened, { toggle } ] = useDisclosure();

  return (

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
            <Avatar variant='filled' src={null} color='blue' />
          </Group>
        </Flex>

      </AppShell.Header>
      <AppShell.Main>
        <Title>Task Management</Title>
        <AddNewTask />
        <AccordionItem />
      </AppShell.Main>
    </AppShell>
  );
}