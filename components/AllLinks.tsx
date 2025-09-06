'use client'
import { deleteLinkById, LinkType } from '@/app/actions/linkAction'
import React, { useActionState, useEffect, useTransition } from 'react'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'


const AllLinks = ({ links }: { links: LinkType[] }) => {
    const [deleteState, deleteAction, isDeleting] = useActionState(deleteLinkById, { success: false, message: "" })
    const [_, startTransition] = useTransition();

    const handleDelete = (id) => {
        startTransition(() => {
            deleteAction({ linkId: id });
        })
    }
    useEffect(() => {
        if (deleteState.success) {
            toast.success(deleteState.message);
            window.location.reload();
        }
    }, [deleteState]);
    return (
        <div className='mt-10'>
            <p className='text-xl font-semibold'>All Links</p>
            <div className='flex  mt-10'>
                <p className='w-1/2'>Original Link</p>
                <p className='w-1/2'>Short Link</p>
                <p className=''>Remove</p>
            </div>
            <hr className='my-5 text-gray-500' />
            {
                links.map((link: LinkType) => (
                    <div key={link._id} className='flex  mt-10'>
                        <a className='w-1/2 ' target='_black' href={link.originalUrl}>{link.originalUrl}</a>
                        <a className='w-1/2 ' target='_black' href={`http://localhost:3000/${link.code}`}>{`http://localhost:3000/${link.code}`}</a>
                        <button className='cursor-pointer hover:text-red-500 duration-250' onClick={() => handleDelete(link._id)}><MdDelete /></button>
                    </div>
                ))
            }
        </div>
    )
}

export default AllLinks