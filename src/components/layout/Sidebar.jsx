import { ChartAreaIcon, ChartColumn, Home, Settings, Vault } from "lucide-react";

const Sidebar = () => {
    return (
    <aside className="w-fit md:w-72 h-screen bg-zinc-950 border-r border-zinc-800 p-2 md:p-6">
    <div className="flex items-center justify-start gap-2">
        <div className="bg-white p-4 md:p-2 rounded-md text-gray-800">
            <ChartColumn size={18}/>
        </div>
        <div className="hidden md:block">
            <h1 className="text-xl font-semibold">Assets Dashboard</h1>
            <p className="text-sm font-medium text-white/80">Real-Time Assets Dashboard</p>
        </div>
    </div>
    <nav className="flex flex-col gap-1 text-md text-zinc-300 mt-4 md:mt-6">
        <a className="hover:text-white transition p-4 md:p-2 rounded-md hover:bg-white/10 cursor-pointer flex items-center justify-center md:justify-start gap-2"><Home className="scale-140 md:scale-100" size={16}/> <p className="hidden md:block">Home</p></a>
        <a className="hover:text-white transition p-4 md:p-2 rounded-md hover:bg-white/10 cursor-pointer flex items-center justify-center md:justify-start gap-2"><Vault className="scale-140 md:scale-100" size={16}/> <p className="hidden md:block">Assets</p></a>
        <a className="hover:text-white transition p-4 md:p-2 rounded-md hover:bg-white/10 cursor-pointer flex items-center justify-center md:justify-start gap-2"><ChartAreaIcon className="scale-140 md:scale-100" size={16}/> <p className="hidden md:block">Analytics</p></a>
        <a className="hover:text-white transition p-4 md:p-2 rounded-md hover:bg-white/10 cursor-pointer flex items-center justify-center md:justify-start gap-2"><Settings className="scale-140 md:scale-100" size={16}/> <p className="hidden md:block">Settings</p></a>
    </nav>
    </aside>
    )
}

export default Sidebar;