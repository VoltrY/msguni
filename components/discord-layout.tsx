"use client"

import React from 'react';
import { useState } from "react"
import { ServerSidebar } from "@/components/server-sidebar"
// import { ChannelSidebar } from "@/components/channel-sidebar"
import { ChatArea } from "@/components/chat-area"
import { UserSidebar } from "@/components/user-sidebar"

interface DiscordLayoutProps {
  children: React.ReactNode;
}

export const DiscordLayout: React.FC<DiscordLayoutProps> = ({ children }) => {
  const [selectedServer, setSelectedServer] = useState("1")
  const [selectedChannel, setSelectedChannel] = useState("1")

  return (
    <div className="flex h-screen bg-[#1e1f22] text-white">
      <ServerSidebar selectedServer={selectedServer} setSelectedServer={setSelectedServer} />
      {/* <ChannelSidebar selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} /> */}
      <ChatArea selectedChannel={selectedChannel} />
      <UserSidebar />
    </div>
  )
}

export default DiscordLayout;

