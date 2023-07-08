export default function SkeletonDashboard() {
  return (
    <div className="flex flex-col bg-gray-800 rounded-xl w-full px-5 py-5 pb-10">
      <div className="animate-pulse w-full">
        <div className="py-5 px-10">
          <div className="bg-gray-200 h-5 rounded-full w-1/6"></div>
        </div>
        <div className="flex flex-row justify-between px-10 py-5 gap-20">
          {Array(3)
            .fill(1)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-start bg-gray-700 p-7 rounded-lg w-1/3"
              >
                <div className="flex flex-row items-center justify-between w-full mb-6">
                  <div className="bg-gray-200 h-10 rounded-full w-1/6"></div>
                  <div className="bg-gray-200 h-10 rounded-md w-1/6"></div>
                </div>
                <div className="bg-gray-200 h-5 rounded-full w-3/6"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
