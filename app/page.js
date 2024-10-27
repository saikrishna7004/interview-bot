import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-teal-50 py-8">
            <div className="text-center mb-16">
                <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-teal-400 bg-clip-text text-transparent my-4 drop-shadow-lg">
                    Welcome to KMIT Gemini
                </h1>
                <p className="text-2xl text-gray-800 mb-4 font-medium">
                    Prepare for Your Future Career
                </p>
                <p className="text-xl text-blue-800">
                    Simulate interviews, practice responses, and receive feedback.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="w-[500px] mx-auto">
                    <div className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                        <h2 className="text-3xl font-bold text-blue-700 mt-4 transition-colors">
                            Get an Interview
                        </h2>
                        <p className="text-gray-600 mt-2 pb-4">Ready to test your skills? Start your interview now!</p>
                        <Link href="/interview">
                            <button className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600">
                                Get an Interview
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="mt-16 bg-blue-700 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center text-sm mt-6">
                        &copy; 2024 InterviewBot. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
