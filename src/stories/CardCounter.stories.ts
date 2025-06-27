import { Meta, StoryObj } from '@storybook/vue3';
import CardCounter from '../components/CardCounter.vue';

const meta: Meta<typeof CardCounter> = {
  title: 'Components/CardCounter',
  component: CardCounter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['Active', 'Inactive'],
    },
    counterName: { control: 'text' },
    amount: { control: 'number' },
    totalTopUp: { control: 'number' },
  },
};

type Story = StoryObj<typeof CardCounter>;

export default meta;

export const Primary: Story = {
  args: {
    counterName: 'Counter Patong',
    status: 'Active',
    amount: 100000000,
    totalTopUp: 50000000,
  },
};

export const Inactive: Story = {
  args: {
    ...Primary.args,
    status: 'Inactive',
  },
};

export const CustomAmount: Story = {
  args: {
    ...Primary.args,
    amount: 50000000,
    totalTopUp: 25000000,
  },
};
