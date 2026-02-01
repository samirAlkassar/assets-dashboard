import { ChartColumnBig } from "lucide-react";

const Header = () => {
    return (
        <div className="flex justify-between items-start">
          <div className="flex items-start md:items-center justify-start gap-2">
            <div className="bg-white p-3 rounded-md text-gray-800">
              <ChartColumnBig size={24}/>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold">Assets Dashboard</h1>
              <p className="text-sm md:text-base font-medium text-white/80">Real-Time Assets Dashboard</p>
            </div>
          </div>
          <span className="bg-green-300/40 px-4 py-1 rounded-full flex items-center justify-center gap-2">
            <p className="text-xs md:text-sm">Live</p>
            <span className="block w-3 h-3 bg-green-400 rounded-full"/>
          </span>
        </div>
    )
};

export default Header;