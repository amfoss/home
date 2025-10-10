"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type MemberDetails = {
    id: string;
    name: string;
    email: string;
    joinDate: string;
    role: string;
}

const MemberDetails = () => {
    const { memberId } = useParams(); 
    const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(null);

    useEffect(() => {
        if (memberId) {
            fetch(`/api/member/${memberId}`)
                .then((response) => response.json())
                .then((data) => setMemberDetails(data))
                .catch((error) => console.error('Error fetching member details:', error));
        }
    }, [memberId]);

    if (!memberDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>{memberDetails.name}</h1>

            {/* Render more detailed information as needed */}
        </div>
    );
};

export default MemberDetails;
