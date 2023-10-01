import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import LayoutClient from '../../../layout/clientLayout/layoutClient/LayoutClient'
import { ReactComponent as Circle } from '../../../assets/icons/progress.svg'
import { getTest } from '../../../store/testActions'
import { ROUTES } from '../../../utils/constants/general'
import { testSliceActions } from '../../../store'

function CheckingYourDevice() {
   const navigate = useNavigate()
   const { testById } = useParams()

   const dispatch = useDispatch()

   useEffect(async () => {
      dispatch(testSliceActions.clearState())
      const { questions, id } = await dispatch(getTest(testById)).unwrap()

      const timer = setTimeout(() => {
         navigate(`/user/test/${id}/${ROUTES[questions[0].type]}`)
      }, 3000)

      return () => clearTimeout(timer)
   }, [])

   return (
      <LayoutClient>
         <HeaderTitle>Checking your device...</HeaderTitle>
         <P>
            This process is automatic, and may take a few second. Please wait...
         </P>
         <StyleBox>
            <CircleStyle />
         </StyleBox>
      </LayoutClient>
   )
}

export default CheckingYourDevice

const CircleStyle = styled(Circle)`
   animation-name: rotate;
   animation-duration: 3s;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
   @keyframes rotate {
      from {
         transform: rotate(-360deg);
      }
      to {
         transform: rotate(360deg);
      }
   }
`

const HeaderTitle = styled.p`
   font-family: 'DINNextRoundedLTW01';
   font-size: 28px;
   line-height: 30px;
   color: #4c4859;
   display: flex;
   justify-content: center;
`
const P = styled.p`
   font-family: 'DINNextRoundedLTW01';
   font-size: 18px;
   line-height: 20px;
   color: #4c4859;
   display: flex;
   justify-content: center;
`
const StyleBox = styled.div`
   margin-top: 126px;
   margin-bottom: 126px;
   display: flex;
   justify-content: center;
   align-items: center;
`
