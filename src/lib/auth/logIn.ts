// Essentials
import { signIn as nextAuthSignIn } from "next-auth/react";

const logIn = () => {
    nextAuthSignIn("auth0");
}

export default logIn;