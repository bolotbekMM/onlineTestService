import styled from 'styled-components'
import { useState, useEffect } from 'react'
import LinearDeterminateLong from './LinearDeterminateLong'
import { getPercent } from '../../../utils/helpers'

const CountTimeLong = ({ time, totalTime }) => {
   const [time1, setTime1] = useState({ min: 0, sec: 0 })
   useEffect(() => {
      setTime1({ min: time, sec: 0 })
      return () => setTime1({ min: 0, sec: 0 })
   }, [time])

   const timerMinutes = time1.min < 10 ? `0${time1.min}` : time1.min || '00'
   const timerSeconds = time1.sec < 10 ? `0${time1.sec}` : time1.sec
   const percent = getPercent(totalTime * 60 || 60, time1.sec + time1.min * 60)

   useEffect(() => {
      const myInterval = setInterval(() => {
         setTime1((time1) => {
            const updateIn = { ...time1 }
            if (time1.sec > 0) updateIn.sec -= 1
            if (time1.sec === 0) {
               if (time1.min === 0) {
                  clearInterval(myInterval)
               } else if (time1.min > 0) {
                  updateIn.min -= 1
                  updateIn.sec = 59
               }
            }
            return updateIn
         })
      }, 1000)
      return () => clearInterval(myInterval)
   }, [])

   return (
      <div>
         <Div>
            <div>
               <H2time>
                  {timerMinutes}:{timerSeconds}
               </H2time>
            </div>
         </Div>
         <LinearDeterminateLong percent={percent} />
      </div>
   )
}
export default CountTimeLong
const H2time = styled('h2')`
   color: #4c4859;
   width: 68px;
   height: 24px;
`

const Div = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
`
