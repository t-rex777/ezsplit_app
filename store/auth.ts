// import {getGenericPassword, setGenericPassword} from 'react-native-keychain';
// import {useAsync} from 'react-use';
// import {create} from 'zustand';
// import {devtools, persist} from 'zustand/middleware';
// import {ISignInPageForm} from '../screens/signin';

// interface IAuthStore {
//   isAuthenticated: boolean | undefined;
//   setAuth: (params: ISignInPageForm) => Promise<void>;
// }

// export const useAuth = create<IAuthStore>()(
//   devtools(
//     persist(
//       () => ({
//         isAuthenticated: useAsync(async () => {
//           const cred = await getGenericPassword();
//           if (cred) {
//             return true;
//           }
//           return false;
//         }).value,

//         setAuth: async params => {
//           await setGenericPassword(params.email, params.password);
//         },
//       }),
//       {
//         name: 'auth-storage',
//       },
//     ),
//   ),
// );
