import React from 'react';

interface ChannelSidebarProps {
  selectedChannel: string;
  setSelectedChannel: (channelId: string) => void;
}

export const ChannelSidebar: React.FC<ChannelSidebarProps> = ({ 
  selectedChannel, 
  setSelectedChannel 
}) => {
  return (
    <div className="w-60 bg-gray-800 text-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold">Kanallar</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div 
          className={`p-2 rounded cursor-pointer ${selectedChannel === "1" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => setSelectedChannel("1")}
        >
          # genel
        </div>
        <div 
          className={`p-2 rounded cursor-pointer ${selectedChannel === "2" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => setSelectedChannel("2")}
        >
          # yardım
        </div>
      </div>
    </div>
  );
};

