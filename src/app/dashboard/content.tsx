"use client"

// Essentials
import { NextPage } from "next";

const CONTENT: NextPage = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
                    <span className="text-gray-500">Users</span>
                    <span className="text-2xl font-bold mt-2">1,245</span>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
                    <span className="text-gray-500">Sales</span>
                    <span className="text-2xl font-bold mt-2">$23,400</span>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
                    <span className="text-gray-500">Revenue</span>
                    <span className="text-2xl font-bold mt-2">$8,900</span>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
                    <span className="text-gray-500">Performance</span>
                    <span className="text-2xl font-bold mt-2">98%</span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-gray-500">User</th>
                                <th className="py-2 px-4 text-gray-500">Action</th>
                                <th className="py-2 px-4 text-gray-500">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2 px-4">John Doe</td>
                                <td className="py-2 px-4">Created an account</td>
                                <td className="py-2 px-4">2024-06-01</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Jane Smith</td>
                                <td className="py-2 px-4">Purchased a plan</td>
                                <td className="py-2 px-4">2024-06-02</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">Alice Brown</td>
                                <td className="py-2 px-4">Upgraded subscription</td>
                                <td className="py-2 px-4">2024-06-03</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CONTENT;