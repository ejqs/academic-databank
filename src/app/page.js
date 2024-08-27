import strings from "@/strings";
import SignIn from "@/components/sign-in";

export default function Home() {
  return (
    <div>
      {strings.homepageAcessible}
      <SignIn text="Continue" />
    </div>
  );
}
