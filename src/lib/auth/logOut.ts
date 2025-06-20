// Essentials
import { signOut as nextAuthSignOut } from "next-auth/react";

// Utils
import { clientEnv } from "@/utils/env/clientEnv";

const logOut = async () => {
    await nextAuthSignOut({ redirect: false });
    window.location.href = `${clientEnv.AUTH0_ISSUER}/v2/logout?client_id=${clientEnv.AUTH0_CLIENT_ID}&returnTo=${clientEnv.DEPLOYED_URL}`;
}

export default logOut;