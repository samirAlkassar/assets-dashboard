import { Search } from "lucide-react";
import assets from "../database/assets.json"

export default function Home() {
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

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 rounded-md mt-4">
            {assets.map((asset) => (
              <div key={asset.id} className="bg-[#0A0A0A] border border-white/10 rounded-md p-4 shadow-md hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{asset.symbol}</h2>
                  <span className="inline-block scale-90 text-sm px-3 py-1 rounded-full bg-white/80 text-black">
                    {asset.type}
                  </span>
                </div>

                <p className="text-white/50 mb-3">{asset.name}</p>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">${asset.price.toFixed(2)}</span>
                  <span
                    className={`text-sm font-medium ${
                      asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {asset.change24h >= 0 ? "+" : ""}
                    {asset.change24h.toFixed(2)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-white/50 text-sm">
                  <span>Qty: {asset.quantity}</span>
                  <span>Total: ${asset.value.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
