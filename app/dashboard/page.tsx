"use client";
import AllLinks from '@/components/AllLinks';
import CreateLink from '@/components/CreateLink';
import { useSession } from 'next-auth/react';
import React, { useActionState, useEffect, useState, useTransition } from 'react';
import { getUser } from '@/app/actions/userAction';
import { getLinksByUserId } from '../actions/linkAction';
import Navbar from '@/components/Navbar';

type User = {
  _id: string;
  name: string;
  email: string;
  membershipPlan: string;
};

type UserState = {
  success: boolean;
  message: string;
  user?: User;
};

type LinksState = {
  success: boolean;
  message: string;
  links?: LinkType[];
};

type LinkType = {
  _id: string;
  originalUrl: string;
  code: string;
  userId: string;
};

const Dashboard = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [, startTransition] = useTransition();

  // State for fetching user
  const [state, formAction,] = useActionState<UserState, { email: string }>(
    getUser,
    { success: false, message: "" }
  );

  // State for fetching links
  const [linksState, linksAction,] = useActionState<LinksState, { userId: string }>(
    getLinksByUserId,
    { success: false, message: "" }
  );
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    if (user?._id) {
      startTransition(() => {
        linksAction({ userId: user._id });
      });
    }
  }, [user, linksAction]);

  useEffect(() => {
    if (linksState?.success && linksState.links) {
      setLinks(linksState.links);
    }
  }, [linksState]);

  useEffect(() => {
    if (session?.user?.email) {
      startTransition(() => {
        formAction({ email: session.user!.email! });
      });
    }
  }, [session, formAction]);

  useEffect(() => {
    if (state?.success && state.user) {
      setUser(state.user);
    }
  }, [state]);

  return (
    <>
      <Navbar />

      <div className="pt-20 p-10 min-h-screen w-full text-white bg-gradient-to-tr from-purple-950 to-blue-950 via-black">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <CreateLink user={user} />
        <AllLinks links={links} />
      </div>
    </>
  );
};

export default Dashboard;
