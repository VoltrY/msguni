import { Home, Plus, Compass, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ServerSidebarProps {
  selectedServer: string
  setSelectedServer: (id: string) => void
}

export function ServerSidebar({ selectedServer, setSelectedServer }: ServerSidebarProps) {
  const servers = [
    { id: "1", name: "Discord", icon: "D", color: "#5865f2" },
    { id: "2", name: "Gaming", icon: "G", color: "#57f287" },
    { id: "3", name: "Music", icon: "M", color: "#fee75c" },
    { id: "4", name: "Art", icon: "A", color: "#eb459e" },
    { id: "5", name: "Movies", icon: "🎬", color: "#ed4245" },
  ]

  return (
    <div className="w-[72px] h-full bg-[#1e1f22] flex flex-col items-center py-3 gap-2 overflow-y-auto">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "w-12 h-12 rounded-[24px] flex items-center justify-center bg-[#5865f2] hover:rounded-[16px] transition-all duration-200",
                selectedServer === "home" && "rounded-[16px] bg-[#5865f2]",
              )}
              onClick={() => setSelectedServer("home")}
            >
              <Home className="w-6 h-6 text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Ana Sayfa</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator className="w-8 h-0.5 bg-[#35363c] my-1" />

      {servers.map((server) => (
        <TooltipProvider key={server.id} delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "w-12 h-12 rounded-[24px] flex items-center justify-center hover:rounded-[16px] transition-all duration-200 relative",
                  selectedServer === server.id ? "rounded-[16px]" : "rounded-[24px]",
                )}
                style={{ backgroundColor: server.color }}
                onClick={() => setSelectedServer(server.id)}
              >
                {selectedServer === server.id && (
                  <div className="absolute left-[-16px] w-2 h-10 bg-white rounded-r-full" />
                )}
                <span className="text-xl font-semibold text-white">{server.icon}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{server.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-12 h-12 rounded-[24px] flex items-center justify-center bg-[#35363c] hover:bg-[#3ba55c] hover:rounded-[16px] transition-all duration-200">
              <Plus className="w-6 h-6 text-[#3ba55c] group-hover:text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sunucu Ekle</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-12 h-12 rounded-[24px] flex items-center justify-center bg-[#35363c] hover:bg-[#3ba55c] hover:rounded-[16px] transition-all duration-200">
              <Compass className="w-6 h-6 text-[#3ba55c] group-hover:text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sunucu Keşfet</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator className="w-8 h-0.5 bg-[#35363c] my-1" />

      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-12 h-12 rounded-[24px] flex items-center justify-center bg-[#35363c] hover:bg-[#3ba55c] hover:rounded-[16px] transition-all duration-200">
              <Download className="w-6 h-6 text-[#3ba55c] group-hover:text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Uygulamayı İndir</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

