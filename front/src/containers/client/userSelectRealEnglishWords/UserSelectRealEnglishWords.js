import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../components/UI/button/index'
import CountTime from '../../../components/UI/progressTime/CountTime'
import LayoutTest from '../../../layout/clientLayout/testLayout/LayoutTest'
import { submitQuestion1 } from '../../../store/testActions'

import { ROUTES } from '../../../utils/constants/general'
import { QUESTION_TYPES } from '../../../utils/constants/QuestionTypesAndOptions'

function UserSelectRealEnglishWords() {
   const [select, setSelect] = useState({ options: [] })
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { testId } = useParams()
   const { questions } = useSelector((state) => state.test)
   const { currentQuestion } = useSelector((state) => state.test)
   const attemptId = useSelector((state) => state.test.attemptId)

   useEffect(() => {
      setSelect(questions[currentQuestion])
      if (questions.length === 0) {
         return navigate('/user/tests')
      }
      return null
   }, [])

   const onSelectHandler = (id) => {
      const updates = select.options.map((item) => {
         if (item.id === id) {
            return { ...item, isActive: !item.isActive }
         }
         return item
      })
      setSelect({ ...select, options: updates })
   }

   const enabled = select.options.filter((item) => item?.isActive)

   const submitBtn = (e) => {
      e.preventDefault()
      const actives = select.options
         .filter(({ isActive }) => isActive)
         .map(({ id }) => ({ optionId: id, answer: true }))
      try {
         const answers = {
            type: QUESTION_TYPES.SELECT_THE_REAL_ENGLISH_WORD,
            questionId: select.id,
            resultOptions: actives,
            testResultId: attemptId,
         }
         dispatch(submitQuestion1(answers)).then(() => {
            if (questions.length === currentQuestion + 1) {
               navigate(ROUTES.END_TEST)
            } else {
               navigate(
                  `/user/test/${testId}/${
                     ROUTES[questions[currentQuestion + 1]?.type]
                  }`
               )
            }
         })
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <LayoutTest>
         <>
            <CountTime time={select?.duration} totalTime={select?.duration} />
            <HeaderTitle>
               Select the real English words in this list
            </HeaderTitle>
            <Div>
               {select.options &&
                  select.options.map((item) => {
                     return (
                        <InnerDiv
                           key={item.id}
                           onClick={() => onSelectHandler(item.id)}
                           style={{
                              background: item.isActive ? '#3a10e5' : '',
                           }}
                        >
                           <P style={{ color: item.isActive ? '#FEFEFF' : '' }}>
                              {item.word}
                           </P>
                        </InnerDiv>
                     )
                  })}
            </Div>
            <FooterDiv>
               <Button
                  disabled={enabled.length === 0}
                  color="primary"
                  variant="contained"
                  sx={{ width: '143px' }}
                  onClick={submitBtn}
               >
                  NEXT
               </Button>
            </FooterDiv>
         </>
      </LayoutTest>
   )
}

export default UserSelectRealEnglishWords

const Div = styled.span`
   display: flex;
   flex-wrap: wrap;
   margin-top: 50px;
`

const InnerDiv = styled.div`
   margin-left: 10px;
   margin-bottom: 10px;
   padding: 0px 31px;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 40px;
   border: 2px solid #d4d0d0;
   border-radius: 8px;
   &:hover {
      border-color: #3a10e5;
   }
`

const P = styled.p`
   margin-left: 10px;
   margin-right: 10px;
   padding: 0;
   font-family: 'DINNextRoundedLTW01';
   font-size: 18px;
   color: #4c4859;
`

const FooterDiv = styled.div`
   margin-top: 90px;
   border-top: 2px solid #d4d0d0;
   padding-top: 32px;
   display: flex;
   justify-content: flex-end;
`

const HeaderTitle = styled.p`
   margin: 0 auto;
   margin-top: 50px;
   margin-bottom: 50px;
   font-family: 'DINNextRoundedLTW01';
   font-size: 28px;
   color: #4c4859;
   display: flex;
   justify-content: center;
`
