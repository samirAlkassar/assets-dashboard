"use client";

import { ChartColumnBig, ChevronDown, Filter, Search } from "lucide-react";
import assets from "../database/assets.json"
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { twMerge } from "tailwind-merge";
import Header from "@/components/layout/header";
import AssetsCard from "@/components/AssetsCard";
import StatusCard from "@/components/StatusCard";

const StockTypes = [
  {id: 1, name: "All Types"},
  {id: 2, name: "Stock"},
  {id: 3, name: "Crypto"},
  {id: 4, name: "ETF"},
  {id: 5, name: "Commodity"},
  {id: 6, name: "Stablecoin"},
];

const SortByList = [
  {id: 1, name: "All"},
  {id: 2, name: "Top Gainers"},
  {id: 3, name: "Top Losers"},
];

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("All");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState("");

  const [toggleType, setToggleTypes] = useState(false);
  const [toggleSort, setToggleSort] = useState(false);

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
      <div className="mx-auto pt-2 pb-6 px-4">
        <Header />

        <div className="mt-10 flex flex-col md:flex-row items-start justify-center gap-2">
          <div className="flex w-full border-gray-100/20 border-1 focus:ring-white focus:ring-1 rounded-md bg-[#0A0A0A]">
            <span className="text-white/30 w-[42px] h-[42px] flex items-center justify-center"><Search /></span>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
              placeholder="Search Assets..."
              className="w-full p-2 rounded-lg outline-none text-sm"/>
          </div>
          
          <div className="flex items-start gap-2 flex-wrap md:flex-nowrap">
              <div className="relative">
                <button onClick={()=>setToggleTypes((prev)=>!prev)} className="min-w-32 bg-[#0A0A0A] px-4 py-3 rounded-md flex items-center justify-between gap-1 cursor-pointer border-1 border-white/10">
                  <p className="text-sm">{type}</p>
                  <ChevronDown size={20}/>
                </button>
                {toggleType &&
                <div className="bg-[#0A0A0A] rounded-md flex flex-col absolute mt-1 w-full border-1 border-white/10">
                  {StockTypes.map((typeSelect)=>(
                    <button 
                      onClick={()=>{setType(typeSelect.name); setToggleTypes(false)}} 
                      key={typeSelect.id} 
                      className={twMerge("text-sm px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer", type === typeSelect.name ? "bg-white/10" : "bg-[#0A0A0A]")}>
                        {typeSelect.name}
                    </button>
                  ))}
                </div>
                }
              </div>


              <div className="relative">
                <button onClick={()=>setToggleSort((prev)=>!prev)} className="min-w-34 bg-[#0A0A0A] px-4 py-3 rounded-md flex items-center justify-between gap-1 cursor-pointer border-1 border-white/10">
                  <p className="text-sm">{sort}</p>
                  <ChevronDown size={20}/>
                </button>
                {toggleSort &&
                <div className="bg-[#0A0A0A] rounded-md flex flex-col absolute mt-1 w-full border-1 border-white/10">
                  {SortByList.map((sortBy)=>(
                    <button 
                      onClick={()=>{setSort(sortBy.name); setToggleSort(false)}} 
                      key={sortBy.id} 
                      className={twMerge("text-sm px-4 py-3 rounded-md hover:bg-white/5 cursor-pointer", sort === sortBy.name ? "bg-white/10" : "bg-[#0A0A0A]")}>
                        {sortBy.name}
                    </button>
                  ))}
                </div>
                }
              </div>

              <div className="flex gap-1">
                <input 
                  min={0} 
                  value={min} 
                  onChange={(e)=>setMin(e.target.value)} 
                  type="number" 
                  placeholder="Min $" 
                  className="w-20 px-4 py-3 bg-[#0A0A0A] text-white/80 rounded-md text-sm outline-none border-1 border-white/10"/>
                <input 
                  min={0} 
                  value={max} 
                  onChange={(e)=>setMax(e.target.value)} 
                  type="number" 
                  placeholder="Max $" 
                  className="w-20 bg-[#0A0A0A] text-white/80 px-4 py-3 rounded-md text-sm outline-none border-1 border-white/10"/>
              </div>
          
          </div>
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



