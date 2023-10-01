import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Navigate, Link } from 'react-router-dom'
import * as yup from 'yup'
import { ReactComponent as VisibilityOffIcon } from '../../assets/icons/x-1.svg'
import { ReactComponent as VisibilityIcon } from '../../assets/icons/x.svg'
import { ReactComponent as LockOutlineIcon } from '../../assets/icons/key.svg'
import { ReactComponent as LoginImage } from '../../assets/icons/Group6.svg'
import classes from './LoginPage.module.css'
import Input from '../../components/UI/input/index'
import Button from '../../components/UI/button/index'
import { login } from '../../store/auth'
import { ROLES, ROUTES } from '../../utils/constants/general'

export default function LoginPage() {
   const dispatch = useDispatch()
   const isAuthorized = useSelector((state) => state.auth.isAuthorized)
   const role = useSelector((state) => state.auth.user?.role)
   const [visibility, setVisibility] = useState(false)

   const togglePasswordHandler = () => {
      setVisibility((prevVisibility) => !prevVisibility)
   }

   async function submitHandler(formValue) {
      dispatch(login(formValue))
   }

   const validationSchema = yup.object({
      gmail: yup
         .string('Enter your email')
         .email('Enter a valid email')
         .required('Email is required'),

      password: yup
         .string('Enter your password')
         .min(4, 'Password should be of minimum 4 characters length')
         .required('Password is required'),
   })

   const formik = useFormik({
      initialValues: {
         gmail: '',
         password: '',
      },
      validationSchema,
      onSubmit: submitHandler,
   })

   if (isAuthorized) {
      if (role === ROLES.ROLE_ADMIN) {
         return <Navigate to={ROUTES.ADMIN_TEST} />
      }
      return <Navigate to={ROUTES.USER} />
   }

   const errorMessage = () => {
      const errorValidation =
         (formik.touched.gmail && formik.errors.gmail) ||
         (formik.touched.password && formik.errors.password)
      return errorValidation
   }

   return (
      <div className={classes.container}>
         <div className={classes.leftSide}>
            <LoginImage />
         </div>
         <div className={classes.rightSide}>
            <div className={classes.form_container}>
               <form onSubmit={formik.handleSubmit}>
                  <LockOutlineIcon />
                  <h2>Sign in</h2>
                  <Input
                     label="Email"
                     variant="outlined"
                     fullWidth
                     id="gmail"
                     sx={{ mb: 3 }}
                     value={formik.values.gmail}
                     onChange={formik.handleChange}
                     error={
                        formik.touched.gmail && Boolean(formik.errors.gmail)
                     }
                  />
                  <Input
                     id="password"
                     label="Password"
                     type={visibility ? 'text' : 'password'}
                     variant="outlined"
                     fullWidth
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                     }
                     InputProps={{
                        endAdornment: (
                           <button
                              type="button"
                              className={classes.btn}
                              onClick={togglePasswordHandler}
                           >
                              {visibility ? (
                                 <VisibilityIcon />
                              ) : (
                                 <VisibilityOffIcon />
                              )}
                           </button>
                        ),
                     }}
                  />
                  <p>{errorMessage()}</p>
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     fullWidth
                     sx={{ mt: 3 }}
                  >
                     SIGN IN
                  </Button>
                  <Link to={ROUTES.SIGNUP} className={classes.link}>
                     <Button
                        variant="outlined"
                        color="primary"
                        sx={{ height: '42px', mt: 4 }}
                     >
                        REGISTRATION
                     </Button>
                  </Link>
               </form>
            </div>
         </div>
      </div>
   )
}
