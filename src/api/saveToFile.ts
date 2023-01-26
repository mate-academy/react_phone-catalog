/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */


type FileParams = {
  fileName: string;
  data: any;
};

export function saveToFile(params: FileParams) {
  const { fileName, data } = params;
  const fs = require('fs');
  const jsonData = JSON.stringify(data);

  fs.writeFile(fileName, jsonData, (err: Error) => {
    if (err) {
      throw err;
    }

    // eslint-disable-next-line no-console
    console.log('The file has been saved!');
  });
}
