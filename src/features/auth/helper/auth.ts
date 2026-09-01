import Cookies from "js-cookie";

export interface CurrentUser {
    id: string;
    name: string;
    email: string;
}

export const getCurrentUser = (): CurrentUser | null => {
    const userCookie = Cookies.get("user");

    if (!userCookie) {
        return null;
    }

    try {
        return JSON.parse(userCookie) as CurrentUser;
    } catch (error) {
        console.error("Failed to parse user cookie:", error);
        return null;
    }
};