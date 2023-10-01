import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../components/UI/button/index'
import LayoutTest from '../../../layout/clientLayout/testLayout/LayoutTest'
import { ReactComponent as Sound } from '../../../assets/icons/volume-1.svg'
import { ReactComponent as Check } from '../../../assets/icons/check.svg'
import { submitQuestion1 } from '../../../store/testActions'
import { GET_FILE_FROM_SERVER, ROUTES } from '../../../utils/constants/general'
import { QUESTION_TYPES } from '../../../utils/constants/QuestionTypesAndOptions'

function UserListenAndRealEnglishWords() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { testId } = useParams()
   const { questions } = useSelector((state) => state.test)
   const { currentQuestion } = useSelector((state) => state.test)
   const attemptId = useSelector((state) => state.test.attemptId)
   const [select, setSelect] = useState({ options: [] })

   useEffect(() => {
      setSelect(questions[currentQuestion])
      if (questions.length === 0) {
         return navigate('/user/tests')
      }
      return null
   }, [])

   const enabled = select.options.filter((item) => item?.isActive)

   const onSelectHandler = (id) => {
      const updates = select.options.map((item) => {
         if (item.id === id) {
            return { ...item, isActive: !item.isActive }
         }
         return item
      })
      setSelect({ ...select, options: updates })
   }

   const submitBtn = (e) => {
      e.preventDefault()
      const actives = select.options
         .filter(({ isActive }) => isActive)
         .map(({ id }) => ({ optionId: id, answer: true }))
      try {
         const answers = {
            type: QUESTION_TYPES.LISTEN_AND_SELECT_REAL_ENGLISH_WORD,
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
   const playAudioHandler = (file) => {
      const audio = new Audio(`${GET_FILE_FROM_SERVER}/${file}`)
      audio.play()
   }

   return (
      <LayoutTest>
         <>
            <HeaderTitle>
               Select the real English words in this list
            </HeaderTitle>
            <MainDiv>
               <Div>
                  {select.options &&
                     select.options.map((item) => {
                        return (
                           <StyledInput
                              key={item.id}
                              style={{
                                 border: item.isActive
                                    ? '2px solid #3a10e5'
                                    : '2px solid #d4d0d0',
                              }}
                           >
                              <InnerDivv>
                                 <Sound
                                    onClick={() => playAudioHandler(item.file)}
                                 />{' '}
                                 <P>{item.word}</P>
                              </InnerDivv>
                              <CheckDiv
                                 onClick={() => onSelectHandler(item.id)}
                                 style={{
                                    background: item.isActive ? '#3a10e5' : '',
                                    borderLeft: item.isActive
                                       ? '#3a10e5'
                                       : '2px solid #d4d0d0',
                                 }}
                              >
                                 <Check
                                    style={{
                                       color: item.isActive ? '#FEFEFF' : '',
                                    }}
                                 />
                              </CheckDiv>
                           </StyledInput>
                        )
                     })}
               </Div>
            </MainDiv>
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

export default UserListenAndRealEnglishWords

const CheckDiv = styled.div`
   height: 42px;
   width: 47px;
   border-radius: 0 8px 8px 0;
   margin-left: 10px;
   display: flex;
   justify-content: center;
   align-items: center;
`
const InnerDivv = styled.div`
   width: 135px;
   font-family: 'DINNextRoundedLTW01-Regular';
   color: #4c4859;
   display: flex;
   align-items: center;
   & p {
      font-weight: 600;
   }
`

const StyledInput = styled.div`
   box-sizing: border-box;
   width: 192px;
   height: 42px;
   border-radius: 8px;
   display: flex;
   align-items: center;
   padding-left: 16px;
   margin-bottom: 18px;
   margin-right: 18px;
`

const MainDiv = styled.div`
   display: flex;
   justify-content: center;
`

const Div = styled.span`
   width: 730px;
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
`
const P = styled.p`
   margin-left: 15px;
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
