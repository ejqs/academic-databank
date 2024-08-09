import AuthButton from "@/components/auth-button";
import CreateButton from "@/components/create-button";
import SignIn from "@/components/sign-in";
// import SignIn from "@/components/sign-in";
import config from "@/config";

export default function Home() {
  return (
    <div>
      {config.homepageAcessible}
      <SignIn text="Continue" />
    </div>
  );
}
