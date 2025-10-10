'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ViewProfileComponent from './components/ViewProfileComponent';
import EditProfileComponent from './components/EditProfileComponent';
import { LoadingProfileSkeleton } from './loading-skeleton';

export const ProfileClient = ({
  searchParams,
}: {
  searchParams: { mode?: string }
}) => {
  const router = useRouter();
  const mode = searchParams?.mode;
  
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
    return <LoadingProfileSkeleton />;
  }
  
  return (
    <>
      {currentView === 'view' ? (
        <ViewProfileComponent onEdit={() => handleChangeView('edit')} />
      ) : (
        <EditProfileComponent onCancel={() => handleChangeView('view')} />
      )}
    </>
  );
}