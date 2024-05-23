import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { OverflowCard } from './cards';
import { maven_Pro } from '../../fonts';
import { fetchVinos } from '@/app/lib/data';

export async function SimpleBottomNavigation() {
  const vinos = await fetchVinos();
  //const vinosTintos = await fetchVinosTintos();
  //const vinosBlancos = await fetchVinosBlancos();
  //const vinosRosados = await fetchVinosRosados();
  //const vinosEspumantes = await fetchVinosEspumantes();
  //TODO agregar atributo type al objeto vino en la base de datos

  return (
    <Tabs aria-label="Basic tabs" defaultValue={0} className={`${maven_Pro.className} w-full bg-transparent`}>
      <TabList className="sm:flex-row flex-col mx-auto border border-solid border-black rounded-md">
        <Tab className="rounded-md">Tintos</Tab>
        <Tab className="rounded-md">Blancos</Tab>
        <Tab className="rounded-md">Rosados</Tab>
        <Tab className="rounded-md">Espumantes</Tab>
      </TabList>
      <div className='max-w-screen py-5 '>
      <TabPanel className='flex justify-center' value={0}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-20 w-full max-w-screen-lg'>
          {vinos.map((vino, index) => (
            <OverflowCard key={index} wine={vino.wine} id={vino.id} image={vino.image} />
          ))}
        </div>
      </TabPanel>
      <TabPanel className='flex justify-center' value={1}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-20 w-full max-w-screen-lg'>
          {vinos.map((vino, index) => (
            <OverflowCard key={index} wine={vino.wine} id={vino.id} image={vino.image} />
          ))}
        </div>
      </TabPanel>
      <TabPanel className='flex justify-center' value={2}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-20 w-full max-w-screen-lg'>
          {vinos.map((vino, index) => (
            <OverflowCard key={index} wine={vino.wine} id={vino.id} image={vino.image} />
          ))}
        </div>
      </TabPanel>
      <TabPanel className='flex justify-center' value={3}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-20 w-full max-w-screen-lg'>
          {vinos.map((vino, index) => (
            <OverflowCard key={index} wine={vino.wine} id={vino.id} image={vino.image} />
          ))}
        </div>
      </TabPanel>
      </div>
    </Tabs>
  );
}