<template>
  <v-container class="fill-height">
    <v-row justify="center" style="max-width: initial;">
      <v-col cols="12" sm="10">
        <div v-if="loading" class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary" />
        </div>

        <v-sheet v-else-if="profile" elevation="2" class="pa-4">
          <div class="d-flex justify-space-between align-center">
            <span class="display-1">
              {{ profile.firstName + ' ' + profile.lastName }}
            </span>

            <span class="title">
              {{ 'Balance: ' + profile.wallet }}
              <v-icon small color="primary">
                {{ 'mdi-currency-usd-circle' }}
              </v-icon>
            </span>
          </div>

          <div class="d-flex justify-end mt-2">
            <v-btn color="primary">
              {{ 'Top-up balance' }}

              <v-icon small class="ml-3">
                {{ 'mdi-wallet-plus' }}
              </v-icon>
            </v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  metaInfo: {
    title: 'Profile'
  }
})
export default class Profile extends Vue {
  loading = false;

  get profile() {
    return this.$store.getters.getProfile;
  }

  mounted() {
    this.fetchProfile();
  }

  async fetchProfile() {
    try {
      this.loading = true;

      await this.$store.dispatch('fetchProfile');
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  }
}
</script>
