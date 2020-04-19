import { Profile } from '@/types';

export interface AuthState {
  jwt: string | null;
  profile: Profile | null;
}
