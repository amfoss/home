import { Suspense } from 'react';
import { ProfileClient } from './profile-client';
import { LoadingProfileSkeleton } from './loading-skeleton';

export default async function ProfilePage({ 
  searchParams 
}: { 
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<LoadingProfileSkeleton />}>
      <ProfileClient searchParams={params} />
    </Suspense>
  );
}
