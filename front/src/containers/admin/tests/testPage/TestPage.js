import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
   deleteTestRequest,
   getAllTestRequest,
   putTestActivationRequest,
} from '../../../../api/testService'
import ContentCard from '../../../../components/UI/adminContentCard/index'
import Button from '../../../../components/UI/button/index'
import { ROUTES } from '../../../../utils/constants/general'
import TestItem from './TestItem'

const TestPage = () => {
   const navigate = useNavigate()

   const [tests, setTests] = React.useState([])
   const getTestTitle = async () => {
      const response = await getAllTestRequest()
      setTests(response.data)
   }
   console.log(tests)

   React.useEffect(() => {
      getTestTitle()
   }, [])

   const toggleHandler = (isActiveById) => {
      console.log(isActiveById)
      putTestActivationRequest(isActiveById)
   }

   const onClickToAddNewTest = () => {
      navigate(ROUTES.ADD_TEST_PAGE)
   }

   const onClickToDelete = async (id) => {
      await deleteTestRequest(id)
      await getTestTitle()
   }

   return (
      <ContentCard>
         <StyledDivofButton>
            <Button
               onClick={onClickToAddNewTest}
               color="primary"
               variant="contained"
            >
               + ADD NEW TEST
            </Button>
         </StyledDivofButton>
         <StyledUl>
            {tests.map((test) => {
               return (
                  <StyledLists key={test.id}>
                     <StyledSpan>{test.title}</StyledSpan>
                     <TestItem
                        id={test.id}
                        active={test.active}
                        onClickToDelete={onClickToDelete}
                        toggleHandler={toggleHandler}
                     />
                  </StyledLists>
               )
            })}
         </StyledUl>
      </ContentCard>
   )
}

export default TestPage

const StyledDivofButton = styled.div`
   display: flex;
   justify-content: flex-end;
`

const StyledUl = styled.ul`
   margin: 0;
   padding: 0;
`
const StyledLists = styled.li`
   width: 100%;
   height: 66px;
   margin: 16px 0px;
   padding: 20px 23px 20px 16px;
   list-style: none;
   border-radius: 8px;
   background: #ffffff;
   box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.09);
   display: flex;
   justify-content: space-between;
   box-sizing: border-box;
`

const StyledSpan = styled.span`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 18px;
   color: #4c4859;
`
