<template>
  <v-list :dense="$vuetify.breakpoint.xsOnly">
    <v-list-item
      v-for="(transaction, index) in sortedTransactions"
      :key="index"
      three-line
    >
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          {{
            isTransactionPositive(transaction.reason) === undefined
              ? transaction.amount
              : isTransactionPositive(transaction.reason)
              ? `+${transaction.amount}`
              : `-${transaction.amount}`
          }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ transaction.reason | formatReason }}
        </v-list-item-subtitle>

        <v-list-item-subtitle>
          {{ transaction.createdAt | formatDate }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { parseISO, format } from 'date-fns';

import { TransactionLog } from '@/types';

@Component({
  filters: {
    formatReason: function(reason: string): string {
      switch (reason) {
        case 'WALLET_TOPUP':
          return 'Top-up balance';
        case 'BUYOUT':
          return 'Sold product';
        case 'BUYOUT_LOCKDOWN':
          return 'Buying a product';
        case 'BID_LOCKDOWN':
          return 'Making bid';
        case 'OUTBID_CREDITING':
          return 'Return locked credit (someone outbid you)';
        default:
          return 'Unknown reason';
      }
    },
    formatDate(dateString: string): string {
      const date = parseISO(dateString);

      return format(date, 'dd/MM/yyyy HH:mm');
    }
  }
})
export default class MyTransactions extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly transactions!: TransactionLog[];

  get sortedTransactions(): TransactionLog[] {
    return this.transactions.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (b.createdAt < a.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  isTransactionPositive(reason: string): boolean | undefined {
    switch (reason) {
      case 'WALLET_TOPUP':
        return true;
      case 'BUYOUT':
        return true;
      case 'BUYOUT_LOCKDOWN':
        return false;
      case 'BID_LOCKDOWN':
        return false;
      case 'OUTBID_CREDITING':
        return true;
      default:
        return undefined;
    }
  }
}
</script>
