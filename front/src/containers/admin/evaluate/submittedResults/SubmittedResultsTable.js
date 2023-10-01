import React from 'react'
import { TableContainer, TableHead, TableRow } from '@mui/material'
import {
   StyletTableRow,
   StyledTableCell,
   Div,
   StyledHead,
   StyledTable,
   TrueP,
   FalseP,
} from '../../../../components/UI/table/Table'
import Item from './Item'

export const SubmittedResultsTable = ({ users, onClickToDelete }) => {
   return (
      <TableContainer>
         <StyledTable>
            <TableHead>
               <TableRow>
                  <StyledHead>#</StyledHead>
                  <StyledHead>User Name</StyledHead>
                  <StyledHead align="center">Date of Submition</StyledHead>
                  <StyledHead align="center">Question Type</StyledHead>
                  <StyledHead align="center">Status</StyledHead>
               </TableRow>
            </TableHead>
            {users.map((user, index) => (
               <tbody key={user.userResult.id}>
                  <StyletTableRow align="center">
                     <StyledTableCell align="center">
                        {index + 1}
                     </StyledTableCell>
                     <StyledTableCell align="center">
                        {user.user.fullName}
                     </StyledTableCell>
                     <StyledTableCell align="center">
                        {user.userResult.createdDate}
                     </StyledTableCell>
                     <StyledTableCell align="center">
                        {user.mainTest.title}
                     </StyledTableCell>
                     <StyledTableCell align="center">
                        {user.userResult.evaluated ? (
                           <TrueP>Evaluated</TrueP>
                        ) : (
                           <FalseP>Not evaluated</FalseP>
                        )}
                     </StyledTableCell>
                     <StyledTableCell align="center">
                        <Div>
                           <Item
                              id={user.userResult.id}
                              onClickToDelete={onClickToDelete}
                           />
                        </Div>
                     </StyledTableCell>
                  </StyletTableRow>
               </tbody>
            ))}
         </StyledTable>
      </TableContainer>
   )
}
