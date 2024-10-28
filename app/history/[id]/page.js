"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
                <div>Error: {error}</div>
            ) : !interview ? (
                <div>No interview found.</div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Interview Details</h1>
                    <Link className="flex items-center mb-4" href='/history'><FaArrowLeft />&nbsp;Back</Link>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Topic: {interview.topic}</h2>
                        <p className="text-gray-600">Date: {new Date(interview.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Job Description:</h3>
                        <p>{interview.jobDescription}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Feedback:</h3>
                        {interview.feedback.map((fb, index) => (
                            <div key={index}>
                                <p><strong>Question:</strong> {fb.question}</p>
                                <p><strong>Feedback:</strong> {fb.feedback}</p>
                                <p><strong>Score:</strong> {fb.score}</p>
                            </div>
                        ))}
                        <p><strong>Overall Feedback:</strong> {interview.feedback.find(f => f.overall)?.feedback}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Conversation:</h3>
                        {interview.conversation.map((conv, index) => {
                            if (index == 0) return;
                            return conv.parts.map((part, partIndex) => (
                                <p key={`${index}-${partIndex}`} className="mb-2">
                                    <b style={{ textTransform: 'capitalize' }}>{conv.role}: </b>&nbsp;{getFilteredConversation(part.text)}
                                </p>
                            ))
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
