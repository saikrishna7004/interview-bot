"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MockInterviewHistory() {
    const [mockInterviews, setMockInterviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/history');
            const data = await response.json();
            setMockInterviews(data);
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Mock Interview History</h1>
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
        </div>
    );
}
