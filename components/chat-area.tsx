"use client"

import type React from "react"

import { useState } from "react"
import {
  Hash,
  Bell,
  Pin,
  Users,
  Inbox,
  HelpCircle,
  PlusCircle,
  Gift,
  Sticker,
  GiftIcon as GIF,
  Smile,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ChatAreaProps {
  selectedChannel: string
}

export function ChatArea({ selectedChannel }: ChatAreaProps) {
  const [message, setMessage] = useState("")

  const messages = [
    {
      id: "1",
      user: { name: "Ahmet", avatar: "/placeholder.svg?height=40&width=40", tag: "1234" },
      content: "Merhaba! Discord klonu nasıl görünüyor?",
      timestamp: "Bugün saat 14:30",
    },
    {
      id: "2",
      user: { name: "Ayşe", avatar: "/placeholder.svg?height=40&width=40", tag: "5678" },
      content: "Harika görünüyor! Tüm özellikler çalışıyor mu?",
      timestamp: "Bugün saat 14:32",
    },
    {
      id: "3",
      user: { name: "Mehmet", avatar: "/placeholder.svg?height=40&width=40", tag: "9012" },
      content: "Evet, mesajlaşma ve kanallar çalışıyor. Ses özelliği henüz eklenmedi.",
      timestamp: "Bugün saat 14:35",
    },
    {
      id: "4",
      user: { name: "Zeynep", avatar: "/placeholder.svg?height=40&width=40", tag: "3456" },
      content: "Tasarım gerçekten Discord'a çok benziyor! 👍",
      timestamp: "Bugün saat 14:40",
    },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, you would add the message to the messages array
      setMessage("")
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#313338]">
      <div className="h-12 px-4 flex items-center border-b border-[#1e1f22] shadow-sm">
        <Hash className="w-6 h-6 text-[#96989d] mr-2" />
        <span className="font-bold text-white">genel</span>
        <Separator orientation="vertical" className="h-6 mx-2 bg-[#3f4147]" />
        <span className="text-sm text-[#96989d]">Sunucu için genel sohbet kanalı</span>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
            <Pin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
            <Users className="w-5 h-5" />
          </Button>
          <Input
            className="h-6 w-36 bg-[#1e1f22] border-none text-sm text-[#b5bac1] placeholder:text-[#6d6f78]"
            placeholder="Ara"
          />
          <Button variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
            <Inbox className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-[#5865f2] flex items-center justify-center mb-4">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2"># genel kanalına hoş geldiniz!</h2>
          <p className="text-[#b5bac1] mb-6">Bu, #genel kanalının başlangıcıdır.</p>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="flex group">
            <Avatar className="w-10 h-10 mr-4 mt-0.5">
              <AvatarImage src={msg.user.avatar} />
              <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-white hover:underline cursor-pointer">{msg.user.name}</span>
                <span className="text-xs text-[#b5bac1] ml-2">{msg.timestamp}</span>
              </div>
              <p className="text-[#dbdee1] mt-1">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="flex items-center bg-[#383a40] rounded-lg px-4">
            <Button type="button" variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
              <PlusCircle className="w-5 h-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-[#dbdee1] placeholder:text-[#6d6f78]"
              placeholder={`# genel kanalına mesaj gönder`}
            />
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
                <Gift className="w-5 h-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
                <GIF className="w-5 h-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
                <Sticker className="w-5 h-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-[#b5bac1] hover:text-white">
                <Smile className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

