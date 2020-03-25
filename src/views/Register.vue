<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" style="max-width: initial;">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-6">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                type="text"
                v-model="email"
                :error-messages="emailErrors"
              />

              <v-text-field
                label="First name"
                type="text"
                v-model="firstName"
                :error-messages="firstNameErrors"
              />

              <v-text-field
                label="Last name"
                type="text"
                v-model="lastName"
                :error-messages="lastNameErrors"
              />

              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                :error-messages="passwordErrors"
              />

              <v-text-field
                label="Password again"
                type="password"
                v-model="passwordAgain"
                :error-messages="passwordAgainErrors"
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
              Register
            </v-btn>

            <v-divider class="mt-5 align-self-stretch" />

            <span class="mt-5 text-center">Already have an account?</span>

            <v-btn
              class="mt-3 mb-3"
              color="secondary"
              width="80%"
              link
              to="/login"
            >
              Login
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

@Component({
  metaInfo: {
    title: 'Register'
  },

  validations: {
    email: {
      required,
      email
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordAgain: {
      required,
      sameAs: sameAs('password')
    }
  }
})
export default class Register extends Vue {
  private isSubmitting = false;

  private email = '';
  private firstName = '';
  private lastName = '';
  private password = '';
  private passwordAgain = '';

  get emailErrors() {
    const errors: string[] = [];
    if (this.$v.email && this.$v.email.$dirty) {
      !this.$v.email.required && errors.push('Email address is required!');
      !this.$v.email.email &&
        errors.push('Entered email address is not a valid email address!');
    }
    return errors;
  }
  get firstNameErrors() {
    const errors: string[] = [];
    if (this.$v.firstName && this.$v.firstName.$dirty) {
      !this.$v.firstName.required && errors.push('First name is required!');
    }
    return errors;
  }
  get lastNameErrors() {
    const errors: string[] = [];
    if (this.$v.lastName && this.$v.lastName.$dirty) {
      !this.$v.lastName.required && errors.push('Last name is required!');
    }
    return errors;
  }
  get passwordErrors() {
    const errors: string[] = [];
    if (this.$v.password && this.$v.password.$dirty) {
      !this.$v.password.required && errors.push('Password is required!');
      !this.$v.password.minLength &&
        errors.push('Password must be at least 6 characters long!');
    }
    return errors;
  }
  get passwordAgainErrors() {
    const errors: string[] = [];
    if (this.$v.passwordAgain && this.$v.passwordAgain.$dirty) {
      !this.$v.passwordAgain.required &&
        errors.push('Password confirmation is required!');
      !this.$v.passwordAgain.sameAs &&
        errors.push('Passwords must be identical!');
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
      await this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        passwordAgain: this.passwordAgain,
        firstName: this.firstName,
        lastName: this.lastName
      });

      this.$router.push('/');
    } catch (error) {
      console.error(error);
    }
    this.isSubmitting = false;
  }
}
</script>
