import React, { useState } from 'react';
import { ButtonClose } from '../button';

interface ListSimple {
  rows: Row[];
  deletePhoneNumber: any;
  isUploadingPhoneNumbers: boolean;
}

interface Row {
  id: string;
  phoneNumber: string;
  phoneNumberFormatted: string;
  state: string;
}

const ListSimple: React.FC<ListSimple> = (props): React.ReactElement => {
  const { rows, deletePhoneNumber } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const stateIcon = (row: any) => {
    row.state === "none" ? null : (
      <svg xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: 5 }}
        className="flex-no-shrink"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 22 22"
        width="20px"
        height="20px"
      >
        <path
          stroke="red"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
    if ( row.state === "none" ) return null;

    if ( row.state === "failed" ) return (
      <svg xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: 5 }}
        className="flex-no-shrink"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 22 22"
        width="20px"
        height="20px"
      >
        <path
          stroke="red"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    );

    if (row.state === "success") return (
      <svg xmlns="http://www.w3.org/2000/svg" 
        style={{ marginLeft: 5 }}
        className="flex-no-shrink"
        fill="none" 
        viewBox="0 0 22 22"
        width="20px"
        height="20px"
        stroke="currentColor">
        <path strokeLinecap="round" stroke="green" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  const tableRows = (currentRows: any) => currentRows.map((row: Row): React.ReactElement => (
    <tr key={row.id} style={{ display: 'inline-table', width: '100%'}}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.phoneNumber}
            </div>
          </div>
        </div>
      </td>
      <td className="px-0 py-4 whitespace-nowrap" >
        <div className="flex items-center justify-center">
          <ButtonClose onClick={() => deletePhoneNumber(row.id)} />
          {stateIcon(row)}
        </div>
      </td>
    </tr>
  ));

  const emptyRows = (): React.ReactElement => (
    <tr >
      <td className="px-6 py-4 whitespace-nowrap" >
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              No phone numbers have been added.
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap" >
        <div className="flex items-center justify-center">
        </div>
      </td>
    </tr>
  );

  const isSyncing = true;

  if (props.isUploadingPhoneNumbers) return (
    <div className="align-middle">
      <div className="flex mt-1 justify-center">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke={isSyncing ? 'violet' : 'transparent'} strokeWidth="4"></circle>
          <path className="opacity-75" fill={isSyncing ? 'violet' : 'transparent'} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className='text-sm text-gray-500'>Uploading phone numbers...</span>
      </div>
    </div>
  );

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentRows: any = rows.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="align-middle">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50" style={{ width: '100%', display: 'inline-table' }}>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Numbers
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                { props.rows.length === 0 ? null : `Uploaded ${ rows.length }` }
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" style={{ width: '100%', display: 'block', overflow: 'auto', maxHeight: 212 }}>
            { rows.length !== 0 ? tableRows(currentRows) : emptyRows() }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListSimple;