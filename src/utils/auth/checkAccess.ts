// Essentials
import { Session } from "next-auth";

export const hasAccess = (session: Session, section: string): boolean => {
    const role = session?.user.role!;
    if (!role) return false;
    
    const roleMap: Record<string, string[]> = {
        admin: [
            "read:dashboard",
            "read:users",
            "edit:users",
            "edit:blog_posts",
            "assign:roles"
        ],
        editor: [
            "edit:blog_posts",
            "read:dashboard",
            "read:users"
        ],
    };

    return roleMap[role]?.includes(section);
};