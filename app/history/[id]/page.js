"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function InterviewDetails({ params }) {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFilteredConversation = (conversation) => {
        if (!conversation.startsWith("User Said")) return conversation;
        return conversation.slice(12, -30);
    };

    useEffect(() => {
        if (params.id) {
            const fetchInterview = async () => {
                try {
                    const response = await fetch(`/api/history/${params.id}`);
                    if (!response.ok) throw new Error('Failed to fetch interview');
                    const data = await response.json();
                    console.log(data);
                    setInterview(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchInterview();
        }
    }, [params.id]);

    return (
        <div className="container mx-auto p-6">
            {loading ? (
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            ) : error ? (
                <div className="bg-red-100 text-red-800 p-4 rounded-md">{`Error: ${error}`}</div>
            ) : !interview ? (
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">No interview found.</div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-6">Interview Details</h1>
                    <Link className="flex items-center mb-4 text-blue-600 hover:underline" href='/history'>
                        <FaArrowLeft className="mr-2" /> Back
                    </Link>
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Topic: {interview.topic}</h2>
                        <p className="text-gray-600">Date: {new Date(interview.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold mb-2">Job Description:</h3>
                        <p className="text-gray-700">{interview.jobDescription}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold mb-2">Feedback:</h3>
                        {interview.feedback.filter(fb => !fb.overall).map((fb, index) => (
                            <div key={index} className="border-b border-gray-300 py-6 last:border-b-0">
                                <p className="font-medium text-green-700"><strong>Question:</strong> {fb.question}</p>
                                <p className="text-gray-700"><strong>Feedback:</strong> {fb.feedback}</p>
                                <p className="text-blue-500"><strong>Score:</strong> {fb.score}</p>
                            </div>
                        ))}
                        {interview.feedback.find(f => f.overall) && (
                            <p className="mt-4">
                                <strong>Overall Feedback:</strong> {interview.feedback.find(f => f.overall)?.feedback} <br />
                                <strong>Score:</strong> {interview.feedback.find(f => f.overall)?.score}
                            </p>
                        )}
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold mb-6">Conversation:</h3>
                        {interview.conversation.map((conv, index) => {
                            if (index === 0) return null;
                            return conv.parts.map((part, partIndex) => (
                                <p key={`${index}-${partIndex}`} className="mb-4">
                                    <strong className="capitalize">{conv.role}:</strong> {getFilteredConversation(part.text)}
                                </p>
                            ));
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
