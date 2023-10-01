import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ContentCard from '../../../../components/UI/adminContentCard/index'
import AppSelect from '../../../../components/UI/select'
import Input from '../../../../components/UI/input/index'
import SelectRealEnglishWord from '../selectRealEnglishWords/SelectRealEnglishWords'
import {
   QUESTION_OPTIONS,
   QUESTION_TYPES,
} from '../../../../utils/constants/QuestionTypesAndOptions'
import { testActions } from '../../../../store'
import ListenAndSelectEnglishWords from '../listenAndSelectEnglishWords/ListenAndSelectEnglishWords'
import DescribeImage from '../describeImage/DescribeImage'
import RespondInAtLeastNWords from '../respondInAtLeastNWords/RespondInAtLeastNWords'
import TypeWhatYouHear from '../typeWhatYouHear/TypeWhatYouHear'
import HighLightTheAnswer from '../highlightTheAnswer/HighLightTheAnswer'
import SelectBestTitle from '../selectBestTitle/SelectBestTitle'
import SelectTheMainIdea from '../selectTheMainIdeal/SelectTheMainIdea'
import RecordSayingStatement from '../RecordSayingStatement/RecordSayingStatement'
import { getQuestionByIdRequest } from '../../../../api/testService'

const AddQuestionTypePage = () => {
   const params = useParams()

   const { testId: testId2, testById, questionById: questionByIdd } = params
   console.log(params)

   const dispatch = useDispatch()
   const title = useSelector((state) => state.questions.title)
   const duration = useSelector((state) => state.questions.duration)
   const type = useSelector((state) => state.questions.type)

   const getQuestionById = async () => {
      if (questionByIdd) {
         const response = await getQuestionByIdRequest(questionByIdd)
         dispatch(testActions.setTitle(response.data.title))
         dispatch(testActions.setDuration(response.data.duration))
         dispatch(testActions.setOptions(response.data))
         dispatch(testActions.setQuestionId(questionByIdd))
         dispatch(testActions.setType(response.data.type))
      }
   }

   React.useEffect(() => {
      getQuestionById()
   }, [])

   dispatch(testActions.setTestId(testById ?? testId2))
   const titleChageHandler = (e) => {
      dispatch(testActions.setTitle(e.target.value))
   }
   const durationChageHandler = (e) => {
      dispatch(testActions.setDuration(e.target.value))
   }
   const typeChageHandler = (e) => {
      dispatch(testActions.setType(e.target.value))
   }

   return (
      <ContentCard>
         <StyledDiv>
            <div>
               <StyledP>Title</StyledP>
               <Input
                  sx={{ width: '720px', mr: '18px' }}
                  onChange={titleChageHandler}
                  value={title}
               />
            </div>
            <div>
               <StyledP>Duration (in minutes)</StyledP>
               <Input
                  type="number"
                  onChange={durationChageHandler}
                  value={duration}
               />
            </div>
         </StyledDiv>
         <StyledP>Type</StyledP>
         <AppSelect
            value={type}
            onChange={typeChageHandler}
            options={QUESTION_OPTIONS}
         />
         {type === QUESTION_TYPES.SELECT_THE_REAL_ENGLISH_WORD && (
            <SelectRealEnglishWord />
         )}
         {type === QUESTION_TYPES.DESCRIBE_IMAGE && <DescribeImage />}
         {type === QUESTION_TYPES.RESPOND_IN_AT_LEAST_N_WORDS && (
            <RespondInAtLeastNWords />
         )}
         {type === QUESTION_TYPES.LISTEN_AND_SELECT_REAL_ENGLISH_WORD && (
            <ListenAndSelectEnglishWords />
         )}

         {type === QUESTION_TYPES.TYPE_WHAT_YOU_HEAR && <TypeWhatYouHear />}
         {type === QUESTION_TYPES.SELECT_MAIN_IDEA && <SelectTheMainIdea />}
         {type === QUESTION_TYPES.HIGHLIGHT_THE_ANSWER && (
            <HighLightTheAnswer />
         )}
         {type === QUESTION_TYPES.SELSECT_BEST_TITLE && <SelectBestTitle />}
         {type === QUESTION_TYPES.RECORD_SAYING_STATEMENT && (
            <RecordSayingStatement />
         )}
      </ContentCard>
   )
}

export default AddQuestionTypePage

const StyledP = styled.p`
   padding: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`

const StyledDiv = styled.div`
   width: 100%;
   display: flex;
   box-sizing: border-box;
`
