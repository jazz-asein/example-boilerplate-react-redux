import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Users from './users'
import Head from './head'

const Home = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios('/api/v1/users').then(({ data }) => setUsers(data))
  }, [users])
  return (
    <div>
      <Head title="Home" />
      <Route exact path="/users" component={() => <Users users={users} />} />
    </div>
  )
}

Home.propTypes = {}

export default Home
