import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";

export default function RootLayout() {
	const { isSignedIn, isLoaded } = useAuth();

	// Sync clerk user -> supabase user

	if (!isLoaded) {
		return null
	}

	if (!isSignedIn) {
		return <Redirect href="/(auth)/sign-in" />
	}
	return <Slot />
}
