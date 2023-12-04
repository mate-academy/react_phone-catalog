export const loaderPhoneDetail = async ({ params }: any): Promise<Response> => {
  const { phoneId } = params;

  const respone = await fetch(`https://mate-academy.github.io/react_phone-catalog/_new/products/${phoneId}.json`);

  return respone;
};
