import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import Toast from './Toast';
const Notify = () => {

const {notify} = useSelector(state => state);
const dispatch = useDispatch()
 
  return (
    <div>

       {notify.loading && <Loading />}

       
        {
          notify.error && <Toast msg={notify.error}
          handleShow={()=> dispatch({type: 'NOTIFY', payload:{}})}
          iconAlert=<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Error icon</span>
        </div>
           />
        }

        {
          notify.success && <Toast msg={notify.success}
          handleShow={()=> dispatch({type: 'NOTIFY', payload:{}})}
          iconAlert =<div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
    <span className="sr-only">Check icon</span>
    </div>
           />
        }
    </div>
  )
}

export default Notify

