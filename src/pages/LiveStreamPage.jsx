import React from 'react'
import LiveStream from '../components/LiveStream'
import Chat from '../components/Chat'

export default function LiveStreamPage() {
  return (
// Inside the LiveStream component
<div className="flex">
  <div className="w-3/4">
    <LiveStream />
  </div>
  <div className="w-1/4">
    <Chat />
  </div>
</div>


  )
}
