import { PhoneDetails } from '../types/PhoneDetails';

export const phoneDetailsSameType = (phoneDetails: PhoneDetails) => {
  return {
    ...phoneDetails,
    camera: JSON.stringify(phoneDetails.camera),
    description: [{
      title: 'Description',
      text: [phoneDetails.description.toString()],
    },
    {
      title: 'Additional Information',
      text: [phoneDetails.description.toString()],
    },
    {
      title: 'Specifications',
      text: [phoneDetails.description.toString()],
    // eslint-disable-next-line max-len
    }] as [{ title: string; text: string[] }, { title: string; text: string[] }, { title: string; text: string[] } ],
  };
};
