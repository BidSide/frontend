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
              />

              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="flex-column align-center">
            <v-btn color="primary" width="80%">Login</v-btn>

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

@Component({
  metaInfo: {
    title: 'Login'
  }
})
export default class Login extends Vue {
  private email = '';
  private password = '';
}
</script>
