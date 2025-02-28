import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserSidebar() {
  const users = [
    { id: "1", name: "Ahmet", status: "online", avatar: "/placeholder.svg?height=32&width=32", role: "Yönetici" },
    { id: "2", name: "Ayşe", status: "online", avatar: "/placeholder.svg?height=32&width=32", role: "Moderatör" },
    { id: "3", name: "Mehmet", status: "idle", avatar: "/placeholder.svg?height=32&width=32", role: "Üye" },
    { id: "4", name: "Zeynep", status: "dnd", avatar: "/placeholder.svg?height=32&width=32", role: "Üye" },
    { id: "5", name: "Ali", status: "offline", avatar: "/placeholder.svg?height=32&width=32", role: "Üye" },
    { id: "6", name: "Fatma", status: "online", avatar: "/placeholder.svg?height=32&width=32", role: "Üye" },
    { id: "7", name: "Mustafa", status: "online", avatar: "/placeholder.svg?height=32&width=32", role: "Üye" },
    { id: "8", name: "Elif", status: "idle", avatar: "/placeholder.svg?height=32&width=32", role: "Üye" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const roleGroups = {
    Yönetici: users.filter((user) => user.role === "Yönetici"),
    Moderatör: users.filter((user) => user.role === "Moderatör"),
    Üye: users.filter((user) => user.role === "Üye"),
  }

  return (
    <div className="w-60 h-full bg-[#2b2d31] flex flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#b5bac1]" />
          <Input
            placeholder="Ara"
            className="pl-9 bg-[#1e1f22] border-none h-9 text-sm text-[#b5bac1] placeholder:text-[#6d6f78]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {Object.entries(roleGroups).map(
          ([role, users]) =>
            users.length > 0 && (
              <div key={role} className="mt-4">
                <div className="px-2 text-xs font-semibold text-[#96989d] uppercase mb-1">
                  {role} — {users.length}
                </div>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#35363c] group cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2b2d31] ${getStatusColor(
                          user.status,
                        )}`}
                      ></div>
                    </div>
                    <span className="text-sm text-[#dbdee1]">{user.name}</span>
                  </div>
                ))}
              </div>
            ),
        )}
      </div>
    </div>
  )
}

