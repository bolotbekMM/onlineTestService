import React from 'react'
import { useParams } from 'react-router-dom'
import {
   getUserTestAnswerQuestionRequest,
   getUserTestAnswerRequest,
} from '../../../../api/testService'
import { QUESTION_TYPES } from '../../../../utils/constants/QuestionTypesAndOptions'
import DescribeImagePage from '../whatYouHearePage/DescribeImagePage'
import HighlightTheAnswer from '../whatYouHearePage/HighLightTheAnswer'
import ListenAndSelectRealEnglishWord from '../whatYouHearePage/ListenAndSelectRealEnglishWord'
import RecordSayingStatementPage from '../whatYouHearePage/RecordSayingStatementPage'
import RespondInAtLeastNWords from '../whatYouHearePage/RespondInAtLeastNWords'
import SelectMainIdea from '../whatYouHearePage/SelectMainIdea'
import SelectRealEnglishWords from '../whatYouHearePage/SelectRealEnglishWords'
import SelectBestTitle from '../whatYouHearePage/SelectTheBestTitle'
import TypewhatYouHearPage from '../whatYouHearePage/TypewhatYouHearPage'

const QuestionType = () => {
   const params = useParams()

   const paramsUserID = params.UserID

   const idQuestion = params.questionID

   const [type, setType] = React.useState()
   const [userAnswer, setuserAnswer] = React.useState({})
   const [testTitle, setTestTitle] = React.useState('')

   const getQuestionById = async () => {
      try {
         const response = await getUserTestAnswerQuestionRequest(idQuestion)
         setType(response.data.mainQuestion.type)
         setuserAnswer(response.data)
      } catch (error) {
         console.error(error)
      }
   }
   const getTestById = async () => {
      try {
         const response = await getUserTestAnswerRequest(paramsUserID)
         setTestTitle(response.data.mainTest.title)
      } catch (error) {
         console.error(error)
      }
   }

   React.useEffect(() => {
      getQuestionById()
      getTestById()
   }, [])

   return (
      <div>
         {type === QUESTION_TYPES.SELECT_THE_REAL_ENGLISH_WORD && (
            <SelectRealEnglishWords
               userAnswer={userAnswer}
               testTitle={testTitle}
            />
         )}
         {type === QUESTION_TYPES.DESCRIBE_IMAGE && (
            <DescribeImagePage userAnswer={userAnswer} testTitle={testTitle} />
         )}
         {type === QUESTION_TYPES.RESPOND_IN_AT_LEAST_N_WORDS && (
            <RespondInAtLeastNWords testTitle={testTitle} />
         )}
         {type === QUESTION_TYPES.LISTEN_AND_SELECT_REAL_ENGLISH_WORD && (
            <ListenAndSelectRealEnglishWord
               userAnswer={userAnswer}
               testTitle={testTitle}
            />
         )}

         {type === QUESTION_TYPES.TYPE_WHAT_YOU_HEAR && (
            <TypewhatYouHearPage
               userAnswer={userAnswer}
               testTitle={testTitle}
            />
         )}
         {type === QUESTION_TYPES.SELECT_MAIN_IDEA && (
            <SelectMainIdea userAnswer={userAnswer} testTitle={testTitle} />
         )}
         {type === QUESTION_TYPES.HIGHLIGHT_THE_ANSWER && (
            <HighlightTheAnswer testTitle={testTitle} />
         )}
         {type === QUESTION_TYPES.SELSECT_BEST_TITLE && (
            <SelectBestTitle userAnswer={userAnswer} testTitle={testTitle} />
         )}
         {type === QUESTION_TYPES.RECORD_SAYING_STATEMENT && (
            <RecordSayingStatementPage
               userAnswer={userAnswer}
               testTitle={testTitle}
            />
         )}
      </div>
   )
}

export default QuestionType
