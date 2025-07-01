import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CardReview from '../../src/components/CardReview.vue';

describe('CardReview.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(CardReview);
    expect(wrapper.text()).toContain('Review');
    expect(wrapper.text()).toContain('Order# 0001');
    expect(wrapper.text()).toContain('Top-up');
    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('Wi Wallet');
    expect(wrapper.text()).toContain('MR. Alexandr');
    expect(wrapper.text()).toContain('Pohomov');
    expect(wrapper.text()).toContain('785xxx3171');
    expect(wrapper.text()).toContain('34000-131-474-1671');
    expect(wrapper.text()).toContain('50,000.00THB');
    expect(wrapper.text()).toContain('0.00THB');
    expect(wrapper.text()).toContain('Confirm');
  });

  it('renders with custom props', () => {
    const wrapper = mount(CardReview, {
      props: {
        headerTitle: 'Custom Review',
        orderNumber: 'Order# 12345',
        itemName: 'New Item',
        itemQuantity: 5,
        accountValue: 'My Bank',
        nameValueLine1: 'John',
        nameValueLine2: 'Doe',
        mobileNumber: '123-456-7890',
        walletId: 'WALLET-ID-CUSTOM',
        amountValueInteger: '100',
        amountValueDecimal: '.50',
        feeValueInteger: '10',
        feeValueDecimal: '.25',
        totalAmountInteger: '110',
        totalAmountDecimal: '.75',
        currency: 'USD',
        buttonText: 'Proceed',
      },
    });

    expect(wrapper.text()).toContain('Custom Review');
    expect(wrapper.text()).toContain('Order# 12345');
    expect(wrapper.text()).toContain('New Item');
    expect(wrapper.text()).toContain('5');
    expect(wrapper.text()).toContain('My Bank');
    expect(wrapper.text()).toContain('John');
    expect(wrapper.text()).toContain('Doe');
    expect(wrapper.text()).toContain('123-456-7890');
    expect(wrapper.text()).toContain('WALLET-ID-CUSTOM');
    expect(wrapper.text()).toContain('100.50USD');
    expect(wrapper.text()).toContain('10.25USD');
    expect(wrapper.text()).toContain('110.75USD');
    expect(wrapper.text()).toContain('Proceed');
  });
});
