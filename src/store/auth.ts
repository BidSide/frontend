import { VuexModule, Module } from 'vuex-module-decorators';

@Module
export default class Auth extends VuexModule {
  private jwt = '';
  private user = null;
}
