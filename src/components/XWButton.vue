<!-- 公共按钮 -->
<template>
  <el-button
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'XWButton',
  mixins: [],
  components: {},
  props: {
    type: {
      type: String,
      validate: type => {
        return ['primary', 'success', 'warning', 'danger', 'info', 'text'].includes(type)
      }
    },
    size: {
      size: String,
      validate: size => {
        return ['medium', 'small', 'mini'].includes(size)
      },
      default: 'medium'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>
