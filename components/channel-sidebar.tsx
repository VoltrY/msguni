import { Hash, VolumeX, Settings, ChevronDown, Plus, Headphones, Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChannelSidebarProps {
  selectedChannel: string
  setSelectedChannel: (id: string) => void
}

export function ChannelSidebar({ selectedChannel, setSelectedChannel }: ChannelSidebarProps) {
  const channels = [
    { id: "1", name: "genel", type: "text" },
    { id: "2", name: "yardım", type: "text" },
    { id: "3", name: "oyunlar", type: "text" },
    { id: "4", name: "müzik", type: "text" },
    { id: "5", name: "Genel", type: "voice" },
    { id: "6", name: "Oyun Odası", type: "voice" },
  ]

  return (
    <div className="w-60 h-full bg-[#2b2d31] flex flex-col">
      <div className="h-12 px-4 flex items-center border-b border-[#1e1f22] shadow-sm">
        <button className="w-full text-white font-medium flex items-center justify-between">
          <span>Discord Sunucusu</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="mt-4">
          <div className="px-2 flex items-center justify-between group">
            <div className="text-xs font-semibold text-[#96989d] flex items-center">
              <ChevronDown className="w-3 h-3 mr-1" />
              <span>METİN KANALLARI</span>
            </div>
            <button className="text-[#96989d] opacity-0 group-hover:opacity-100">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {channels
            .filter((channel) => channel.type === "text")
            .map((channel) => (
              <button
                key={channel.id}
                className={cn(
                  "w-full mt-1 px-2 py-1 flex items-center rounded text-[#96989d] hover:bg-[#35363c] hover:text-[#dbdee1]",
                  selectedChannel === channel.id && "bg-[#35363c] text-[#dbdee1]",
                )}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <Hash className="w-5 h-5 mr-1.5 text-[#96989d]" />
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
        </div>

        <div className="mt-4">
          <div className="px-2 flex items-center justify-between group">
            <div className="text-xs font-semibold text-[#96989d] flex items-center">
              <ChevronDown className="w-3 h-3 mr-1" />
              <span>SES KANALLARI</span>
            </div>
            <button className="text-[#96989d] opacity-0 group-hover:opacity-100">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {channels
            .filter((channel) => channel.type === "voice")
            .map((channel) => (
              <button
                key={channel.id}
                className={cn(
                  "w-full mt-1 px-2 py-1 flex items-center rounded text-[#96989d] hover:bg-[#35363c] hover:text-[#dbdee1]",
                  selectedChannel === channel.id && "bg-[#35363c] text-[#dbdee1]",
                )}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <VolumeX className="w-5 h-5 mr-1.5 text-[#96989d]" />
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
        </div>
      </div>

      <div className="h-[52px] px-2 bg-[#232428] flex items-center">
        <div className="flex items-center flex-1">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">Kullanıcı</span>
            <span className="text-xs text-[#b5bac1]">#1234</span>
          </div>
        </div>
        <div className="flex gap-1">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#35363c] rounded-md">
                  <Mic className="w-5 h-5 text-[#b5bac1]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Mikrofon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#35363c] rounded-md">
                  <Headphones className="w-5 h-5 text-[#b5bac1]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Kulaklık</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#35363c] rounded-md">
                  <Settings className="w-5 h-5 text-[#b5bac1]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Ayarlar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

