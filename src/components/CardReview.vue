<template>
  <div class="card-container" data-name="Container">
    <div class="card-header" data-name="Header">
      <div class="header-title">
        <p>Review</p>
      </div>
    </div>
    <div class="card-content" data-name="Content">
      <div class="order-number">
        <p>{{ orderNumber }}</p>
      </div>
      <div class="item-header" data-name="Item Header">
        <div class="item-label">
          <p>Item</p>
        </div>
        <div class="qty-label">
          <p>Qty</p>
        </div>
      </div>
      <div class="item-list" data-name="Item List">
        <div class="item-row" data-name="Item Row">
          <div class="topup-label">
            <p>Top-up</p>
          </div>
          <div class="item-quantity">
            <p>{{ itemQuantity }}</p>
          </div>
        </div>
        <div class="account-row" data-name="Account Row">
          <div class="account-label">
            <p>Account</p>
          </div>
          <div class="account-value">
            <p>{{ accountValue }}</p>
          </div>
        </div>
        <div class="name-row" data-name="Name Row">
          <div class="name-label">
            <p>Name</p>
          </div>
          <div class="name-value">
            <p class="name-line">{{ nameValueLine1 }}</p>
            <p>{{ nameValueLine2 }}</p>
          </div>
        </div>
        <div class="info-row" data-name="Mobile Number Row">
          <div class="info-label">
            <p>Mobile Number</p>
          </div>
          <div class="info-value">
            <p>{{ mobileNumber }}</p>
          </div>
        </div>
        <div class="info-row" data-name="Wallet ID Row">
          <div class="info-label">
            <p>e-Wallet ID</p>
          </div>
          <div class="info-value">
            <p>{{ walletId }}</p>
          </div>
        </div>
        <div class="amount-row" data-name="Amount Row">
          <div class="amount-label">
            <p>Amount</p>
          </div>
          <div class="amount-value" data-name="Amount Value">
            <div class="amount-container" data-name="Amount">
              <div class="amount-integer">
                <p>{{ amountValueInteger }}</p>
              </div>
              <div class="amount-decimal">
                <p>{{ amountValueDecimal }}</p>
              </div>
            </div>
            <div class="currency">
              <p>{{ currency }}</p>
            </div>
          </div>
        </div>
        <div class="amount-row" data-name="Fee Row">
          <div class="amount-label">
            <p>Fee</p>
          </div>
          <div class="amount-value" data-name="Fee Value">
            <div class="amount-container" data-name="Fee">
              <div class="amount-integer">
                <p>{{ feeValueInteger }}</p>
              </div>
              <div class="amount-decimal">
                <p>{{ feeValueDecimal }}</p>
              </div>
            </div>
            <div class="currency">
              <p>{{ currency }}</p>
            </div>
          </div>
        </div>
        <div class="amount-row" data-name="Total Amount Row">
          <div class="amount-label">
            <p>Total Amount</p>
          </div>
          <div class="amount-value" data-name="Total Amount Value">
            <div class="amount-container" data-name="Total Amount">
              <div class="amount-integer">
                <p>{{ totalAmountInteger }}</p>
              </div>
              <div class="amount-decimal">
                <p>{{ totalAmountDecimal }}</p>
              </div>
            </div>
            <div class="currency">
              <p>{{ currency }}</p>
            </div>
          </div>
        </div>
      </div>
      <el-button 
        type="primary" 
        class="w-full"
        :loading="false"
      >
        <span class="mr-2">{{ buttonText }}</span>
        <img :src="iconCheck" alt="Check Icon" class="h-4 w-4" />
      </el-button>
    </div>
  </div>
</template>

<script setup lang="js">
import iconCheck from '@/assets/icons/iconcheck.svg';
import { ElButton } from 'element-plus';

const props = defineProps({
  orderNumber: {
    type: String,
    default: 'Order# 0001',
  },
  itemQuantity: {
    type: [String, Number],
    default: '1',
  },
  accountValue: {
    type: String,
    default: 'Wi Wallet',
  },
  nameValueLine1: {
    type: String,
    default: 'MR. Alexandr',
  },
  nameValueLine2: {
    type: String,
    default: 'Pohomov',
  },
  mobileNumber: {
    type: String,
    default: '785xxx3171',
  },
  walletId: {
    type: String,
    default: '34000-131-474-1671',
  },
  amountValueInteger: {
    type: String,
    default: '50,000',
  },
  amountValueDecimal: {
    type: String,
    default: '.00',
  },
  feeValueInteger: {
    type: String,
    default: '0',
  },
  feeValueDecimal: {
    type: String,
    default: '.00',
  },
  totalAmountInteger: {
    type: String,
    default: '50,000',
  },
  totalAmountDecimal: {
    type: String,
    default: '.00',
  },
  currency: {
    type: String,
    default: 'THB',
  },
  buttonText: {
    type: String,
    default: 'Confirm',
  },
});
</script>

<style scoped>
/* Base styles */
p {
  margin: 0;
  line-height: 22px;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 14px;
  color: #909399;
}

/* Value elements will override base color */
.item-quantity p,
.account-value p,
.info-value p,
.amount-integer p,
.amount-decimal p,
.currency p,
.name-value p {
  color: #131414;
}

/* Header and item name text */
.header-title p,
.item-name p {
  color: #909399;
}

/* Card container */
.card-container {
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 0 0 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.06), 
              0px 8px 16px 0px rgba(0, 0, 0, 0.04), 
              0px 8px 32px 8px rgba(0, 0, 0, 0.02);
  width: 343px;
  height: 100%;
}

/* Card header */
.card-header {
  background-color: #ddad51;
  height: 48px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title p {
  font-size: 19px;
  font-weight: normal;
  color: #000000;
  white-space: nowrap;
}

/* Card content */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

/* Order number */
.order-number p {
  font-weight: 500;
  font-size: 14px;
  color: #131414;
  white-space: nowrap;
}

/* Item header */
.item-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Common row styles */
.item-row,
.account-row,
.name-row,
.info-row,
.amount-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Label styles */
.account-label,
.name-label,
.info-label,
.amount-label,
.topup-label {
  font-weight: 500;
  font-size: 14px;
  color: #909399;
  width: 98px;
  flex-shrink: 0;
}

/* Value styles */
.item-label p,
.qty-label p {
  font-weight: 500;
  font-size: 14px;
  color: #606266;
}

.item-label,
.qty-label {
  flex-shrink: 0;
}

/* Value containers */
.item-quantity,
.account-value,
.info-value,
.amount-integer,
.amount-decimal,
.currency {
  white-space: nowrap;
}

/* Name row specific */
.name-value {
  text-align: right;
  white-space: nowrap;
}

.name-line {
  margin-bottom: 0;
}

/* Info row */
.info-row {
  margin: 8px 0;
}

/* Amount rows */
.amount-row {
  margin: 12px 0;
}

.amount-value {
  display: flex;
  align-items: center;
  gap: 4px;
}

.amount-container {
  display: flex;
}

.amount-integer,
.amount-decimal {
  white-space: nowrap;
}

/* Primary button */
.primary-button {
  margin-top: 16px;
}

.el-button {
  --el-button-padding: 12px 16px !important;
  --el-button-font-size: 14px !important;
  --el-button-border-radius: 4px !important;
  --el-button-text-color: white !important;
  --el-button-font-weight: 500 !important;
  --el-button-height: 32px !important;
}

.el-button img {
  height: 16px;
  width: 16px;
  margin-left: 8px;
}

/* Responsive adjustments */
@media (max-width: 375px) {
  .card-content {
    padding: 0 12px;
  }
}</style>
