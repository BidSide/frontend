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
                  <v-btn color="primary" :disabled="!token">
                    {{ 'Subscribe' }}

                    <v-icon small class="ml-2">
                      {{ 'mdi-bell-ring' }}
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { PublicProfileInterface } from '@/types';

@Component({
  metaInfo: {
    title: 'View profile'
  }
})
export default class PublicProfile extends Vue {
  loading = false;

  get token(): string | null {
    return this.$store.getters.getJwt;
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
    this.fetchPublicProfile();
  }

  async fetchPublicProfile() {
    this.loading = true;

    try {
      await this.$store.dispatch('fetchPublicProfile', {
        id: this.$route.params.id
      });
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
}
</script>
