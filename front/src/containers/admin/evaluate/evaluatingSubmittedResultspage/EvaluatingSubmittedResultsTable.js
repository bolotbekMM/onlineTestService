import React from 'react'
import { TableHead, TableRow } from '@mui/material'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../../../../components/UI/button/index'
import {
   StyletTableRow,
   StyledTableCell,
   StyledHead,
   StyledTable,
} from '../../../../components/UI/table/Table'

function EvaluatingSubmittedResultsTable({ userAnswers, paramsUserID }) {
   return (
      <>
         <Linee>
            <Line />
         </Linee>
         <StyledTable>
            <TableHead>
               <TableRow>
                  <StyledHead align="right">#</StyledHead>
                  <StyledHead align="left">Question</StyledHead>
                  <StyledHead align="left">Score</StyledHead>
                  <StyledHead align="left">Status</StyledHead>
               </TableRow>
            </TableHead>
            {/* {userAnswers.length !== 0 && */}
            {userAnswers.map((row, index) => (
               <tbody key={row.id}>
                  <StyletTableRow align="center">
                     <StyledTableCell align="center">
                        {index + 1}
                     </StyledTableCell>
                     <StyledTableCell align="left">{row.title}</StyledTableCell>
                     <StyledTableCell align="left">
                        {row.score ? `${row.score} out of 10` : '0 out of 10'}
                     </StyledTableCell>
                     <StyledTableCell align="left">
                        {row.evaluated ? (
                           <TrueP>Evaluated</TrueP>
                        ) : (
                           <FalseP>Not evaluated</FalseP>
                        )}
                     </StyledTableCell>

                     <StyledTableCell align="center">
                        <StyledLink
                           to={`/admin/submited-results/evaluate-questions/${paramsUserID}/questionType/${row.id}`}
                           key={row.id}
                        >
                           <Button
                              color="primary"
                              variant="outlined"
                              style={{ padding: '6.5px 13.5px' }}
                           >
                              evaluate
                           </Button>
                        </StyledLink>
                     </StyledTableCell>
                  </StyletTableRow>
               </tbody>
            ))}
         </StyledTable>
      </>
   )
}

export default EvaluatingSubmittedResultsTable

const Linee = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`
const Line = styled.div`
   border: 0.8px solid #d4d0d0;
   position: absolute;
   width: 890px;
   background: #c4c4c4;
   display: flex;
   justify-content: center;
   align-items: center;
`
const TrueP = styled.p`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 18px;
   color: #2ab930;
`
const FalseP = styled.p`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 18px;
   color: #f61414;
`
const StyledLink = styled(Link)`
   text-decoration: none;
`
