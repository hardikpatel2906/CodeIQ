import { useEffect, useState } from "react";

const StreakDashboard = () => {
  const [streakData, setStreakData] = useState<boolean[]>(Array(365).fill(false));

//   useEffect(() => {
//     fetch("/api/streak-history")
//       .then((res) => res.json())
//       .then((data) => setStreakData(data))
//       .catch(console.error);
//   }, []);
  const columns = Math.ceil(streakData.length / 7);
  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-semibold mb-2">🔥 Yearly Streak Activity</h2>
      <div className={`grid grid-rows-7 gap-1`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {streakData.map((active, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-sm transition-all duration-300 ${
              active ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StreakDashboard;
