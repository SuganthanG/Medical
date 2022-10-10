import React, { useState } from 'react';

import SearchBar from './SearchBar';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

function Table() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    console.log(dataStringLines)
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    console.log(headers);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/); 
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          console.log (d[0]);
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
              console.log(d);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
              console.log("hello");
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
     // console.log(bstr);
      const wb = XLSX.read(bstr, { type: 'binary' });
      
     
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(ws);
    
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log(data);
      processData(data);
    };
    reader.readAsBinaryString(file);
  }

  return (
    <div>
       <SearchBar list={data}/>
      <h3>Read CSV file in React </h3>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        filter
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default Table;