<template>
  <v-form @submit.prevent="handleSubmit">
    <div class="d-flex justify-space-between">
      <v-text-field
        type="text"
        :label="
          category ? `Search in ${category}...` : 'Search in all categories...'
        "
        v-model="searchValue"
        :error-messages="searchValueErrors"
        append-icon="mdi-magnify"
        @click:append="handleSubmit"
        solo
        single-line
      />
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators';

@Component({
  validations: {
    searchValue: { required }
  }
})
export default class ProductSearch extends Vue {
  @Prop({
    type: String,
    required: false
  })
  readonly category: string | undefined;

  searchValue = '';

  get searchValueErrors() {
    const errors: string[] = [];
    if (this.$v.searchValue && this.$v.searchValue.$dirty) {
      !this.$v.searchValue.required &&
        errors.push('Please enter the name of the product.');
    }
    return errors;
  }

  handleSubmit() {
    this.$v.$touch();
    if (this.$v.$pending || this.$v.$error) {
      return;
    }

    if (this.category) {
      this.$router.push(`/search/${this.category}/${this.searchValue}`);
    } else {
      this.$router.push(`/search/${this.searchValue}`);
    }
  }
}
</script>
