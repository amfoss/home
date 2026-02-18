import { Suspense } from 'react';
import { LoadingProfileSkeleton } from './loading-skeleton';
import ProfileView from './view';

export default async function ProfilePage({ 
  searchParams 
}: { 
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams;
  const mode = params?.mode;
  
  return (
    <Suspense fallback={<LoadingProfileSkeleton />}>
      <ProfileView mode={mode as string | undefined} />
    </Suspense>
  );
}
