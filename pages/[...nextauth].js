import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId:
        "500377520497-40v49ds3a0hu6aek92cqqi0g60t9jl4a.apps.googleusercontent.com",
      clientSecret: "rh-V3yu04FPsy4S4EL9SzB0Z",
    }),
  ],
});
