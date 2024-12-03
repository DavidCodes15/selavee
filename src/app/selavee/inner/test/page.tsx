"use client";

import { BadgeDollarSign, SendToBack, TicketCheck, UserRoundPlus } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Chart from 'react-apexcharts';
const Page = () => {
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            background: '#21222D', // Background color
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#00C9A7'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 0.7,
                opacityTo: 0.2,
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
                style: { colors: '#A0A0A0' }, // Label color
            },
        },
        yaxis: {
            labels: {
                style: { colors: '#A0A0A0' }, // Label color
            },
        },
        markers: {
            size: 5,
            colors: ['#FF9800'], // Marker color
        },
        tooltip: {
            theme: 'dark',
        },
        grid: {
            borderColor: '#444',
        },
        legend: {
            show: true,
            position: 'top',
            labels: { colors: '#A0A0A0' }, // Legend text color
        },
        colors: ['#00C9A7'], // Line color
    };

    const chartData = [
        {
            name: 'Sold Items',
            data: [120, 200, 150, 320, 400, 500, 300, 400, 450, 350, 300, 250], // Data points
        },
    ];
    const products = [
        {
            id: '01',
            name: 'Necklaces',
            popularity: 90,
            sales: '46%',
            barColor: 'bg-orange-400',
            salesColor: 'bg-orange-600',
        },
        {
            id: '02',
            name: 'Bracelets',
            popularity: 60,
            sales: '17%',
            barColor: 'bg-teal-400',
            salesColor: 'bg-teal-600',
        },
        {
            id: '03',
            name: 'Rings',
            popularity: 70,
            sales: '19%',
            barColor: 'bg-blue-400',
            salesColor: 'bg-blue-600',
        },
        {
            id: '04',
            name: 'Earrings',
            popularity: 50,
            sales: '29%',
            barColor: 'bg-pink-400',
            salesColor: 'bg-pink-600',
        },
    ];

    return (
        <>
            {/** secondary #A0A0A0 */}
            <div className="bg-[#171821] flex min-h-screen">
                <Sidebar />

                <div className="flex-1 p-12 overflow-y-auto text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Today's Sales */}
                        <div className="rounded-xl bg-[#21222D] p-6 flex flex-col h-full">
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex flex-col space-y-4">
                                    <span>Today's Sales</span>
                                    <span className="text-[#A0A0A0]">Sales Summary</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">

                                    <div className="bg-[#171821] rounded-xl p-4 flex flex-col space-y-2">
                                        <BadgeDollarSign color="#FEB95A" className="w-[30px] h-[30px]" />
                                        <div className="flex flex-col space-y-2">
                                            <span>$5k</span>
                                            <span className="text-[#A0A0A0]">Total Sales</span>
                                            <span className="text-[#FEB95A]">+10% from yesterday</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#171821] rounded-xl p-4 flex flex-col space-y-2">
                                        <SendToBack color="#A9DFD8" className="w-[30px] h-[30px]" />
                                        <div className="flex flex-col space-y-2">
                                            <span>$5k</span>
                                            <span className="text-[#A0A0A0]">Total Order</span>
                                            <span className="text-[#A9DFD8]">+8% from yesterday</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#171821] rounded-xl p-4 flex flex-col space-y-2">

                                        <TicketCheck color="#F2C8ED" className="w-[30px] h-[30px]" />
                                        <div className="flex flex-col space-y-2">
                                            <span>$5k</span>
                                            <span className="text-[#A0A0A0]">Product Sold</span>
                                            <span className="text-[#F2C8ED]">+2% from yesterday</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#171821] rounded-xl p-4 flex flex-col space-y-2">
                                        <UserRoundPlus color="#20AEF3" className="w-[30px] h-[30px]" />
                                        <div className="flex flex-col space-y-2">
                                            <span>$5k</span>
                                            <span className="text-[#A0A0A0]">New Customer</span>
                                            <span className="text-[#20AEF3]">+3% from yesterday</span>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        {/* Top Products */}
                        <div className="rounded-xl bg-[#21222D] p-6 flex flex-col h-full">
                            <div className="flex flex-col justify-between space-y-4 h-full">
                                <div className="flex flex-col space-y-4">
                                    <span>Top Products</span>
                                </div>
                                <div className="bg-[#171821] text-white p-6 rounded-lg h-full">
                                    <h2 className="text-xl font-semibold">Top Products</h2>
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-gray-400">
                                                <th className="py-2">#</th>
                                                <th className="py-2">Name</th>
                                                <th className="py-2">Popularity</th>
                                                <th className="py-2">Sales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, index) => (
                                                <tr key={index} className="border-t border-gray-700">
                                                    <td className="py-3">{product.id}</td>
                                                    <td className="py-3">{product.name}</td>
                                                    <td className="py-3">
                                                        <div className="relative w-full h-2 bg-gray-700 rounded-lg overflow-hidden">
                                                            <div
                                                                className={`absolute top-0 left-0 h-full ${product.barColor}`}
                                                                style={{ width: `${product.popularity}%` }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <span
                                                            className={`px-3 py-1 text-sm font-semibold rounded-lg text-white ${product.salesColor}`}
                                                        >
                                                            {product.sales}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                        {/* Top Activity */}
                        <div className="rounded-xl bg-[#21222D] p-6">
                            <h2 className="text-xl font-semibold mb-4">Sold Items</h2>
                            <Chart options={chartOptions} series={chartData} type="line" height={350} />
                        </div>
                        <div className="rounded-xl bg-[#21222D] p-6 space-y-4">
                            <div className="flex flex-col justify-center items-start space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <span>Top Activity</span>
                                    <span className="text-[#A0A0A0]">Customers</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="bg-[#171821] rounded-xl p-4">
                                            <div className="flex flex-col space-y-2">
                                                <img src="/admin/profile-pic.webp" className="rounded-full w-[30px] h-[30px]" />
                                                <span className="text-[#A0A0A0]">johndoe@example.com</span>
                                                <div className="text-white flex flex-col space-y-2">
                                                    <span>Purchased: <span className="font-semibold">3</span></span>
                                                    <span>Liked: <span className="font-semibold">20</span></span>
                                                    <span>Bag: <span className="font-semibold">10</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
