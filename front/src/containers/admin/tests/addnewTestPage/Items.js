import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { putQuestionActivationRequest } from '../../../../api/testService'
import SwitchButton from '../../../../components/UI/switchButton/index'
import { ReactComponent as Edit } from '../../../../assets/icons/edit.svg'
import { ReactComponent as Trash } from '../../../../assets/icons/trash.svg'
import ConfirmModal from '../../../../components/UI/modal/ConfirmModal'

const Items = (props) => {
   const { onClickToDelete, id, active } = props
   const params = useParams()
   const { testById } = params

   const [accessToQuestion, setAccessToQuestion] = React.useState(active)
   const onChangeHandlerSwitcher = async () => {
      try {
         setAccessToQuestion((accessToQuestion) => !accessToQuestion)
         await putQuestionActivationRequest({
            id,
            isActive: !accessToQuestion,
         })
      } catch (e) {
         console.error(e)
      }
   }

   const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false)
   const modalHandler = () => {
      setConfirmDeleteModal((prev) => !prev)
   }
   const deleteHandler = () => {
      onClickToDelete(id)
      modalHandler()
   }
   return (
      <StyledIconsDiv>
         <SwitchButton
            type="checkbox"
            onChange={onChangeHandlerSwitcher}
            checked={accessToQuestion}
         />
         <Link
            to={`/admin/test/addTestPage/${testById}/questionType/${id}`}
            key={id}
         >
            <StyledEdit />
         </Link>

         <StyledButton type="button" onClick={modalHandler}>
            <StyledTresh />
         </StyledButton>
         <ConfirmModal
            open={confirmDeleteModal}
            onClose={modalHandler}
            onDelete={deleteHandler}
         />
      </StyledIconsDiv>
   )
}

export default Items
const StyledButton = styled.button`
   border: none;
   padding: 0px;
   background: inherit;
   cursor: pointer;
`

const StyledIconsDiv = styled.div`
   margin-left: 10px;
   width: 112px;
   display: flex;
   justify-content: space-between;
`
const StyledTresh = styled(Trash)`
   width: 22px;
   height: 22px;
   color: #9a9a9a;
   :hover {
      color: #f61414;
   }
`
const StyledEdit = styled(Edit)`
   width: 22px;
   height: 22px;
   color: #9a9a9a;
   :hover {
      color: #0f85f1;
   }
`
