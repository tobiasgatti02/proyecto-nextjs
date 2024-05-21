import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import OverflowCard from './cards';
import { maven_Pro } from '../../fonts';

export default function SimpleBottomNavigation() {
  return (
    <Tabs aria-label="Basic tabs" defaultValue={0} className={`${maven_Pro.className} w-full bg-transparent`}>
      <TabList className="sm:flex-row flex-col mx-auto border border-solid border-black rounded-md">
        <Tab className="rounded-md">Tintos</Tab>
        <Tab className="rounded-md">Blancos</Tab>
        <Tab className="rounded-md">Rosados</Tab>
        <Tab className="rounded-md">Espumantes</Tab>
      </TabList>
      <div className='max-w-screen py-10 '>
        <TabPanel className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 sm:gap-y-20' value={0}>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>
          <OverflowCard/>

          panel de <b>Vinos Tintos. recuperar los datos de la bdd para generar las cards</b>
        </TabPanel>
        <TabPanel value={1}>
          panel de <b>Vinos Blancos</b>
        </TabPanel>
        <TabPanel value={2}>
          panel de <b>Vinos Rosados</b>
        </TabPanel>
        <TabPanel value={3}>
          panel de <b>Vinos Espumantes</b>
        </TabPanel>
      </div>
    </Tabs>
  );
}