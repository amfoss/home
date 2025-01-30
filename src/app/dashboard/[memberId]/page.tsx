"use client";
import { getGithubUsername } from '@/services/temp-github-username-map';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import { ArrowLeft, Github, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useState } from 'react';
import { useMember } from '@/context/MemberContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const mockData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
    attendance: [5, 6, 4, 7, 5, 6, 7, 5, 6, 7],
    statusUpdates: [4, 5, 4, 6, 5, 5, 7, 4, 5, 6]
};

const mockSpecializations = ['special 1', 'special 2', 'special 3'];

const mockActiveProjects = [
    'project 1',
    'project 2',
    'project 3',
    'project 4',
    'project 5',
    'project 6'
];

export default function MemberDetails() {
    const { selectedMember } = useMember();
    const [imgSrc, setImgSrc] = useState(`https://avatars.githubusercontent.com/u/${getGithubUsername(Number(selectedMember?.id))}`);
    const [retryCount, setRetryCount] = useState(0);

    const handleImageError = () => {
        if (retryCount < 2) {
            setRetryCount(prev => prev + 1);
            setImgSrc(`https://github.com/${getGithubUsername(Number(selectedMember?.id))}.png?retry=${retryCount}`);
        } else {
            setImgSrc('/avatarplaceholder.png');
        }
    };

    if (!selectedMember) return <div>Loading...</div>;

    const constancyData = {
        labels: mockData.labels,
        datasets: [
            {
                label: 'Status Updates',
                data: mockData.statusUpdates,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'Attendance',
                data: mockData.attendance,
                borderColor: '#E5AC00',
                tension: 0.4,
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 7,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    stepSize: 1,
                    callback: function (tickValue: number | string) {
                        return Number(tickValue).toFixed(0);
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    maxRotation: 0,
                    font: {
                        size: 10
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="h-screen bg-bgMainColor overflow-hidden">
            <Link href="/dashboard" className='flex border-b border-gray-700/50 p-3 items-center gap-2'>
                <ArrowLeft className='w-5 h-5 text-offWhite/70' />
                <span className='text-offWhite/70 text-sm md:text-base'>Members / {selectedMember.name}</span>
            </Link>

            <div className='flex flex-col lg:flex-row gap-3 p-3 h-[calc(100vh-48px)] overflow-y-auto'>
                {/* Left Column */}
                <div className='w-full lg:w-4/12 bg-panelButtonColor/50 rounded-lg p-3 md:p-5 h-auto min-h-fit lg:h-full '>
                    <div className='flex items-start gap-3'>
                        <div className='flex gap-1'>
                            <Image
                                src={imgSrc}
                                alt={selectedMember.name}
                                width={60}
                                height={60}
                                className='rounded md:w-[80px] md:h-[80px]'
                                priority
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYwRjlHSUhJZUZWXV1kaGSJRUn/2wBDAR"
                                onError={handleImageError}
                            />
                        </div>
                        <div className='flex flex-col flex-1 min-w-0'>
                            <span className='text-offWhite text-base md:text-lg truncate'>{selectedMember.name}</span>
                            <span className='text-xs text-gray-500'>{selectedMember.year} year</span>
                            <div className='mt-1 bg-white/10 rounded-full p-1 w-fit'>
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-offWhite/70 fill-current">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='hidden md:flex flex-col items-end'>
                            <span className='text-primaryYellow text-base tracking-wider [writing-mode:vertical-lr] rotate-180'>
                                GROUP {selectedMember.groupId}
                            </span>
                        </div>
                    </div>

                    <div className='mt-4 md:mt-6 border-t border-gray-700/50 pt-4'>
                        <div className='flex items-center gap-2 text-offWhite/70 text-sm mb-2'>
                            <span className='text-[0.7rem]'>⚡</span>
                            <span>Specialization</span>
                        </div>
                        <div className='flex flex-wrap gap-2 text-xs'>
                            {mockSpecializations.map((spec, index) => (
                                <span key={index} className='px-3 py-1 bg-bgMainColor/50 rounded-sm text-offWhite/70'>{spec}</span>
                            ))}
                        </div>
                    </div>

                    <div className='mt-4 border-t border-gray-700/50 pt-4'>
                        <div className='flex items-center gap-2 text-offWhite/70 text-sm mb-2'>
                            <span className='text-[0.7rem]'>📁</span>
                            <span>Active projects</span>
                        </div>
                        <div className='space-y-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pr-2'>
                            {mockActiveProjects.map((project, index) => (
                                <div key={index} className='px-3 py-1 bg-bgMainColor/50 rounded-sm text-offWhite/70 text-xs'>{project}</div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-4 border-t border-gray-700/50 pt-4'>
                        <div className='flex items-center gap-2 text-offWhite/70 text-sm mb-2'>
                            <span className='text-[0.7rem]'>👤</span>
                            <span>Personal info</span>
                        </div>
                        <div className='space-y-1 text-xs'>
                            <div className='flex justify-between'>
                                <span className='text-gray-500'>Hostel</span>
                                <span className='text-offWhite/70 truncate ml-2'>{selectedMember.hostel}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-500'>Email</span>
                                <span className='text-offWhite/70 truncate ml-2'>{selectedMember.email}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-500'>Discord ID</span>
                                <span className='text-offWhite/70 truncate ml-2'>{selectedMember.discordId}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className='w-full lg:w-8/12 flex flex-col gap-3 h-auto lg:h-full'>
                    <div className='bg-panelButtonColor/50 rounded-lg p-3 md:p-5 h-[300px] lg:h-[45%]'>
                        <h3 className='text-offWhite/70 text-sm mb-3'>Constancy graph</h3>
                        <div className='h-[calc(100%-2rem)]'>
                            <Line data={constancyData} options={options} />
                        </div>
                    </div>

                    <div className='bg-panelButtonColor/50 rounded-lg p-3 md:p-5 h-[300px] lg:h-[55%]'>
                        <h3 className='text-offWhite/70 text-sm mb-3'>Github Activity</h3>
                        <div className='h-[calc(100%-2rem)]  overflow-hidden'>
                            <GitHubCalendar
                                username={getGithubUsername(Number(selectedMember?.id))}
                                colorScheme='dark'
                                fontSize={12}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
