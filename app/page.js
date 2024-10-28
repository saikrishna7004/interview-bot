import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen py-8">
            <div className="text-center mb-16">
                <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-teal-400 bg-clip-text text-transparent my-4 drop-shadow-lg">
                    KMIT Gemini
                </h1>
                <p className="text-2xl text-gray-800 mb-4 font-medium">
                    Prepare for Your Career
                </p>
                <p className="text-xl text-blue-800">
                    Simulate interviews, practice responses, and receive feedback.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="w-[500px] mx-auto">
                    <div className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                        <Image className='my-3' src={'https://happsales.com/wp-content/uploads/2023/09/Contact-Intelligences-300x300.png.webp'} width={300} height={300} />
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
        </div>
    );
}
