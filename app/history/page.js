"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MockInterviewHistory() {
    const [mockInterviews, setMockInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/history?username=${session?.user?.username || 'guest'}`);
                const data = await response.json();
                setMockInterviews(data);
            } catch (error) {
                console.error('Error fetching mock interviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [session]);

    if (status === 'loading') {
        return <div>Loading session...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Mock Interview History</h1>
            {loading ? (
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            ) : mockInterviews.length === 0 ? (
                <div className="text-center text-gray-500 mt-6">History is empty</div>
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
                                <td className="py-3 px-5">{new Date(interview.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}</td>
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
