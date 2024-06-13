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
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { UserRegistrationTypes } from "@/lib/types/auth";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/lib/appwrite";
import toast from "@/lib/toast";

const imgBg = require("@/assets/images/bg/bg-login.jpg");

export const SignUpSchema: ZodType<UserRegistrationTypes> = z
  .object({
    email: z
      .string({ message: "Email is required!" })
      .email()
      .max(100, "Email is too long!"),
    password: z
      .string({ message: "Password is required!" })
      .min(5, { message: "Password is too short!" })
      .max(100, { message: "Password is too long!" }),
    confirmPassword: z.string(),
    dateOfBirth: z.string().optional(),
    phone: z.string().optional(),
    username: z
      .string({ message: "Username is required!" })
      .min(3, { message: "Username is too short!" })
      .max(100, { message: "Username is too long!" }),
    fullName: z
      .string({ message: "Full Name is required!" })
      .min(3, { message: "Full Name is too short!" })
      .max(100, { message: "Full Name is too long!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

const SignUp = () => {
  const [load, setLoad] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationTypes>({
    resolver: zodResolver(SignUpSchema),

    defaultValues: {
      email: "test@test.com",
      password: "Cobacoba123",
      confirmPassword: "Cobacoba123",
      username: "fitzfitz",
      dateOfBirth: "01/02/1995",
      fullName: "Ftz geral",
      phone: "080989999",
    },
  });

  const onSubmit = async (data: UserRegistrationTypes) => {
    setLoad(true);
    await createUser(data).finally(() => setLoad(false));
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
              <View className="w-[90%] my-4 p-8 rounded-3xl bg-black/70">
                <Text className="text-3xl text-white mb-4">Register User</Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormField
                      title="Email"
                      keyboardType="email-address"
                      placeholder="Enter Email..."
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.email?.message}
                      otherStyles="mb-4"
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
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.password?.message}
                      otherStyles="mb-4"
                    />
                  )}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormField
                      title="Password Confirmation"
                      placeholder="Enter password confirmation..."
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.confirmPassword?.message}
                      otherStyles="mb-4"
                    />
                  )}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                />
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormField
                      title="Full Name"
                      placeholder="Enter Full Name..."
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.fullName?.message}
                      otherStyles="mb-4"
                    />
                  )}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormField
                      title="Phone"
                      placeholder="Enter Phone..."
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.phone?.message}
                      otherStyles="mb-4"
                    />
                  )}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                />
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <FormField
                      title="DoB"
                      placeholder="Enter Date of Birth..."
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={errors.dateOfBirth?.message}
                      otherStyles="mb-4"
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

                  <Text className="text-white text-center">Register</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;
