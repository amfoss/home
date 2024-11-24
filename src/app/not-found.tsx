import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-2xl text-center">
                <div className="bg-cover bg-center h-64" style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}>
                    <h1 className="text-8xl font-bold text-gray-800">404</h1>
                </div>
                <div className="mt-8">
                    <h3 className="text-4xl font-semibold mb-4">Looks like you&apos;re lost</h3>
                    <p className="text-lg mb-6">The page you are looking for is not available!</p>
                    <Link href="/" className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
                        Go to Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
