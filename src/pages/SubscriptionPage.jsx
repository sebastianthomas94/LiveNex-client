import React from 'react'
import Subscription from '../components/Subscription'
import Header from '../components/header'
import SideBar from '../components/sidebar'

export default function SubscriptionPage() {
  return (
    <>
    <Header />
    <div className="flex">
      <SideBar />
      <div className="flex-grow ">
        <Subscription />
      </div>
    </div>
  </>
  )
}
