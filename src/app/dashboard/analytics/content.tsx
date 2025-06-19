"use client"

// Essentials
import { NextPage } from "next";

const dummyAnalytics = [
    {
        title: "Total Users",
        value: 1245,
        change: "+5.2%",
        description: "Compared to last week",
    },
    {
        title: "Active Sessions",
        value: 312,
        change: "-2.1%",
        description: "Currently online",
    },
    {
        title: "New Signups",
        value: 87,
        change: "+12.4%",
        description: "In the past 7 days",
    },
    {
        title: "Revenue",
        value: "$4,320",
        change: "+8.7%",
        description: "This month",
    },
];

const CONTENT: NextPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-10 text-center text-gray-900 tracking-tight drop-shadow-sm">Analytics</h1>
            <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
                Only roles with <span className="font-semibold">"read:analytics"</span> permission (Admin) can access this page.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {dummyAnalytics.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:bg-white/90 cursor-pointer relative overflow-hidden"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                {stat.title}
                            </h2>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-gray-900">
                                    {stat.value}
                                </span>
                                <span className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-gray-500 mt-2 text-sm">
                                {stat.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white/70 rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Traffic Overview</h2>
                <div className="w-full h-40 flex items-center justify-center text-gray-400">
                    <span className="italic">[Analytics Chart Placeholder]</span>
                </div>
            </div>
        </div>
    );
};

export default CONTENT;