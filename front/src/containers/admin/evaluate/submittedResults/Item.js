import React from 'react'
import { Link } from 'react-router-dom'
import {
   DeleteIcon,
   StyledButton,
   StyledCheckSquare,
} from '../../../../components/UI/table/Table'
import ConfirmModal from '../../../../components/UI/modal/ConfirmModal'
import { ROUTES } from '../../../../utils/constants/general'

const Item = ({ onClickToDelete, id }) => {
   const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false)
   const modalHandler = () => {
      setConfirmDeleteModal((prev) => !prev)
   }
   const deleteHandler = () => {
      onClickToDelete(id)
      modalHandler()
   }

   return (
      <>
         <Link to={`${ROUTES.EVALUATE_QUESTIONS}/${id}`} key={id}>
            <StyledCheckSquare />
         </Link>
         <StyledButton type="button" onClick={modalHandler}>
            <DeleteIcon />
         </StyledButton>
         <ConfirmModal
            open={confirmDeleteModal}
            onClose={modalHandler}
            onDelete={deleteHandler}
         />
      </>
   )
}

export default Item
