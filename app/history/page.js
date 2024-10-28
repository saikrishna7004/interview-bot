"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MockInterviewHistory() {
    const [mockInterviews, setMockInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/history');
            const data = await response.json();
            setMockInterviews(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Mock Interview History</h1>
            {loading ? (
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-3 px-5 bg-gray-100 text-left">Date</th>
                            <th className="py-3 px-5 bg-gray-100 text-left">Topic</th>
                            <th className="py-3 px-5 bg-gray-100 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockInterviews.map((interview) => (
                            <tr key={interview._id} className="border-b">
                                <td className="py-3 px-5">{new Date(interview.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{interview.topic}</td>
                                <td className="py-3 px-5">
                                    <Link href={`/history/${interview._id}`} className="text-blue-600 hover:underline">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
