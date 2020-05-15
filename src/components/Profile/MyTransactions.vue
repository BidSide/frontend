<template>
  <v-list :dense="$vuetify.breakpoint.xsOnly">
    <v-list-item v-for="(transaction, index) in transactions" :key="index">
      <v-list-item-content>
        <v-list-item-title>
          {{ transaction.reason }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { TransactionLog } from '@/types';

@Component
export default class MyTransactions extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly transactions!: TransactionLog[];
}
</script>
