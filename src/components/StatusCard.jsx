const StatusCard = ({title, data}) => {
  return (
    <div className="bg-white/20 rounded-md p-4 border-1 border-gray-100/10">
      <h3 className="text-white/80 text-sm">{title}</h3>
      <p className="text-sm sm:text-base md:text-2xl font-semibold mt-1">{data}</p>
    </div>
  ) 
}

export default StatusCard;