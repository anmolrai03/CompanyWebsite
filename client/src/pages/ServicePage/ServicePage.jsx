import React from 'react'
import { useParams } from 'react-router-dom'

function ServicePage() {

  let { serviceName } = useParams();

  return (
    <div className='pt-28'>
      <h2>Service Page</h2>
      <h3>{serviceName}</h3>
    </div>
  )
}

export default ServicePage