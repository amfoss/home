"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Github, UserRound } from 'lucide-react';

export type ProfileCardProps = {
    name: string;
    githubUser: string | null;
    createdAt: string;
    track: string | null;
    hostel: string;
    email: string;
    discordId: string | null;
    loading?: boolean;
};

export const ProfileCard = ({
    name,
    githubUser,
    createdAt,
    track,
    hostel,
    email,
    discordId,
    loading = false
}: ProfileCardProps) => {
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    if (loading) {
        return (
            <div className="flex flex-1 flex-col justify-between gap-6">
                <div className="bg-[#1a1a1a] rounded-lg p-6 flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-gray-600 border-t-[#EBB500] rounded-full animate-spin"></div>
                        <div className="text-gray-500 text-center">Loading profile...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col justify-between gap-6">
            <div className="flex items-center flex-wrap gap-6">
                <div className="relative w-[120px] h-[120px]">
                    {imageLoading && (
                        <div className="absolute inset-0 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-gray-600 border-t-[#EBB500] rounded-full animate-spin"></div>
                        </div>
                    )}
                    <Image
                        src={githubUser ? `https://github.com/${githubUser}.png` : '/placeholder.webp'}
                        alt={name}
                        width={120}
                        height={120}
                        className="rounded-lg"
                        onLoad={() => setImageLoading(false)}
                    />
                </div>
                <div className="flex flex-1">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-1">{name}</h2>
                        <p className="text-gray-400 text-sm mb-3">
                            {new Date(createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            }).replace(/\//g, '.')}
                        </p>
                        {githubUser && (
                            <a
                                href={`https://github.com/${githubUser}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2a2a2a] transition-colors p-2 rounded-lg w-fit'
                            >
                                <Github className="w-6 h-6" />
                                <span>{githubUser}</span>
                            </a>
                        )}
                    </div>
                    {track && (
                        <div className="text-2xl font-semibold tracking-widest text-[#EBB500]"
                            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                            {track}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <UserRound />
                    <h3 className="text-lg font-semibold">Personal info</h3>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between flex-wrap gap-2">
                        <span className="text-gray-400">Hostel</span>
                        <span className="text-white">{hostel}</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-2">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">{email}</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-2">
                        <span className="text-gray-400">Discord ID</span>
                        <span className="text-white">{discordId || 'Not set'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
