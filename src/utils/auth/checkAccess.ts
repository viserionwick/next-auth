export const hasAccess = (role: string, section: string): boolean => {
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