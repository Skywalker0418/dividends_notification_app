import { Card, Typography } from '@material-tailwind/react'
import './Dashboard.css'
import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'

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
      async function getLocalCsvData(path) {
        const response = await fetch(path);
        const reader = response.body.getReader();
        const result = await reader.read(); // raw array
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value); // the csv text
        const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
        const rows = results.data; // array of objects
        return rows;
      }
      async function getData() {
        const company_data = await getLocalCsvData("/data/company_data.csv")
        const rows = await getLocalCsvData("/data/data.csv")
        const timer = setTimeout(() => {
          var currentdate = new Date(); 
          // Upcoming records filter
          var upcomingCsvData = rows.filter((row)=>{
            // console.log(row)
            if(!!!row.distribution_date) return false;
            var date_parts = row.distribution_date.split('/')
            var d = new Date(+date_parts[2], date_parts[1] - 1, +date_parts[0]);
            return d.getTime() > currentdate.getTime();
          })
          // console.log(company_data)
          for (var i = 0; i < upcomingCsvData.length; i++) {
            const symbol = upcomingCsvData[i].symbol
            const company_info = company_data.find(company => company.companySymbol === symbol)
            console.log(symbol, company_info)
            upcomingCsvData[i].company_url = company_info.companyUrl;
          }
          setUpcomingData(upcomingCsvData);
          setParsedCsvData(rows);
          }, 1000);
        return () => clearTimeout(timer);         
      }
      getData();
  }, []);

  return (
    <>
      <Typography key={'dashboard_text'} variant='h5' color='white'>
        Dashboard
      </Typography>
      <Typography key={'name_text'} className='italic font-normal opacity-70' color='white'>
        All Companies
      </Typography>
      <Card key={'upcoming_dividends_card'} className='h-[350px] w-full p-3 mt-5 mb-5'>
        <Typography
          variant='h6'
          color='blue-gray'
          className='p-3 flex items-center gap-3'
        >
          Up coming divdends
        </Typography>
        <div className='overflow-x-auto flex -mx-4 sm:-mx-6 md:mx-0'>
          <div className='flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 lg:max-h-96'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr>
                  <th
                    key={Math.random()}
                    className='sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 p-0 border-b border-blue-gray-50 bg-blue-gray-50'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='py-2 pl-2 border-b border-slate-200 '
                    >
                      {'#'}
                    </Typography>
                  </th>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index.toString() + '_' + Math.random()}
                      className='sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 p-0 border-b border-blue-gray-50 bg-blue-gray-50'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='py-2 pl-2 border-b border-slate-200 '
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='align-baseline'>
              {upcomingData && upcomingData.map(({ sectorName, symbol, name, announced, eligibility_date, distribution_date, dividend_per_share,company_url}, index) => {
                  // const isLast = index === TABLE_ROWS.length - 1
                  const classes =
                    'pl-2 py-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400'
                  if(!sectorName) return (<></>);

                  return (
                    <tr key={name + index.toString() + '_' + Math.random()}>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {sectorName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {symbol}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {announced}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {eligibility_date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {distribution_date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className='flex justify-left gap-4'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal w-12'
                          >
                            {dividend_per_share}
                          </Typography>
                          <a href={saudiexchange_url + company_url} target="_blank" rel="noopener noreferrer" className='bg-blue-500 px-2 rounded-lg text-white font-medium text-right '>
                          {'View'}         
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <Card key={'all_companies_card'} className='h-[350px] w-full p-3 mt-5 mb-5'>
        <Typography
          variant='h6'
          color='blue-gray'
          className='p-3 flex items-center gap-3'
        >
          All companies
        </Typography>
        <div className='overflow-x-auto flex -mx-4 sm:-mx-6 md:mx-0'>
          <div className='flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 lg:max-h-96'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr>
                  <th
                    key={Math.random()}
                    className='sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 p-0 border-b border-blue-gray-50 bg-blue-gray-50'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='py-2 pl-2 border-b border-slate-200 '
                    >
                      {'#'}
                    </Typography>
                  </th>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index.toString() + '_' + Math.random()}
                      className='sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 p-0 border-b border-blue-gray-50 bg-blue-gray-50'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='py-2 pl-2 border-b border-slate-200 '
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='align-baseline'>
                {parsedCsvData && parsedCsvData.map(({ sectorName, symbol, name, announced, eligibility_date, distribution_date, dividend_per_share}, index) => {
                  // const isLast = index === TABLE_ROWS.length - 1
                  const classes =
                    'pl-2 py-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400'
                  if(!sectorName) return (<React.Fragment key={Math.random()}></React.Fragment>); 
                  return (
                    <tr key={name + index.toString() + '_' + Math.random()}>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {sectorName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {symbol}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {announced}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {eligibility_date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {distribution_date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as='a'
                          href='#'
                          variant='small'
                          color='blue-gray'
                          className='font-medium'
                        >
                          {dividend_per_share}                                                    
                        </Typography>
                        
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  )
}

export default Dashboard
