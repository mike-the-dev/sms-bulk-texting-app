import Papa from "papaparse";

interface MediaUploadResponse {
  parseCSV: (file: File, callback: (results: Papa.ParseResult<unknown>) => void, callbackStep: (results: Papa.ParseStepResult<unknown>) => void) => void;
  createCSV: (data: any) => void;
};

const MediaUpload = (): MediaUploadResponse => {
  const parseCSV = (
    file: File, 
    callback: (results: Papa.ParseResult<unknown>) => void,
    callbackStep: (results: Papa.ParseStepResult<unknown>) => void,
  ): void => {
    Papa.parse(file, {
      worker: true,
      step: callbackStep,
      complete: callback
      // step: function (row) {
        // console.log("Row:", row);
      // },
      // complete: function () {
        // console.log("All done!");
      // }
    });
  };

  const createCSV = (data: any): void => {
    const csvStructure = {
      fields: ['phone_number', 'status'],
      data: [
        ...data.map((phoneNumber: any) => [phoneNumber.phoneNumberFormatted, phoneNumber.state])
      ]
    };

    const csvString = Papa.unparse(csvStructure);
    const csvContent = "data:text/csv;charset=utf-8," + csvString;
    
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);

    console.log('CSV created and downloaded.');
  };

  return {
    parseCSV: parseCSV,
    createCSV: createCSV
  };
};

export default MediaUpload;