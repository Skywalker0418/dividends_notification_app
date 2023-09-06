import PropTypes from "prop-types";
import { Card, Typography } from '@material-tailwind/react'
import "./TableView.css";

const TableView = ({title, table_head, data, base_url}) => {
  return (
    <Card  className='h-[330px] w-full p-3 mt-4 mb-4'>
        <Typography
          variant='h6'
          color='blue-gray'
          className='p-2 flex items-center gap-2'
        >
          {title}
        </Typography>
        <div className='overflow-x-auto flex -mx-4 sm:-mx-6 md:mx-0'>
          <div className='flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 lg:max-h-96'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr>
                  <th
                    key={Math.random()}
                    className='sticky z-10 top-0 text-xs leading-6 font-semibold text-slate-700 p-0 border-b border-blue-gray-50 bg-blue-gray-50'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='py-2 pl-2 border-b border-slate-200 '
                    >
                      {'#'}
                    </Typography>
                  </th>
                  {table_head.map((head, index) => (
                    <th
                      key={index.toString() + '_' + Math.random()}
                      className='sticky z-10 top-0 text-xs leading-6 font-semibold text-slate-700 p-0 border-b border-blue-gray-50 bg-blue-gray-50'
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
              {data && data.map(({ sectorName, symbol, name, announced, eligibility_date, distribution_date, dividend_per_share,company_url}, index) => {
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
                          {title === 'Up coming dividends' && (
                            <a href={base_url + company_url} target="_blank" rel="noopener noreferrer" className='bg-blue-500 px-2 rounded-lg text-white font-medium text-xs text-right pt-1'>
                            {'View'}         
                            </a>
                          )}                          
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
  );
};

TableView.propTypes = {
  title: PropTypes.string,
  table_head: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,  
  base_url: PropTypes.string
};

export default TableView;
