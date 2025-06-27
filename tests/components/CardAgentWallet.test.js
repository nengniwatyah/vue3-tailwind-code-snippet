import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import CardAgentWallet from '../../src/components/CardAgentWallet.vue'

// Define mock components using defineComponent for reliability
const ElCard = defineComponent({
  name: 'ElCard',
  template: `
    <div class="el-card">
      <div class="el-card__header" v-if="$slots.header">
        <slot name="header"></slot>
      </div>
      <div class="el-card__body">
        <slot></slot>
      </div>
    </div>
  `
})

const ElProgress = defineComponent({
  name: 'ElProgress',
  props: ['percentage', 'strokeWidth', 'color'],
  template: '<div class="el-progress"></div>'
})

const globalMocks = {
  components: {
    ElCard,
    ElProgress
  }
}

describe('CardAgentWallet', () => {
  it('ควรจะ render ได้อย่างถูกต้อง', () => {
    const wrapper = mount(CardAgentWallet, { global: globalMocks })
    expect(wrapper.exists()).toBe(true)
  })

  it('ควรจะแสดงข้อมูลพื้นฐานได้อย่างถูกต้อง', () => {
    const wrapper = mount(CardAgentWallet, { global: globalMocks })
    const text = wrapper.text()
    expect(text).toContain('Total Agent Wallet')
    expect(text).toContain('Total Balance')
    expect(text).toContain('100,000.00 THB')
    expect(text).toContain('Status')
    expect(text).toContain('Active')
    expect(text).toContain('Latest Update')
    expect(text).toContain('2023-07-13 17:09')
  })

  describe('calculations', () => {
    it('ควรจะคำนวณ percentage ได้อย่างถูกต้อง', () => {
      const wrapper = mount(CardAgentWallet, {
        props: {
          totalWallet: '100,000.00',
          usedAmount: '20,000.00'
        },
        global: globalMocks
      })
      expect(wrapper.vm.percentage).toBe(80)
    })

    it('ควรจะจัดการกับค่าที่เป็น 0 ได้อย่างถูกต้อง', () => {
      const wrapper = mount(CardAgentWallet, {
        props: {
          totalWallet: '0.00',
          usedAmount: '0.00'
        },
        global: globalMocks
      })
      expect(wrapper.vm.percentage).toBe(100)
    })
  })

  describe('progress color', () => {
    it('ควรจะแสดงสีเขียวเมื่อ percentage > 50%', () => {
      const wrapper = mount(CardAgentWallet, {
        props: {
          totalWallet: '100,000.00',
          usedAmount: '20,000.00'
        },
        global: globalMocks
      })
      expect(wrapper.vm.progressColor).toBe('#67C23A')
    })

    it('ควรจะแสดงสีส้มเมื่อ percentage <= 50%', () => {
      const wrapper = mount(CardAgentWallet, {
        props: {
          totalWallet: '100,000.00',
          usedAmount: '50,000.00'
        },
        global: globalMocks
      })
      expect(wrapper.vm.progressColor).toBe('#E6A23C')
    })

    it('ควรจะแสดงสีแดงเมื่อ percentage <= 10%', () => {
      const wrapper = mount(CardAgentWallet, {
        props: {
          totalWallet: '100,000.00',
          usedAmount: '90,000.00'
        },
        global: globalMocks
      })
      expect(wrapper.vm.progressColor).toBe('#F56C6C')
    })
  })

  describe('props', () => {
    it('ควรจะใช้ค่า default เมื่อไม่ได้กำหนด props', () => {
      const wrapper = mount(CardAgentWallet, { global: globalMocks })
      expect(wrapper.props('totalWallet')).toBe('100,000.00')
      expect(wrapper.props('status')).toBe('Active')
    })

    it('ควรจะรับค่า props ที่กำหนดได้', () => {
      const wrapper = mount(CardAgentWallet, {
        props: {
          totalWallet: '50,000.00',
          status: 'Inactive',
          creditLimit: '50,000.00'
        },
        global: globalMocks
      })
      expect(wrapper.props('totalWallet')).toBe('50,000.00')
      expect(wrapper.props('status')).toBe('Inactive')
    })
  })

  describe('responsive', () => {
    it('ควรจะปรับขนาดตามหน้าจอได้อย่างถูกต้อง', () => {
      const wrapper = mount(CardAgentWallet, { global: globalMocks })
      expect(wrapper.find('h1').classes()).toContain('w-full')
      const container = wrapper.find('.card-body')
      expect(container.classes()).toContain('w-full')
    })
  })

  describe('ElProgress', () => {
    it('ควรจะ render ElProgress component ได้อย่างถูกต้อง', () => {
      const wrapper = mount(CardAgentWallet, {
        props: {
          totalWallet: '100,000.00',
          usedAmount: '20,000.00'
        },
        global: globalMocks
      })
      
      const progress = wrapper.findComponent({ name: 'ElProgress' })
      expect(progress.exists()).toBe(true)
      expect(progress.props('percentage')).toBe(80)
      expect(progress.props('strokeWidth')).toBe(6)
      expect(progress.props('color')).toBe('#67C23A')
    })
  })

  it('ควรจะแสดงเวลาล่าสุดได้อย่างถูกต้อง', () => {
    const wrapper = mount(CardAgentWallet, { global: globalMocks })
    expect(wrapper.text()).toContain('2023-07-13 17:09')
  })
})
