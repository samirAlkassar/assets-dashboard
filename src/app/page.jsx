import { ChartArea, ChartColumnBig, Search } from "lucide-react";
import assets from "../database/assets.json"

export default function Home() {
    // Calculate dashboard stats
  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalVolume24h = assets.reduce((sum, asset) => sum + Math.abs(asset.change24h * asset.value) / 100, 0); // mock volume as % of value
  const gainers = assets
    .filter(asset => asset.change24h > 0)
  const losers = assets
    .filter(asset => asset.change24h < 0)

  return (
    <main className="bg-black h-screen w-full">
      <div className="max-w-[80rem] mx-auto my-4 px-4">
        <h1 className="text-2xl font-medium">The Real-Time Assets Dashboard</h1>
        <div className="mt-4 flex border-white/30 border-1 ring-white/60 focus:ring-1 rounded-md bg-[#0A0A0A]">
          <span className="text-white/30 w-[42px] h-[42px] flex items-center justify-center"><Search /></span>
          <input 
            type="text" 
            placeholder="Search Assets..."
            className="w-full p-2 rounded-lg outline-none text-sm"/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-4">
          <StatusCard title={"Total Market Cap"} data={totalMarketCap.toLocaleString()}/>
          <StatusCard title={"24h Volume"} data={totalVolume24h.toLocaleString()}/>
          <StatusCard title={"Total Gainers"} data={`${gainers.length} /${assets.length}`}/>
          <StatusCard title={"Total Losers"} data={`${losers.length} /${assets.length}`}/>
         </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 gap-y-4 rounded-md mt-4">
            {assets.map((asset) => (
              <AssetsCard key={asset.id} asset={asset}/>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

const StatusCard = ({title, data}) => {
  return (
    <div className="bg-[#0A0A0A] rounded-md p-4 border-1 border-gray-100/10">
      <h3 className="text-white/50 text-sm">{title}</h3>
      <p className="text-sm sm:text-base md:text-xl font-medium mt-1">{data}</p>
    </div>
  ) 
}

const AssetsCard = ({asset}) => {
  return (
    <div className="bg-[#0A0A0A] border-1 border-gray-100/10 rounded-md p-4 shadow-md hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-white">{asset.symbol}</h2>
        <span className="inline-block text-xs px-3 py-0.5 border border-white/80 rounded-full bg-white/70 text-black">
          {asset.type}
        </span>
      </div>

      <p className="text-white/50 mb-3 text-sm md:text-base">{asset.name}</p>

      <div className="flex items-center justify-between mb-1">
        <span className="text-white font-medium text-sm md:text-base">${asset.price?.toFixed(2)}</span>
        <span
          className={`text-xs md:text-sm font-medium ${
            asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
          {asset.change24h >= 0 ? "+" : ""}
          {asset.change24h?.toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center justify-between text-white/50 text-xs md:text-sm">
        <span>Qty: {asset.quantity}</span>
        <span>Total: ${asset.value?.toFixed(2)}</span>
      </div>
    </div>
  )
}
