"use client"

import { useState } from "react"
import { ServerSidebar } from "@/components/server-sidebar"
import { ChannelSidebar } from "@/components/channel-sidebar"
import { ChatArea } from "@/components/chat-area"
import { UserSidebar } from "@/components/user-sidebar"

export function DiscordLayout() {
  const [selectedServer, setSelectedServer] = useState("1")
  const [selectedChannel, setSelectedChannel] = useState("1")

  return (
    <div className="flex h-screen bg-[#1e1f22] text-white">
      <ServerSidebar selectedServer={selectedServer} setSelectedServer={setSelectedServer} />
      <ChannelSidebar selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
      <ChatArea selectedChannel={selectedChannel} />
      <UserSidebar />
    </div>
  )
}

