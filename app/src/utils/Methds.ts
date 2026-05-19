import { signOut } from "next-auth/react";

export const signOutHandler = async () => {
    const currentHost = window.location.origin;// Get current subdomain dynamically
    const redirectURL = `${currentHost}/login` // Redirect dynamically // Redirect dynamically
    await signOut({ redirect: false });
    window.location.href = redirectURL;
}