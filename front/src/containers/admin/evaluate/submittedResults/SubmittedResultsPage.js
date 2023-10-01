import * as React from 'react'
import {
   getAllUsersRequest,
   deleteUserRequest,
} from '../../../../api/testService'
import Layout from '../../../../components/UI/adminContentCard'
import { SubmittedResultsTable } from './SubmittedResultsTable'

export default function SubmittedResultsPage() {
   const [users, setUsers] = React.useState([])

   const getUsersForEvaluation = async () => {
      const response = await getAllUsersRequest()
      setUsers(response.data)
   }

   React.useEffect(() => {
      getUsersForEvaluation()
   }, [])

   const onClickToDelete = async (id) => {
      await deleteUserRequest(id)
      await getUsersForEvaluation()
   }

   return (
      <Layout>
         <SubmittedResultsTable
            users={users}
            onClickToDelete={onClickToDelete}
         />
      </Layout>
   )
}
