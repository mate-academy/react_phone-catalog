export const SkeletonCard = () => {
    return (
      <div className="w-[272px] h-[506px] bg-[#161827] flex p-8 flex-col font-mont animate-pulse">
        <div className="bg-gray-700 h-[196px] w-full rounded mb-6" />

        <div className="h-5 bg-gray-700 rounded mb-2 w-full" />

        <div className="flex gap-2 mb-2">
          <div className="h-6 w-16 bg-gray-700 rounded" />
          <div className="h-6 w-12 bg-gray-700 rounded" />
        </div>
  
        <div className="block w-[208px] h-[1px] bg-gray-700 mt-2 mb-4">&nbsp;</div>
  
        <ul className="text-xs text-gray-400 flex flex-col gap-3 mb-4">
          <li className="flex justify-between">
            <div className="h-3 w-16 bg-gray-700 rounded" />
            <div className="h-3 w-12 bg-gray-700 rounded" />
          </li>
          <li className="flex justify-between">
            <div className="h-3 w-16 bg-gray-700 rounded" />
            <div className="h-3 w-12 bg-gray-700 rounded" />
          </li>
          <li className="flex justify-between">
            <div className="h-3 w-16 bg-gray-700 rounded" />
            <div className="h-3 w-12 bg-gray-700 rounded" />
          </li>
        </ul>
  
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 h-10 bg-gray-700" />
          <div className="w-10 h-10 bg-gray-700" />
        </div>
      </div>
    );
  };
  