"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ViewProfile from './view';
import EditProfile from './edit';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode');
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'view' | 'edit'>('view');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      if (mode === 'edit') {
        setCurrentView('edit');
      } else {
        setCurrentView('view');
      }
      
      return () => clearTimeout(timer);
    }
  }, [mode]);
  

  const handleChangeView = (view: 'view' | 'edit') => {
    router.push(`/profile${view === 'edit' ? '?mode=edit' : ''}`);
    setCurrentView(view);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-white mb-6">User Profile</h1>
          

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex-grow space-y-4">
              <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-panelColor rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-panelButtonColor p-4 rounded-lg">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <>
      {currentView === 'view' ? (
        <ViewProfile />
      ) : (
        <EditProfile />
      )}
    </>
  );
}
