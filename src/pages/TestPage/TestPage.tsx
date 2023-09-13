import { Dropdown, Option } from '../../components/Dropdown';

export const TestPage: React.FC = () => {
  const options: Option[] = [
    { name: 'Newest', property: { sortBy: 'newest' } },
    { name: 'Cheapest', property: { sortBy: 'cheapest' } },
    { name: 'Oldest', property: { sortBy: 'oldest' } },
  ];

  const secondOptions: Option[] = [
    { name: '4', property: { perPage: '4' } },
    { name: '8', property: { perPage: '8' } },
    { name: '16', property: { perPage: '16' } },
    { name: 'all', property: { perPage: 'all' } },
  ];

  return (
    <div className="some-div">
      <Dropdown title="Sort by" options={options} />

      <Dropdown title="Items on Page" options={secondOptions} />
    </div>
  );
};
