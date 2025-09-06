"use client"
import { createLink } from '@/app/actions/linkAction'
import React, { FormEvent, useActionState, useEffect, useState, useTransition } from 'react'
import { toast } from 'react-toastify';


const CreateLink = ({ user }) => {
    const [details, setDetails] = useState({
        originalUrl: "",
        alias: "",
    });
    const [isPendingTransition, startTransition] = useTransition();

    const [createState, createAction, isCreating] = useActionState(createLink, { success: false, message: "" })
    useEffect(() => {
        if (createState?.success) {
            toast.success(createState.message);
            window.location.reload();
            setDetails({ originalUrl: "", alias: "" })
        }
        if (!createState?.success && createState?.message) {
            toast.error(createState.message);
        }
    }, [createState])
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (user?.membershipPlan === "Pro" || details.alias.length === 0) {
            startTransition(() => {
                createAction({ details, user });
            });
        } else {
            toast.error("Please upgrade your plan to use custom alias")
        }
    }

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col items-center justify-center gap-5 my-10'>
            <p className='text-xl font-semibold text-center'>Create Short Link</p>
            <input onChange={handleChange} value={details.originalUrl} type="text" name='originalUrl' className='p-5 backdrop-blur-md border outline-none border-white rounded-lg w-full md:w-[50%]' placeholder='Enter url...' />
            <input onChange={handleChange} value={details.alias} type="text" name='alias' className='p-5 backdrop-blur-md border outline-none border-white rounded-lg w-full md:w-[50%]' placeholder='Alias' />
            <button className={`bg-purple-500 rounded-md px-5 py-2 font-semibold cursor-pointer ${details.originalUrl.length === 0 || isCreating ? 'disabled:bg-purple-700 not' : ''}`} disabled={details.originalUrl.length === 0 ? true : false} >{!isCreating ? 'Generate Link' : "Loading..."}</button>
        </form>
    )
}

export default CreateLink