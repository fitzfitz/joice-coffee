import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/ui/form-field";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SignInTypes } from "@/lib/types/auth";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useAppContext } from "@/providers/app/context";

const imgBg = require("@/assets/images/bg/bg-login.jpg");

export const SignInSchema: ZodType<SignInTypes> = z.object({
  email: z
    .string({ message: "Email is required!" })
    .email("Email is")
    .max(100, "Email is too long"),
  password: z
    .string({ message: "Password is required!" })
    .max(100, { message: "Password is too long" }),
});

const SignIn = () => {
  const { setUser } = useAppContext();
  const { replace } = useRouter();
  const [load, setLoad] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInTypes>({
    resolver: zodResolver(SignInSchema),

    defaultValues: {
      email: "test@test.com",
      password: "Cobacoba123",
    },
  });

  const onSubmit = async (data: SignInTypes) => {
    setLoad(true);
    const sess = await signIn(data.email, data.password);
    const acc = await getCurrentUser();
    if (sess && acc) {
      setLoad(false);
      setUser(acc);
      replace("home");
    }
  };

  return (
    <ImageBackground
      source={imgBg}
      className="w-screen h-full flex-1 justify-center items-center"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 w-full">
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <KeyboardAvoidingView
            behavior="padding"
            className="w-full items-center"
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View className="w-[90%] p-8 rounded-3xl bg-black/70">
                <Text className="text-3xl text-white">Joice Coffee</Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormField
                      title="Email"
                      placeholder="Enter Email..."
                      otherStyles="my-7"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.email?.message}
                    />
                  )}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormField
                      title="Password"
                      placeholder="Enter password..."
                      secureTextEntry
                      otherStyles="mb-7"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.password?.message}
                    />
                  )}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                />
                <TouchableOpacity
                  className="bg-secondary-brown p-3 rounded-full flex-row space-x-2 justify-center"
                  onPress={handleSubmit(onSubmit)}
                  disabled={load}
                >
                  {load ? (
                    <ActivityIndicator animating size="small" color="#FFF" />
                  ) : null}

                  <Text className="text-white text-center">Login</Text>
                </TouchableOpacity>
                <View className="justify-center pt-5 flex-row gap-2">
                  <Text className="text-sm text-white">
                    Don't have an account?
                  </Text>
                  <Link
                    href="/sign-up"
                    className="text-sm text-secondary-brown"
                  >
                    Sign up?
                  </Link>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
