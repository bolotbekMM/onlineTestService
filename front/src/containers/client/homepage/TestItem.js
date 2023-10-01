import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import MainContainer from '../../../layout/clientLayout/mainContainerClient/MainContainer'
import homePage from '../../../assets/icons/homePage1.svg'
import Button from '../../../components/UI/button/index'
import { ROUTES } from '../../../utils/constants/general'

const StyledCardDiv = styled.div`
   margin-left: auto;
   margin-right: auto;
   width: 100%;
`
const StyledContentCard = styled.div`
   margin-top: 66px;
   padding: 35px 44px;
   border-radius: 20px;
   border-radius: 10px;
   box-shadow: 0px 4px 39px rgba(196, 196, 196, 0.6);
   background-color: #ffffff;
   box-sizing: border-box;
   display: block;
`

const Div = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 800px;
   margin: 0 auto;
`
const H1minutes = styled('h1')`
   font-size: 15px;
   line-height: 18px;
   color: #3a10e5;
`
const P1 = styled('p')`
   font-size: 26px;
   line-height: 29px;
   text-transform: capitalize;
   color: #4c4859;
`
const P2 = styled('p')`
   color: #4c4859;
`
const DivText = styled('div')`
   width: 300px;
   position: relative;
   right: 100px;
`
const DivButton = styled('div')`
   position: relative;
   top: 40px;
`
const TestItem = ({ test }) => {
   const { title, duration, shortDescription, id } = test
   const navigate = useNavigate()

   const onClicktoPractice = () => {
      navigate(`${ROUTES.START_PRACTICE_TEST}/${id}`)
   }
   return (
      <MainContainer>
         <StyledCardDiv>
            <StyledContentCard>
               <Div>
                  <div>
                     <img src={homePage} alt="" />
                  </div>
                  <DivText>
                     <H1minutes>{duration}</H1minutes>
                     <P1>{title} </P1>
                     <P2>{shortDescription}</P2>
                  </DivText>
                  <DivButton>
                     <Button onClick={onClicktoPractice}>PRACTICE TEST</Button>
                  </DivButton>
               </Div>
            </StyledContentCard>
         </StyledCardDiv>
      </MainContainer>
   )
}
export default TestItem
