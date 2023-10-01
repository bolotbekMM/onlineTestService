import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants/general'

export default function PrivateRoute({ Component, roles }) {
   const isAuthorized = useSelector((state) => state.auth.isAuthorized)
   const user = useSelector((state) => state.auth.user)

   const userHasRequiredRole = user && roles.includes(user.role)

   if (!isAuthorized) return <Navigate to={ROUTES.LOGIN} />
   if (isAuthorized && !userHasRequiredRole)
      return <Navigate to={ROUTES.LOGIN} />
   return Component
}
