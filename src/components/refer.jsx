import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext'; // Adjust the import path as needed

export default function ReferralSection() {
    const [friendEmail, setFriendEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [invitationSent, setInvitationSent] = useState(false);
    const [referrals, setReferrals] = useState([]);
    const { token, backendUrl, userData } = useContext(AuthContext);

    useEffect(() => {
        const fetchReferrals = async () => {
            if (token && userData?._id) {
                try {
                    const response = await axios.get(
                        "https://beebark-backend-2.vercel.app/api/users/referrals",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (response.data.success) {
                        setReferrals(response.data.referrals);
                    } else {
                        toast.error(response.data.message || 'Failed to fetch referrals.');
                    }
                } catch (error) {
                    console.error('Error fetching referrals:', error);
                    toast.error('Failed to fetch referral history.');
                }
            }
        };

        fetchReferrals();
    }, [token, backendUrl, userData?._id]);

    const handleInvite = async () => {
        if (!friendEmail) {
            toast.error('Please enter an email address.');
            return;
        }

        if (isSending || invitationSent) {
            return;
        }

        setIsSending(true);

        try {
            if (!token) {
                toast.error('You must be logged in to refer a friend.');
                return;
            }

            const response = await axios.post(
                "https://beebark-backend-2.vercel.app/api/users/refer",
                { friendEmail },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message || `Invitation sent to ${friendEmail}`);
                setFriendEmail('');
                setInvitationSent(true);
                // Optionally refetch referrals after sending an invite
                // fetchReferrals();
            } else {
                toast.error(response.data.message || 'Failed to send invitation.');
            }
        } catch (error) {
            console.error('Referral Error:', error);
            toast.error(
                error.response?.data?.message || 'An error occurred while sending the invitation.'
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
         <div className="bg-[#221912] text-white p-6 text-center mx-auto">
            <h2 className="text-xl font-bold">
                Refer a Friend & Earn 5,000 Credit towards your next marketing campaign.
            </h2>
            <p className="text-sm mt-2">
                Transform Your Business with Beebark - The Future of Architectural Networking & Marketing!
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
                <input
                    type="email"
                    placeholder="Enter email address"
                    className="px-4 py-2 w-64 rounded-lg text-gray-800 focus:outline-none"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    disabled={isSending || invitationSent}
                />
                <button
                    className={`bg-white text-yellow-500 font-semibold px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer ${
                        isSending || invitationSent ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleInvite}
                    disabled={isSending || invitationSent}
                >
                    {isSending ? 'Sending...' : invitationSent ? 'Invitation Sent' : 'Invite'}
                </button>
            </div>

            {referrals.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">People You've Referred</h3>
                    <ul className="text-left">
                        {referrals.map((referral) => (
                            <li key={referral._id} className="py-2 border-b border-gray-500 last:border-b-0 flex md:flex-row flex-col justify-between items-center text-sm md:text-base">
                                <span className="mb-1 md:mb-0 overflow-hidden text-ellipsis whitespace-nowrap">{referral.referredEmail}</span>
                                <div className="flex md:flex-row flex-col items-start md:items-center gap-2 md:gap-4">
                                    <span>
                                        Signup Status: <span className={referral.signupStatus ? 'text-green-400' : 'text-yellow-400'}>
                                            {referral.signupStatus ? 'DONE' : 'PENDING'}
                                        </span>
                                    </span>
                                    <span>
                                        Reward Status: <span className={referral.rewardStatus ? 'text-green-400' : 'text-yellow-400'}>
                                            {referral.rewardStatus ? 'DONE' : 'PENDING'}
                                        </span>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <hr className="w-full border-0 h-1 bg-yellow-400 mt-6" />
        </div>
    );
}