import { signUp, signOut } from "aws-amplify/auth";
import { confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";
import { signIn, type SignInInput } from "aws-amplify/auth";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number?: string;
};

export async function handleSignUp({
  username,
  password,
  email,
  phone_number,
}: SignUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          //   phone_number, // E.164 number convention
        },
        // optional
        autoSignIn: false, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      },
    });

    console.log(userId);
    console.log(isSignUpComplete);
  } catch (error) {
    console.log("error signing up:", error);
  }
}

export async function handleSignUpConfirmation({
  username,
  confirmationCode,
}: ConfirmSignUpInput) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
    console.log(isSignUpComplete, nextStep);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}

export async function handleSignIn({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
  } catch (error) {
    console.log("error signing in", error);
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
