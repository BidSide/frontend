<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" style="max-width: initial;">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-6">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
                :error-messages="emailErrors"
              />

              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :error-messages="passwordErrors"
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="flex-column align-center">
            <v-btn
              color="primary"
              width="80%"
              @click.prevent="submit"
              :loading="isSubmitting"
            >
              Login
            </v-btn>

            <v-divider class="mt-5 align-self-stretch" />

            <span class="mt-5 text-center">Don't have an account?</span>

            <v-btn
              class="mt-3 mb-3"
              width="80%"
              color="secondary"
              link
              to="/register"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { required, email } from 'vuelidate/lib/validators';

@Component({
  metaInfo: {
    title: 'Login'
  },

  validations: {
    email: { required, email },
    password: { required }
  }
})
export default class Login extends Vue {
  private isSubmitting = false;

  private email = '';
  private password = '';

  get emailErrors() {
    const errors: string[] = [];
    if (this.$v.email && this.$v.email.$dirty) {
      !this.$v.email.required && errors.push('Please enter your email!');
      !this.$v.email.email &&
        errors.push('Entered email address is not a valid email address!');
    }
    return errors;
  }
  get passwordErrors() {
    const errors: string[] = [];
    if (this.$v.password && this.$v.password.$dirty) {
      !this.$v.password.required && errors.push('Please enter your password!');
    }
    return errors;
  }

  async submit() {
    this.$v.$touch();
    if (this.$v.$pending || this.$v.$error) {
      return;
    }

    this.isSubmitting = true;
    try {
      // TODO: login user
      console.log('logging in...');
    } catch (error) {
      // TODO: handle error
      console.error(error);
    }
    this.isSubmitting = false;
  }
}
</script>
