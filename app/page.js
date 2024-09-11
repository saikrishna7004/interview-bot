import Head from 'next/head';
import Link from 'next/link';

function HomePage() {
    return (
        <div>
            <Head>
                <title>Interview Bot - Home</title>
            </Head>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mt-4">
                        <h1 className='my-4'>Welcome to Interview Bot!</h1>
                        <p className='my-4'>Get ready to ace your next interview!</p>
                        <Link href="/interview">
                            <button className="btn btn-primary btn-lg">
                                Get an Interview
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;