export { default as Addbook } from '../..\\components\\addbook.vue'
export { default as Adddp } from '../..\\components\\adddp.vue'
export { default as Addmember } from '../..\\components\\addmember.vue'
export { default as Addorder } from '../..\\components\\addorder.vue'
export { default as Deliveryreq } from '../..\\components\\deliveryreq.vue'
export { default as Dprequest } from '../..\\components\\dprequest.vue'
export { default as Navbar } from '../..\\components\\navbar.vue'
export { default as Sidebar } from '../..\\components\\sidebar.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
