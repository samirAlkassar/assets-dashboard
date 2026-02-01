"use client";

import { ChartColumnBig, Filter, Search } from "lucide-react";
import assets from "../database/assets.json"
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("All");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState("");

  const query = useDebounce(inputValue, 600);
  const filteredAssets = assets.filter((asset)=> {
    const matchesSearch = asset.name.toLowerCase().includes(query) ||
    asset.symbol.toLowerCase().includes(query);

    const matchesType = type === "All Types" || asset.type === type;

    const matchesMin = asset.price >= (min || 0);
    const matchesMax = max ? asset.price <= Number(max) : true;

    let matchesSort = true;
    if (sort === "gainers") matchesSort = asset.change24h > 0;
    else if (sort === "losers") matchesSort = asset.change24h < 0;

    return matchesSearch && matchesType && matchesMin && matchesMax && matchesSort;
  });

  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalVolume24h = assets.reduce((sum, asset) => sum + Math.abs(asset.change24h * asset.value) / 100, 0); // mock volume as % of value
  const gainers = assets.filter((asset) => asset.change24h > 0)
  const losers = assets.filter((asset) => asset.change24h < 0)



  return (
    <main className="bg-black h-screen w-full">
      <div className="max-w-[90rem] mx-auto py-4 px-4">
        <div className="flex items-center justify-start gap-2">
          <div className="bg-white p-3 rounded-md text-gray-800">
            <ChartColumnBig size={24}/>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Assets Dashboard</h1>
            <p className="text-base font-medium text-white/80">Real-Time Assets Dashboard</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex w-full border-gray-100/20 border-1 focus:ring-white focus:ring-1 rounded-md bg-[#0A0A0A]">
            <span className="text-white/30 w-[42px] h-[42px] flex items-center justify-center"><Search /></span>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
              placeholder="Search Assets..."
              className="w-full p-2 rounded-lg outline-none text-sm"/>
          </div>
          <button className="bg-[#0A0A0A] rounded-md h-[42px] w-[42px] flex items-center justify-center border-1 border-gray-100/20 cursor-pointer">
            <Filter size={20}/>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-4">
            <select value={type} onChange={(e)=>setType(e.target.value)} name="assetType" id="assetType" className="bg-white text-gray-800 px-3 py-1.5 rounded-md text-sm">
              <option value="All Types">All Types</option>
              <option value="Stock">Stock</option>
              <option value="Crypto">Crypto</option>
              <option value="ETF">ETF</option>
              <option value="Commodity">Commodity</option>
              <option value="Stablecoin">Stablecoin</option>
            </select>

            <select value={sort} onChange={(e)=>setSort(e.target.value)} name="movers" id="movers" className="bg-white text-gray-800 px-3 py-1.5 rounded-md text-sm">
              <option value="all">All</option>
              <option value="gainers">Top Gainers</option>
              <option value="losers">Top Losers</option>
            </select>

            <div className="flex gap-1">
              <input min={0} value={min} onChange={(e)=>setMin(e.target.value)} type="number" placeholder="Min $" className="w-20 bg-white text-gray-800 px-2 py-1.5 rounded-md text-sm"/>
              <input min={0} value={max} onChange={(e)=>setMax(e.target.value)} type="number" placeholder="Max $" className="w-20 bg-white text-gray-800 px-2 py-1.5 rounded-md text-sm"/>
            </div>
          </div>
          <button className="bg-white/90 text-gray-800 px-3 py-1.5 rounded-md cursor-pointer hover:bg-white transition-colors duration-200">
            Apply Filters
          </button>
        </div>
        


        <div className="mt-6">
          <h2 className="text-white/80 text-sm">Quick Status</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-2">
            <StatusCard title={"Total Market Cap"} data={totalMarketCap.toLocaleString()}/>
            <StatusCard title={"24h Volume"} data={totalVolume24h.toLocaleString()}/>
            <StatusCard title={"Total Gainers"} data={`${gainers.length} /${assets.length}`}/>
            <StatusCard title={"Total Losers"} data={`${losers.length} /${assets.length}`}/>
          </div>
        </div>


        <div className="mt-4">
          <h2 className="text-white/80 text-sm">Assets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 gap-y-4 rounded-md mt-2">
            {filteredAssets.map((asset) => (
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
