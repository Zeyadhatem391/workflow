import { create } from "zustand";
import { AddUserInput } from "../schema/register";
import { persist } from "zustand/middleware";

interface RegisterStore {
  users: AddUserInput[];
  isEmailTaken: (email: string) => boolean;
  addUser: (user: AddUserInput) => void;
  login: (email: string, password: string) => AddUserInput | null;
  findUserByEmail: (email: string) => AddUserInput | null;
  updatePassword: (email: string, newPassword: string) => boolean;


  resetOtp: {
    email: string;
    otp: string;
    expiresAt: number;
  } | null;

  setResetOtp: (
    email: string,
    otp: string,
    expiresAt: number
  ) => void;

  clearResetOtp: () => void;
}

export const useUserStore = create<RegisterStore>()(
  persist(
    (set, get) => ({
      users: [],

      isEmailTaken: (email) => {
        return get().users.some(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );
      },

      login: (email, password) => {
        const user = get().users.find(
          (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );

        return user ?? null;
      },

      findUserByEmail: (email) => {
        const user = get().users.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        return user ?? null;
      },

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updatePassword: (email, newPassword) => {
        const userExists = get().users.some(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (!userExists) {
          return false;
        }

        set((state) => ({
          users: state.users.map((user) =>
            user.email.toLowerCase() === email.toLowerCase()
              ? {
                ...user,
                password: newPassword,
              }
              : user
          ),
        }));

        return true;
      },


      resetOtp: null,

      setResetOtp: (email, otp, expiresAt) =>
        set({
          resetOtp: {
            email,
            otp,
            expiresAt,
          },
        }),

      clearResetOtp: () =>
        set({
          resetOtp: null,
        }),
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    }
  )
);