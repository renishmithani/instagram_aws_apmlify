import {
  signUp,
  signOut,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";
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
        autoSignIn: false,
      },
    });

    console.log(isSignUpComplete);
    console.log(userId);
    return { isSignUpComplete, userId, nextStep };
  } catch (error) {
    console.log("error signing up:", error);
    throw new Error(error);
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
    throw new Error(error);
  }
}

export async function handleSignIn({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username,
      password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    });
    console.log(isSignedIn, nextStep);
    return { isSignedIn, nextStep };
  } catch (error) {
    console.log("error signing in", error);
    throw new Error(error);
  }
}

export async function handleSignOut() {
  try {
    const result = await signOut({ global: true });
    console.log("RESULT", result);
  } catch (error) {
    console.log("error signing out: ", error);
    throw new Error(error);
  }
}

export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
    return { username, userId, signInDetails };
  } catch (err) {
    console.log("currentAuthenticatedUser", err);
    throw new Error(err);
  }
}

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
