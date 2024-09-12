import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

function HomePage() {
    return (
        <div className="container-fluid p-0 m-0">
            <Head>
                <title>Interview Bot - Home</title>
            </Head>
            <div className="row justify-content-center m-0 p-0">
                <div className="col-md-6 text-center mt-4">
                    <h1 className='my-4'>Welcome to Interview Bot!</h1>
                    <p className='my-4'>Get ready to ace your next interview!</p>
                    <div className="row justify-content-center m-0 p-0">
                        <div className="col-md-6 text-center my-5">
                            <Image
                                src="https://media.istockphoto.com/id/1421634975/vector/tiny-people-chatting-with-chatbot-application-ai-robot-assistant-online-customer-support.jpg?b=1&s=170667a&w=0&k=20&c=Sjn9FnCBqciNVWyenUQNDPrhu4eY6LeG4m5WCN1pznI="
                                alt="Interview Bot Image"
                                width={700}
                                height={500}
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                    <Link href="/interview">
                        <button className="btn btn-primary btn-lg">
                            Get an Interview
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;