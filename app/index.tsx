import { useUser } from "@clerk/expo";
import { Redirect } from "expo-router";


export default function Index() {
  const { isSignedIn } = useUser()
  
  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)" />
  } else {
    return <Redirect href="/(auth)/sign-in" />
  }
}
