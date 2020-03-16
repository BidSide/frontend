import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';

import { User } from './auth.types';

@Module
export default class Auth extends VuexModule {
  private user: User | null = null;

  @Mutation
  setUser(user: User | null) {
    this.user = user;
  }

  @Action({ commit: 'setUser' })
  async registerUser({
    email,
    firstName,
    lastName,
    password
  }: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    // TODO: make actual request
    console.log(`${email}:${password} is registering...`);

    const user: User = {
      jwt: 'asd123',
      email: 'test@gmail.com',
      firstName: 'Jóska',
      lastName: 'Pista'
    };

    return user;
  }

  @Action({ commit: 'setUser' })
  async loginUser({ email, password }: { email: string; password: string }) {
    // TODO: make actual request
    console.log(`${email}:${password} is logging in...`);

    const user: User = {
      jwt: 'asd123',
      email: 'test@gmail.com',
      firstName: 'Jóska',
      lastName: 'Pista'
    };

    return user;
  }

  @Action({ commit: 'setUser' })
  logoutUser() {
    return null;
  }
}
