<!-- 公共弹窗 -->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :before-close="beforeClose"
    custom-class="xw-dialog"
    append-to-body
    :close-on-click-modal="false"
    @open="$emit('oepn')"
    @opend="$emit('opend')"
    @close="$emit('close')"
    @closed="onClosed">
    <slot></slot>
    <span slot="footer" class="dialog-footer" v-if="showFooter">
      <slot name="footer">
        <XW-button type="primary" :loading="loading" @click="handleConfirm">确认</XW-button>
        <XW-button @click="handleCancel">取消</XW-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ADCDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    beforeClose: {
      type: Function,
      default: done => {
        done()
      }
    },
    width: {
      type: String,
      default: '30%'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    // save loading
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    },

    handleConfirm() {
      this.$emit('confirm')
    },

    onClosed() {
      this.$emit('closed')
      this.$emit('cancel')
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        this.dialogVisible = val
      }
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    }
  }
}
</script>

<style lang="scss">
.xw-dialog {
  .el-dialog__header {
    border-bottom: 1px solid $borderColor;
    padding: 10px 20px;
    .el-dialog__title {
      font-size: 16px;
      color: #000;
    }
    .el-dialog__headerbtn {
      top: 10px;
    }
  }
  .el-select {
    width: 100%;
  }
  .el-dialog__footer {
    .adc-button {
      padding: 0;
      min-width: 60px;
      height: 33px;
      line-height: 33px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }
  .content-wrap {
    .content__item {
      display: flex;
      font-size: 16px;
      margin-bottom: 10px;
      border-bottom: 1px dashed #dadada;
      padding: 5px 10px 10px 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .label {
        margin-right: 20px;
        color: #999;
      }
      .value {
        flex: 1;
      }
    }
  }
}
</style>
