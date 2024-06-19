import React from 'react';
import MUIDataTable from 'mui-datatables';
//import Animation from './Animation';

const TableUI = ({ data, header, toolbar, actions }) => {
  const filterData = [];

  data?.map((item) => {
    return filterData.push(header?.map((headerItem) => item[headerItem.key]));
  });

  const columnSettings = [
    ...header,
    {
      name: 'ACTIONS',
      options: {
        filter: false,
        sort: false,
        print: false,
        download: false,
        customBodyRender: actions,
        setCellProps: () => {
          return {
            style: { textAlign: 'center' },
          };
        },
        setCellHeaderProps: () => {
          return {
            style: {
              textAlign: 'center',
              userSelect: 'none',
            },
          };
        },
      },
    },
  ];

  const options = {
    download: true,
    print: true,
    viewColumns: true,
    filterType: 'textField',
    responsive: 'vertical',
    fixedHeader: true,
    tableBodyHeight: '400px',
    // resizableColumns: true,
    selectableRows: 'none',
    customToolbar: toolbar,
    textLabels: {
      body: {
        noMatch: 'Oops ! No Results Found',
        // toolTip: 'Sort',
        // columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },

      toolbar: {
        search: 'Search',
        downloadCsv: 'Download CSV',
        print: 'Print',
        viewColumns: 'View Columns',
        filterTable: 'Filter',
      },
    },
  };

  return (
    <div className="custom-table-wrapper">
      <MUIDataTable
        data={filterData}
        columns={columnSettings}
        options={options}
      />
    </div>
  );
};

export default TableUI;
