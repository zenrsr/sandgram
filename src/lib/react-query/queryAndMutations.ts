import { useMutation } from "@tanstack/react-query";
import { createUserAccount, loginAccount } from "../db/api";
import { INewUser } from "@/types";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
  });
};

export const useLoginAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      loginAccount(user)
  });
};

// export const useLoginAccountMutation = () => {
//     return useMutation({
//         mutationFn: (user: {
//             email: string; password: string;
//         } => loginAccount(user))
//     });
// };
