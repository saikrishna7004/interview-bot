import Image from 'next/image';
import Link from 'next/link';

const ArticlePage = async ({ params }) => {

    return (
        <div className="container mx-auto lg:my-8 my-4 flex flex-col lg:flex-row items-start justify-start text-black px-3 pb-4">
            <div className="lg:mb-8 mb-3 bg-white p-6 lg:px-12 lg:py-8 rounded shadow-md mr-4 w-full">
                <div className='text-center'>
                    <h1 className="lg:text-4xl text-2xl font-bold lg:mb-6 mb-4 text-black">404 - Page Not Found</h1>
                    <Image
                        src="/404.jpg"
                        alt="Page Not Found"
                        width={300}
                        height={200}
                        className="object-cover mx-auto"
                    />
                    <p className="text-gray-800 mb-4 mt-6 lg:text-lg md:text-md text-sm">Sorry, the page you&apos;re looking for does not exist.</p>
                    <Link href="/" className="mt-6 text-blue-500">Go back to home</Link>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
