import { Typography } from '../../atoms/Typography/Typography';

type Specs = {
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  capacity?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  [key: string]: unknown;
};

type Props = {
  specs: Specs;
};

export const PhoneSpecsTable: React.FC<Props> = ({ specs }) => (
  <>
    <div className="flex flex-col gap-2">
      {specs.screen && (
        <div className="flex justify-between">
          <Typography className="text-secondary">Screen</Typography>
          <Typography>{specs.screen}</Typography>
        </div>
      )}
      {specs.resolution && (
        <div className="flex justify-between">
          <Typography className="text-secondary">Resolution</Typography>
          <Typography>{specs.resolution}</Typography>
        </div>
      )}
      {specs.processor && (
        <div className="flex justify-between">
          <Typography className="text-secondary">Processor</Typography>
          <Typography>{specs.processor}</Typography>
        </div>
      )}
      {specs.ram && (
        <div className="flex justify-between">
          <Typography className="text-secondary">RAM</Typography>
          <Typography>{specs.ram}</Typography>
        </div>
      )}
      {specs.capacity && (
        <div className="flex justify-between">
          <Typography className="text-secondary">Built in memory</Typography>
          <Typography>{specs.capacity}</Typography>
        </div>
      )}
      {specs.camera && (
        <div className="flex justify-between">
          <Typography className="text-secondary">Camera</Typography>
          <Typography>{specs.camera}</Typography>
        </div>
      )}
      {specs.zoom && (
        <div className="flex justify-between">
          <Typography className="text-secondary">Zoom</Typography>
          <Typography>{specs.zoom}</Typography>
        </div>
      )}
      {specs.cell && (
        <div className="flex justify-between">
          <Typography className="text-secondary">Camera</Typography>
          <Typography>{specs.cell.join(', ')}</Typography>
        </div>
      )}
    </div>
  </>
);
