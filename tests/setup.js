import { config } from '@vue/test-utils'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'

config.global.plugins = []
config.global.stubs = {
  'font-awesome-icon': true,
  'router-link': true,
  'router-view': true
}

afterEach(() => {
  cleanup()
})

expect.extend({
  toBeInTheDocument: require('@testing-library/jest-dom/matchers').toBeInTheDocument,
  toBeVisible: require('@testing-library/jest-dom/matchers').toBeVisible
})
