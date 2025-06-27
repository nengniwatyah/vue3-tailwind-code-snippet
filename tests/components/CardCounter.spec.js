import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardCounter from '../CardCounter.vue'
import { ElCard } from 'element-plus'

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElCard: {
    name: 'ElCard',
    props: {},
  },
}))

describe('CardCounter', () => {
  it('renders with default props', () => {
    const wrapper = mount(CardCounter)
    
    // Check title
    expect(wrapper.find('h1').text()).toBe('Card Counter Wallet Demo')
    
    // Check default counter name
    expect(wrapper.find('.counter-name').text()).toBe('Counter Patong')
    
    // Check default status
    expect(wrapper.findComponent({ name: 'StatusTag' }).props('status')).toBe('active')
    
    // Check formatted amounts
    expect(wrapper.find('.amount').at(0).text()).toContain('100,000,000.00')
    expect(wrapper.find('.amount').at(1).text()).toContain('100,000,000.00')
  })

  it('renders with custom props', () => {
    const wrapper = mount(CardCounter, {
      props: {
        counterName: 'Test Counter',
        status: 'inactive',
        amount: 50000,
        totalTopUp: 25000
      }
    })
    
    // Check custom counter name
    expect(wrapper.find('.counter-name').text()).toBe('Test Counter')
    
    // Check custom status
    expect(wrapper.findComponent({ name: 'StatusTag' }).props('status')).toBe('inactive')
    
    // Check formatted custom amounts
    expect(wrapper.find('.amount').at(0).text()).toContain('50,000.00')
    expect(wrapper.find('.amount').at(1).text()).toContain('25,000.00')
  })

  it('formats amounts correctly', () => {
    const wrapper = mount(CardCounter, {
      props: {
        amount: 123456.789,
        totalTopUp: 9876.543
      }
    })
    
    // Check amount formatting
    expect(wrapper.find('.amount').at(0).text()).toContain('123,456.79')
    expect(wrapper.find('.amount').at(1).text()).toContain('9,876.54')
  })

  it('renders status tag correctly', () => {
    const wrapper = mount(CardCounter, {
      props: {
        status: 'active'
      }
    })
    
    // Check status tag component
    const statusTag = wrapper.findComponent({ name: 'StatusTag' })
    expect(statusTag.exists()).toBe(true)
    expect(statusTag.props('status')).toBe('active')
  })
})
