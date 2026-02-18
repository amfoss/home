import React from "react";

export const LoadingProfileSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col text-white p-8 gap-8 justify-between">
            <div>
                <div className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
                    <div className="h-8 bg-gray-700 rounded w-32 shimmer"></div>
                    <div className="h-10 bg-gray-700 rounded w-32 shimmer"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="bg-panelColor rounded-lg shadow-lg p-6 lg:w-1/3 w-full">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-gray-700 rounded-full shimmer mb-4"></div>
                            <div className="h-6 bg-gray-700 rounded w-40 shimmer mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-24 shimmer mb-4"></div>
                        </div>
                        <div className="space-y-3 mt-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex justify-between">
                                    <div className="h-4 bg-gray-700 rounded w-20 shimmer"></div>
                                    <div className="h-4 bg-gray-700 rounded w-32 shimmer"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-panelColor rounded-lg shadow-lg p-6 lg:w-2/3 w-full">
                        <div className="h-6 bg-gray-700 rounded w-40 shimmer mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center justify-between p-3 bg-panelButtonColor rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-6 bg-gray-700 rounded shimmer"></div>
                                        <div className="h-5 bg-gray-700 rounded w-32 shimmer"></div>
                                    </div>
                                    <div className="h-5 bg-gray-700 rounded w-16 shimmer"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-panelColor rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 bg-gray-700 rounded w-32 shimmer"></div>
                    <div className="flex gap-2">
                        <div className="h-8 w-8 bg-gray-700 rounded shimmer"></div>
                        <div className="h-8 w-8 bg-gray-700 rounded shimmer"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-panelButtonColor p-4 rounded-lg">
                            <div className="h-4 bg-gray-700 rounded w-28 mb-2 shimmer"></div>
                            <div className="h-8 bg-gray-700 rounded w-16 shimmer"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex gap-8 lg:flex-row flex-col">
                {[1, 2].map((grid) => (
                    <div key={grid} className="bg-panelColor rounded-lg shadow-lg p-6 flex-1">
                        <div className="h-6 bg-gray-700 rounded w-24 shimmer mb-4"></div>
                        <div className="grid grid-cols-12 gap-1">
                            {[...Array(84)].map((_, index) => (
                                <div key={index} className="h-6 w-6 bg-gray-700 rounded shimmer"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
