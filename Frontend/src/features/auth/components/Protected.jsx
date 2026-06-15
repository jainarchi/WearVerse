import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../shared/Loading.jsx'

const Protected = ({ children, role = 'buyer' }) => {

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)




  if (loading) {
    return <Loading />
  }


  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />
  }



  return children

}

export default Protected
