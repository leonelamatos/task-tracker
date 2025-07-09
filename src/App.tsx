import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconPlus,
  IconUser,
} from '@tabler/icons-react';
import {  ActionIcon, AppShell, Avatar,  Burger, Center,  Flex,  Group, Title} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AccordionItem from './components/Accordion';
import AddNewTask from './components/AddNewTask';

export default function App() {
  const [opened, { toggle }] = useDisclosure();

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
              <h3 style={{color:'#000'}}>LOGO</h3>
            </Center>
        </Group>
        <Group px='md'>
          <ActionIcon variant="filled" size="md" radius="xl" aria-label="Settings">
          <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5}/>

            </ActionIcon>


          <ActionIcon size="md" radius="xl" aria-label="User">
            <Avatar />

            </ActionIcon>


          </Group>
        </Flex>
          
      </AppShell.Header>
     
      <AppShell.Main>
        <Title>Task Management</Title>
        <AddNewTask/>
        <AccordionItem/>
      </AppShell.Main>
    </AppShell>
  );
}