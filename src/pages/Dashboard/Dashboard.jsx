import { Typography } from '@material-tailwind/react'
import './Dashboard.css'
import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import TableView from '../../component/TableView/TableView'

const TABLE_HEAD = [
  'Sectors',
  'Symbol',
  'Name',
  'Announced',
  'Eligibility date',
  'Distribution date',
  'Dividend per share'
]
const saudiexchange_url = "https://cdn.saudiexchange.sa/"

const Dashboard = () => {
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  useEffect(() => {
      async function getData() {
        Papa.parse("/data/data.csv", {
          header: true,
          download: true,
          dynamicTyping: true,
          complete: function(results) {
            const rows = results.data;
            var currentdate = new Date(); 
            // Upcoming records filter
            var upcomingCsvData = rows.filter((row)=>{
              if(!!!row.distribution_date) return false;
              var date_parts = row.distribution_date.split('/')
              var d = new Date(+date_parts[2], date_parts[1] - 1, +date_parts[0]);
              return d.getTime() > currentdate.getTime();
            })
            setUpcomingData(upcomingCsvData);
            setParsedCsvData(rows);  
          }
        });            
      }
      getData();
  }, []);

  return (
    <div className='mt-3'>
      <Typography key={'dashboard_text'} variant='h5' color='white'>
        Dashboard
      </Typography>
      <Typography key={'name_text'} className='italic font-normal opacity-70' color='white'>
        All Companies
      </Typography>
      <TableView title={'Up coming dividends'} data={upcomingData} table_head={TABLE_HEAD} base_url={saudiexchange_url}/>
      <TableView title={'All companies'} data={parsedCsvData} table_head={TABLE_HEAD} base_url={saudiexchange_url}/>
    </div>
  )
}

export default Dashboard
