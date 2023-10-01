import { useEffect, useState } from 'react'
import { getAllTest } from '../../../api/clientService'
import Header from '../../../layout/clientLayout/clientButton/index'
import TestItem from './TestItem'

const HomePage = () => {
   const [tests, setTests] = useState([])

   const getAllLanguagesApi = async () => {
      const requestConfig = await getAllTest()

      setTests(requestConfig.data)
   }

   useEffect(getAllLanguagesApi, [])
   return (
      <>
         <Header />
         <ul>
            {tests.map((test) => (
               <TestItem key={test.id} test={test} />
            ))}
         </ul>
      </>
   )
}
export default HomePage
