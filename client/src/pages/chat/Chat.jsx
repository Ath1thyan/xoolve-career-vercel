import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from "../../components/Layout"

const HomePage = () => {
  const { user } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <Layout>
      <div className='flex h-[84vh] mr-3 rounded-lg overflow-hidden bg-pink-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20'>
        <Sidebar />
        <MessageContainer />
      </div>
    </Layout>
  )
}


export default HomePage