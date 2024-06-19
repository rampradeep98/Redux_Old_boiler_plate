import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { FiFilter } from 'react-icons/fi';

const MainWrapper = ({
  title,
  children,
  type,
  handleMachineName,
  exportFile,
  backward,
  backwardNavigate,
  handleRetryButton,
  handleStatus,
  planstatus,
  lineType,
  filterButton,
  handleFilterData,
}) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Report',
  });

  return (
    <div className='main-page'>
      <div className='main-title'>
        <h3>{title}</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {planstatus === 0 ? <h3>Plan Not Avaliable</h3> : ''}
        {handleStatus ? (
          <div className='handle-status'>
            <button onClick={handleRetryButton} className='btn back_btn'>
              <TfiReload />
            </button>
          </div>
        ) : null}
        &nbsp;&nbsp;&nbsp;
        {backward ? (
          <button onClick={backwardNavigate} className='btn back_btn ms-auto'>
            <BsArrowLeftCircle />
          </button>
        ) : null}
        {type === 'true' ? (
          <div className='select-machine'>
            <button
              className='btn btn-outline-dark '
              onClick={handleMachineName}>
              Select Your Machine
            </button>
            &nbsp;&nbsp;&nbsp;
            {filterButton ? (
              <button onClick={handleFilterData} className='btn back_btn'>
                <FiFilter />
              </button>
            ) : null}
            {exportFile ? (
              <>
                <div className='btn-group'>
                  <button
                    className='btn btn-Primary pdf_btn'
                    onClick={handlePrint}>
                    <AiOutlineFilePdf />
                  </button>
                  {/*<ReactToExcel
                    className='btn execlbtn btn-Primary'
                    table='table-to-xls'
                    filename={fileName}
                    sheet={fileName}
                    buttonText={<SiMicrosoftexcel />}
                  /> */}
                </div>
              </>
            ) : null}
          </div>
        ) : (
          ''
        )}
        {lineType === true ? (
          <div className='select-machine'>
            <button
              className='btn btn-outline-dark text-right'
              onClick={handleMachineName}>
              Select Your Department
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      <table className='w-100' id='table-to-xls'>
        <div ref={componentRef} className='main-body'>
          {children}{' '}
        </div>
      </table>
    </div>
  );
};

export default MainWrapper;
