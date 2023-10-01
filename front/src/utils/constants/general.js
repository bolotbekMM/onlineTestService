export const ROLES = {
   ROLE_ADMIN: 'ADMIN',
   ROLE_USER: 'USER',
}

export const ROUTES = {
   LOGIN: '/login',
   SIGNUP: '/sign-up',
   USER: '/user/tests',
   ADMIN_TEST: '/admin/test',
   SUBMITED_RESULTS: '/admin/submited-results',
   ADD_TEST_PAGE: '/admin/test/addTestPage',
   ADD_QUESTION_PAGE: '/admin/test/addQuestionPage',
   QUESTION_TYPE: '/admin/test/questionType',
   DESCRIBE_IMAGE: 'describe_image',
   SELECT_BEST_TITLE: 'select-best-title',
   RESPOND_IN_AT_LEAST_N_WORDS: 'respond-in-at-least-n-words',
   TYPE_WHAT_YOU_HEAR: 'type-what-you-hear',
   RECORD_SAYING_STATEMENT: 'record-saying-statement',
   SELECT_REAL_ENGLISH_WORDS: 'select-real-english-words',
   LISTEN_AND_SELECT_REAL_ENGLISH_WORD: 'listen-and-select-real-english-words',
   SELECT_MAIN_IDEA: 'select-the-main-idea',
   HIGHLIGHT_THE_ANSWER: 'highlight-the_answer',
   TESTBYID: '/admin/test/addTestPage/:testById',
   HOME_PAGE: '/user/tests/home-page',
   START_PRACTICE_TEST: '/user/start-practice-test/test',
   START_PRACTICE_TEST_TEST_BY_ID: '/user/start-practice-test/test/:testById',
   CHECKING_YOUR_DEVICE:
      '/user/start-practice-test/test/:testById/checking-your-device',
   TEST_QUESTIONBYID:
      '/user/start-practice-test/test/:testById/question/:questionById',
   USER_SELECT_REAL_ENGLISH_WORDS: 'user/select-real-english-words',
   END_TEST: '/user/end_test',
   NEWTESTBYID: '/admin/test/:testId/questionType',
   QUESTIONBYID: '/admin/test/addTestPage/:testById/questionType/:questionById',
   USER_RESPOND_IN_AT_LEAST_N_WORDS: '/user/respond-in-at-least-n-words',
   USER_RECORD_SAYING_STATEMENT: '/user/record-saying-statement',
   EVALUATE_QUESTIONS: '/admin/submited-results/evaluate-questions',
   EVALUATE_QUESTION_BY_ID:
      '/admin/submited-results/evaluate-questions/:userId',
   EVALUATE_QUESTION_TYPE:
      '/admin/submited-results/evaluate-questions/:UserID/questionType/:questionID',
}

export const BILINGUAL_TOKEN = 'BILINGUAL_TOKEN'
export const BILINGUAL_USER = 'BILINGUAL_USER'
export const GET_FILE_FROM_SERVER = 'http://localhost:5000/api/files/upload'
