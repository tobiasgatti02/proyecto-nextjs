import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import vino from '../../../public/vino.png';

interface OverflowCardProps {
  wine: string;
  id: number;
  image: string;
}

export async function OverflowCard({ wine, id, image }: OverflowCardProps) {
  return (
    <Card variant="outlined" className=" w-auto sm:w-72 md:max-w-80 ">
    <CardOverflow>
        <AspectRatio ratio="2">
            <Image
                src={vino}
                alt={wine + ' image'}
                className=" w-auto h-full "
            />
        </AspectRatio>
    </CardOverflow>
      <CardContent className="mx-auto text-center">
        <Typography level="title-md">{wine}</Typography>
        <Typography level="body-sm" className=""><strong>{id}</strong></Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
      </CardOverflow>
    </Card>
  );
}