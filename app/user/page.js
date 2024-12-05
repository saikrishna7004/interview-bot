'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '@nextui-org/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState({
        preferredTopics: '',
        jobDescription: '',
        resumeText: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/user')
                .then(response => response.json())
                .then(data => setUser(data))
                .catch(err => {
                    setError('Failed to load user data');
                    toast.error('Failed to load user data');
                });
        }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('preferredTopics', user.preferredTopics);
        formData.append('jobDescription', user.jobDescription);
        formData.append('resumeText', user.resumeText);

        fetch('/api/user', {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        })
        .catch(error => {
            toast.error('Failed to update profile.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    if (status === 'unauthenticated') {
        return <div className="text-center text-red-500">Guest user, not logged in</div>;
    }

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Preferred Topics</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="preferredTopics"
                        value={user.preferredTopics}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                ) : (
                    <p>{user.preferredTopics || '-'}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Job Description</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="jobDescription"
                        value={user.jobDescription}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                ) : (
                    <p>{user.jobDescription || '-'}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Resume Text</label>
                {isEditing ? (
                    <textarea
                        name="resumeText"
                        value={user.resumeText}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                ) : (
                    <p>{user.resumeText || '-'}</p>
                )}
            </div>
            {isEditing ? (
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {loading ? <Spinner size="sm" /> : 'Save'}
                </button>
            ) : (
                <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                </button>
            )}
        </div>
    );
}
