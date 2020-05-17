<template>
  <v-container>
    <v-row justify="center" style="max-width: initial;">
      <v-col cols="12" sm="10">
        <v-sheet elevation="2" class="pa-4">
          <div v-if="loading" class="d-flex justify-center">
            <v-progress-circular indeterminate color="primary" />
          </div>

          <v-card v-else-if="publicProfile" outlined class="pa-2">
            <div class="d-flex justify-space-between">
              <!-- left -->
              <div>
                <v-card-title>
                  {{ 'User profile' }}
                </v-card-title>
              </div>

              <!-- right -->
              <div>
                <v-card-text>
                  <v-btn
                    v-if="!amISubscribed"
                    color="secondary"
                    :disabled="isSubscribeDisabled"
                    :loading="subscribeActionLoading"
                    @click="handleSubscribe"
                  >
                    {{ 'Subscribe' }}

                    <v-icon small class="ml-2">
                      {{ 'mdi-bell-ring' }}
                    </v-icon>
                  </v-btn>

                  <v-btn
                    v-else
                    color="primary"
                    :disabled="isSubscribeDisabled"
                    :loading="subscribeActionLoading"
                    @click="handleUnsubscribe"
                  >
                    {{ 'Unsubscribe' }}

                    <v-icon small class="ml-2">
                      {{ 'mdi-bell-off' }}
                    </v-icon>
                  </v-btn>
                </v-card-text>
              </div>
            </div>

            <v-divider />

            <v-card-title>
              {{ fullName }}
            </v-card-title>

            <v-card-subtitle>
              {{ emailAddress }}
            </v-card-subtitle>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <v-snackbar v-model="errorSnackbar" right color="error">
      {{ errorText }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { PublicProfileInterface, Profile } from '@/types';

@Component({
  metaInfo: {
    title: 'View profile'
  }
})
export default class PublicProfile extends Vue {
  loading = false;
  subscribeActionLoading = false;

  errorSnackbar = false;
  errorText = '';

  get token(): string | null {
    return this.$store.getters.getJwt;
  }
  get profile(): Profile | null {
    return this.$store.getters.getProfile;
  }
  get mySubscriptions(): string[] {
    return this.$store.getters.getMySubscriptions;
  }
  get amISubscribed(): boolean {
    return this.mySubscriptions.some(sub => sub === this.publicProfile?._id);
  }
  get isSubscribeDisabled(): boolean {
    if (this.token && this.profile && this.publicProfile) {
      if (this.profile.info._id === this.publicProfile._id) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  get publicProfile(): PublicProfileInterface | null {
    return this.$store.getters.getPublicProfile;
  }
  get fullName(): string | undefined {
    if (this.publicProfile && this.publicProfile.user) {
      return (
        this.publicProfile.user.firstName +
        ' ' +
        this.publicProfile.user.lastName
      );
    } else {
      return undefined;
    }
  }
  get emailAddress(): string | undefined {
    if (this.publicProfile && this.publicProfile.user) {
      return this.publicProfile.user.email;
    } else {
      return undefined;
    }
  }

  mounted() {
    this.fetchAll();
  }

  async fetchAll() {
    this.loading = true;

    await this.fetchProfile();
    await this.fetchPublicProfile();

    this.loading = false;
  }

  async fetchProfile() {
    try {
      await this.$store.dispatch('fetchProfile');
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }
  }

  async fetchPublicProfile() {
    try {
      await this.$store.dispatch('fetchPublicProfile', {
        id: this.$route.params.id
      });
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }
  }

  async handleSubscribe() {
    this.subscribeActionLoading = true;

    try {
      await this.$store.dispatch('subscribeToProfile', {
        id: this.publicProfile?._id
      });
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.subscribeActionLoading = false;
  }

  async handleUnsubscribe() {
    this.subscribeActionLoading = true;

    try {
      await this.$store.dispatch('unsubscribeFromProfile', {
        id: this.publicProfile?._id
      });
    } catch (error) {
      this.errorText =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        'Action failed :(';
      this.errorSnackbar = true;
    }

    this.subscribeActionLoading = false;
  }
}
</script>
