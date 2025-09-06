    "use client";
    import AllLinks from '@/components/AllLinks'
    import CreateLink from '@/components/CreateLink'
    import { useSession } from 'next-auth/react';
    import React, { useActionState, useEffect, useState, useTransition } from 'react'
    import { getUser } from '@/app/actions/userAction'
    import { getLinksByUserId } from '../actions/linkAction';
    import Navbar from '@/components/Navbar';

    type User = {
        _id: string;
        name: string;
        email: string;
        membershipPlan: string;
    };

    const Dashboard = () => {
        const { data: session } = useSession();
        const [user, setUser] = useState<User | null>(null)
        const [isPendingTransition, startTransition] = useTransition();
        const [state, formAction, isPending] = useActionState(getUser, { success: false, message: "" })

        const [linksState, linksAction, isFetched] = useActionState(getLinksByUserId, { success: false, message: "" })
        const [links, setLinks] = useState([])
        useEffect(() => {
            if (user?._id) {
                startTransition(() => {
                    linksAction({ userId: user._id });
                });
            }
        }, [user])
        useEffect(() => {
            if (linksState?.success && linksState.links) {
                setLinks(linksState.links);
            }
        }, [linksState])


        useEffect(() => {
            if (session?.user?.email) {
                startTransition(() => {
                    formAction({ email: session.user.email });
                });
            }
        }, [session])

        useEffect(() => {
            if (state?.success && state.user) {
                setUser(state.user);
            }
        }, [state]);
        return (
            <>
                <Navbar />

                <div className='pt-20 p-10 min-h-screen w-full text-white bg-gradient-to-tr from-purple-950 to-blue-950 via-black'>
                    <h2 className='text-2xl font-semibold'>Dashboard</h2>
                    <CreateLink user={user} />
                    <AllLinks links={links} />
                </div>
            </>
        )
    }

    export default Dashboard