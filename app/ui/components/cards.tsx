import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import logo from '../../../public/logo.png';

export default function OverflowCard() {
  return (
    <Card variant="outlined" className=" mx-auto w-80 sm:w-72 md:max-w-80 ">
    <CardOverflow>
        <AspectRatio ratio="2">
            <Image
                src={logo}
                alt="vino"
                className=" w-auto h-full object-cover"
            />
        </AspectRatio>
    </CardOverflow>
      <CardContent className="mx-auto text-center">
        <Typography level="title-md">Del Colorado Wine</Typography>
        <Typography level="body-sm" className=""><strong>$5.000</strong></Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
      </CardOverflow>
    </Card>
  );
}