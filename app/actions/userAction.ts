"use server"
import { connectDB } from "../../lib/db/connect";
import User from "../../models/User";

export type UserType = {
    _id: string;
    name: string;
    email: string;
    membershipPlan: string;
};

export type GetUserState = {
    success: boolean;
    message: string;
    user?: UserType;
};

export type GetUserForm = {
    email: string;
};

export const getUser = async (prevData: GetUserState, formData: GetUserForm): Promise<GetUserState> => {
    try {
        await connectDB();
        const { email } = formData;
        const user = await User.findOne({ email }).lean()
        if (user) {
            return { success: true, message: "User fetched successfully", user: JSON.parse(JSON.stringify(user)) }
        } else {
            return { success: false, message: "User not exists" };
        }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Internal server error"};
    }
}