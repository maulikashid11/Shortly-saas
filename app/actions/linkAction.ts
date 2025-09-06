"use server";

import { connectDB } from "@/lib/db/connect";
import Link from "@/models/Link";
import { UserType } from "./userAction";
import { revalidatePath } from "next/cache";

export type LinkType = {
    _id: string;
    originalUrl: string;
    code: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
};

export type CreateLinkState = {
    success: boolean;
    message: string;
    link?: LinkType;
};

export type CreateLinkForm = {
    details: {
        originalUrl: string;
        alias?: string;
    };
    user: UserType;
};

// Helpers
const randomLetter = () =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 52)];
const randomNumber = () =>
    "1234567890"[Math.floor(Math.random() * 10)];
const generateCode = () =>
    `${randomLetter()}${randomLetter()}${randomLetter()}${randomNumber()}${randomNumber()}${randomLetter()}${randomLetter()}${randomLetter()}${randomLetter()}${randomNumber()}${randomNumber()}${randomLetter()}`;

export async function createLink(
    previousData: CreateLinkState,
    formData: CreateLinkForm
): Promise<CreateLinkState> {
    try {
        await connectDB();

        const originalUrl = formData.details.originalUrl?.trim();
        if (!originalUrl) {
            return { success: false, message: "Original URL is required" };
        }

        // Check if original URL already exists
        const existingLink = await Link.findOne({ originalUrl }).lean<LinkType>();
        if (existingLink) {
            return {
                success: false,
                message: "This URL is already shortened",
                link: {
                    ...existingLink,
                    _id: existingLink._id.toString(),
                    userId: existingLink.userId.toString(),
                },
            };
        }

        // Use alias if provided, else generate random code
        let code = formData.details.alias?.trim() || generateCode();
        while (await Link.findOne({ code })) {
            if (formData.details.alias) {
                return { success: false, message: "Alias already taken" };
            }
            code = generateCode();
        }

        // Create new link
        const createdLink = await Link.create({
            originalUrl,
            code,
            userId: formData.user._id,
        });
        revalidatePath('/dashboard');
        return {
            success: true,
            message: "Link created successfully",
            link: {
                _id: createdLink._id.toString(),
                originalUrl: createdLink.originalUrl,
                code: createdLink.code,
                userId: createdLink.userId.toString(),
            },
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal server error" };
    }
}


export async function getLinksByUserId(
    previousData: { success: boolean; message: string; links?: LinkType[] },
    formData: { userId: string }
): Promise<{ success: boolean; message: string; links?: LinkType[] }> {
    try {
        await connectDB();

        const links = await Link.find({ userId: formData.userId }).lean<LinkType[]>();

        return {
            success: true,
            message: "Links fetched successfully",
            links: links.map((link) => ({
                ...link,
                _id: link._id.toString(),
                userId: link.userId.toString(),
            })),
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal server error" };
    }
}

export type GetLinkState = {
    success: boolean;
    message: string;
    originalUrl?: string;
    link?: LinkType;
};
export async function getLinkByCode(
    prevState: GetLinkState,
    formData: { code: string }
): Promise<GetLinkState> {
    try {
        await connectDB();

        const link = await Link.findOne({ code: formData.code }).lean<LinkType>();

        if (link) {
            return {
                success: true,
                message: "Link found",
                originalUrl: link.originalUrl,
                link: {
                    ...link,
                    _id: link._id.toString(),
                    userId: link.userId.toString(),
                },
            };
        }

        return { success: false, message: "Link not found" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal server error" };
    }
}

export async function deleteLinkById(
    prevData: { success: boolean; message: string },
    formData: { linkId: string }
): Promise<{ success: boolean; message: string }> {
    try {
        await connectDB();
        const deletedLink = await Link.findByIdAndDelete(formData.linkId);
        revalidatePath('/dashboard'); 
        if (deletedLink) {
            return { success: true, message: "Link deleted successfully" };
        } else {
            return { success: false, message: "Link not found" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal server error" };
    }
}

