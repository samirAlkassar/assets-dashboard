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
export default AssetsCard;