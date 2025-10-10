import { Suspense } from 'react';
import { ProfileClient } from './profile-client';
import { LoadingProfileSkeleton } from './loading-skeleton';

export default function ProfilePage({ 
  searchParams 
}: { 
  searchParams: any 
}) {
  return (
    <Suspense fallback={<LoadingProfileSkeleton />}>
      <ProfileClient searchParams={searchParams} />
    </Suspense>
  );
}
