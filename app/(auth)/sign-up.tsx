import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {

  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();

  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(''); 

  const isLoading = fetchStatus === 'fetching';

  if (signUp.status === 'complete' || isSignedIn) {
    return null 
  }

  const getLogoMarkup = () => {
    return Platform.OS === "web" ? (
      <Image
        source={require('../../assets/images/brand-logo.png')}
        resizeMode="contain"
        style={{
          height: 48,
          width: 192,
          marginLeft: -32,
          marginBottom: 16,
        }}
        alt="Homest Logo"
      />
    ) : (
      <Image
        source={require('../../assets/images/brand-logo.png')}
        resizeMode="contain"
        className="h-12 w-32 m-2 ml-[-1]"
        alt="Homest Logo"
      />
    )
  }

  const handleSignUp = async () => {
    const { error } = await signUp.password(({
      emailAddress: email,
      firstName,
      lastName,
      password,
    }))

    if (error) {
      console.log(JSON.stringify(error.message, null, 2));
      return;
    }

    await signUp.verifications.sendEmailCode();
  }

  const isOTPView = signUp.status === 'missing_requirements' && 
    signUp.requiredFields.includes('email_address') &&
    signUp.missingFields.length === 0

  const handleVerifyCode = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if(signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/(root)/(tabs)");
          router.replace(url as any);
        },
      });
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {getLogoMarkup()}
          {isOTPView ? (
            <View>
              <Text className="text-4xl font-bold mb-2">Verify account</Text>
              <Text className="text-lg text-gray-500">
                Enter verification code sent to {email}.
              </Text>
              <TextInput
                placeholder="Verification Code"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoComplete="one-time-code"
                autoCorrect={false}
                placeholderTextColor="#6b7280"
                className="border border-gray-300 rounded-md p-4 mt-5 mb-4 flex-1"
                value={code}
                onChangeText={setCode}
              />
              {errors.fields.code && (
                <Text className="text-red-500 text-sm mt-[-14px] mb-4">
                  {errors.fields.code.message}
                </Text>
              )}
              <TouchableOpacity
                onPress={handleVerifyCode}
                className="bg-primary rounded-md p-4 mb-4 items-center justify-center"
              >
                {
                  isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text className="text-white">Verify</Text>
                  )
                }
              </TouchableOpacity>
              <Text className="text-lg text-gray-700 font-semibold">
                Didn't receive the code? <Text className="text-lg text-gray-700 font-semibold" onPress={() => signUp.verifications.sendEmailCode()}>Resend</Text>
              </Text>
            </View>
          ) : (
            <View>
              <Text className="text-4xl font-bold mb-2">Create account</Text>
              <Text className="text-lg text-gray-500 mb-8">
                Create an account to get started
              </Text>
    
              <View>
                <View className="flex-row gap-4">
                  <TextInput
                    placeholder="First Name "
                    keyboardType="default"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect={false}
                    placeholderTextColor="#6b7280"
                    className="border border-gray-300 rounded-md p-4 mb-5 flex-1"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  <TextInput
                    placeholder="Last Name"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect={false}
                    placeholderTextColor="#6b7280"
                    className="border border-gray-300 rounded-md p-4 mb-5 flex-1"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
                
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  placeholderTextColor="#6b7280"
                  className="border border-gray-300 rounded-md p-4 mb-5 flex-1"
                  value={email}
                  onChangeText={setEmail}
                />
                {errors.fields.emailAddress && (
                  <Text className="text-red-500 text-sm mt-[-14px] mb-4">
                    {errors.fields.emailAddress.message}
                  </Text>
                )}
          
                <TextInput
                  placeholder="Password"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect={false}
                  placeholderTextColor="#6b7280"
                  className="border border-gray-300 rounded-md p-4 mb-5 flex-1"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
                {errors.fields.password && (
                  <Text className="text-red-500 text-sm mt-[-14px] mb-4">
                    {errors.fields.password.message}
                  </Text>
                )}
    
    
                <TouchableOpacity
                  onPress={handleSignUp}
                  className="bg-primary rounded-md p-4 mb-4 items-center justify-center"
                >
                  {
                    isLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text className="text-white">Create Account</Text>
                    )
                  }
                </TouchableOpacity>
    
                <View>
                  <Text className="text-lg text-gray-700 font-semibold text-center mt-2">
                    Already have an account? <Link href="/(auth)/sign-in" className="text-primary">Sign in</Link>
                  </Text>
                </View>
              </View>
    
              <View nativeID="clerk-captcha" />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}