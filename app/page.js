import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="text-center py-12 bg-gradient-to-b from-blue-100 via-gray-50 to-gray-50">
                <h1 className="text-7xl font-bold bg-clip-text text-green-700 my-4 drop-shadow-lg">
                    <span className="bg-gradient-to-r from-blue-600 via-green-500 to-teal-700 bg-clip-text text-transparent">
                        MockMate
                    </span>
                </h1>
                <p className="text-2xl text-gray-800 mb-4 font-medium">
                    An Interactive Interview Coach
                </p>
                <p className="text-xl text-blue-800">
                    Simulate interviews, practice responses, and receive
                    feedback.
                </p>
                <Link href="/interview">
                    <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition">
                        Start Now
                    </button>
                </Link>
            </div>

            <div className="container mx-auto px-4 mt-16">
                <h2 className="text-4xl font-bold text-gray-700 text-center mb-8">
                    Why MockMate?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <Image
                            src="https://cdn-icons-png.flaticon.com/512/4658/4658943.png"
                            alt="Personalized Feedback"
                            width={150}
                            height={150}
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Personalized Feedback
                        </h3>
                        <p className="text-gray-600">
                            Get tailored insights on your interview performance.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <Image
                            src="https://png.pngtree.com/png-clipart/20230811/original/pngtree-film-scenario-icon-color-flat-picture-image_7864226.png"
                            alt="Realistic Scenarios"
                            width={150}
                            height={150}
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Realistic Scenarios
                        </h3>
                        <p className="text-gray-600">
                            Simulate real-world interview settings with ease.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <Image
                            src="https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-analytics-line-icon-vector-png-image_6703463.png"
                            alt="Comprehensive Analytics"
                            width={150}
                            height={150}
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Comprehensive Analytics
                        </h3>
                        <p className="text-gray-600">
                            Track your progress and improvement over time.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 bg-blue-50 py-8 rounded-lg">
                <h2 className="text-4xl font-bold text-gray-700 text-center mb-8">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <p className="italic text-gray-600">
                            &quot;MockMate helped me ace my interviews with confidence!&quot;
                        </p>
                        <p className="font-bold text-gray-800 mt-4">
                            – Sai Krishna.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <p className="italic text-gray-600">
                            &quot;The feedback was so detailed and on point. Loved it!&quot;
                        </p>
                        <p className="font-bold text-gray-800 mt-4">
                            – Tharun.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <p className="italic text-gray-600">
                            &quot;MockMate made my preparation easy and effective!&quot;
                        </p>
                        <p className="font-bold text-gray-800 mt-4">
                            – Sumanth.
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center py-12 bg-gradient-to-t from-blue-100 to-gray-50 mt-16">
                <h2 className="text-3xl font-bold text-gray-800">
                    Ready to Excel in Your Career?
                </h2>
                <p className="text-xl text-gray-600 mt-2">
                    Join MockMate and start your journey today.
                </p>
                <Link href="/signup">
					<button className="mt-6 bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600 transition">
						Sign Up Now
					</button>
				</Link>
			</div>

			<footer className="mt-16 py-6 bg-gray-100 text-center">
				<p className="text-gray-500">
					© 2024 MockMate. All Rights Reserved.
				</p>
				<Link href="/about" className="text-blue-500 hover:underline">
					Learn More About Us
				</Link>
			</footer>
		</div>
	);
}
