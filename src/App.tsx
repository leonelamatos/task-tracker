import { useState } from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconLogout,
  IconPlus,
  IconSwitchHorizontal,
  IconUser,
} from '@tabler/icons-react';
import { Accordion, ActionIcon, AppShell, Avatar, Box, Burger, Card, Center, Container, Divider, Flex, Grid, Group, Menu, SimpleGrid, Stack, Text, Title} from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '@style/Navbar.module.css';
import NavbarLink from '@components/NavLink';
import { useDisclosure } from '@mantine/hooks';
import ActionsGrid from './components/Card';
import AccordionItem from './components/Accordion';




const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },

];

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
        <AccordionItem/>
      </AppShell.Main>
    </AppShell>
  );
}