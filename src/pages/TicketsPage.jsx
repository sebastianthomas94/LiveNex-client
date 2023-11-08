import React from 'react'
import SideBar from '../components/sidebar'
import Header from '../components/header'
import TicketList from '../components/TicketList'

function TicketsPage() {
  return (
    <>
    <Header />
    <div className="flex">
      <SideBar />
      <div className="flex-grow m-12">
        <TicketList />
      </div>
    </div>
  </>
  )
}

export default TicketsPage