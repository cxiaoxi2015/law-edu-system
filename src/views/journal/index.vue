<!-- 日志管理 -->
<template>
  <div class="journal">
    <TableContainer
      :config="searchBy"
      @search="handleSearch"
      @reset="handleReset">
      <template v-slot:headerLeft>
        <el-form
          :model="searchBy"
          inline
          @submit.native.prevent
          @keyup.native.enter="handleSearch">
          <el-form-item label="操作类型">
            <el-select
              v-model="searchBy.operationType"
              placeholder="请选择"
              clearable
              maxlength="30">
              <el-option
                v-for="item in operationTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作人员">
            <el-input
              v-model="searchBy.factor"
              placeholder="请输入"
              clearable
              maxlength="30" />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:headerRight>
        <XW-button type="primary">批量删除</XW-button>
      </template>
      <template v-slot:table>
        <el-table :data="tableData" stripe border height="100%">
          <el-table-column
            type="selection"
            width="60"
            align="center"></el-table-column>
          <el-table-column
            label="操作类型"
            prop="riskType"
            width="120"
            align="center">
            <template #default="{ row }">
              {{ getOperationType(row.operationType) }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作内容"
            prop="operationDesc"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作人员"
            prop="operationPerson"
            align="center"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="operationTime"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            type="action"
            label="操作"
            width="230"
            align="center">
            <template #default="{ row }">
              <XW-button type="primary" size="small" @click="handleDelete(row)">删除</XW-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-slot:pagination>
        <Pagination
          :page="searchBy.page"
          :pageSize="searchBy.pageSize"
          :total="total"
          @pageChange="handlePageChange"
          @pageSizeChange="handlePageSizeChange"
        />
      </template>
    </TableContainer>

    <!-- 新增/编辑 -->
    <XW-dialog
      :title="dialogTitle"
      :visible.sync="visible.dialogVisible"
      :loading="loading.saving"
      @confirm="handleDialogConfirm"
      @cancel="handleDialogCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules">
        <el-form-item label="风险类型：" prop="riskType">
          <el-select
            v-model="dialogForm.riskType"
            clearable
            placeholder="请选择风险类型">
            <el-option
              v-for="item in riskTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="风险描述：" prop="riskDesc">
          <el-input
            v-model="dialogForm.riskDesc"
            clearable
            placeholder="请输入风险描述"
            type="textarea"
            :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="危害因素：" prop="factor">
          <el-input
            v-model="dialogForm.factor"
            clearable
            placeholder="请输入危害因素"
            type="textarea"
            :maxlength="100"></el-input>
        </el-form-item>
      </el-form>
    </XW-dialog>

    <!-- 查看 -->
    <XW-dialog
      title="查看"
      :visible.sync="visible.viewData"
      :show-footer="false">
      <div class="content-wrap">
        <div class="content__item">
          <div class="label">风险类型：</div>
          <div class="value">{{ getRiskTypeShowName(dialogForm.riskType) }}</div>
        </div>
        <div class="content__item">
          <div class="label">创建时间：</div>
          <div class="value">{{ dialogForm.creationTime }}</div>
        </div>
        <div class="content__item">
          <div class="label">风险描述：</div>
          <div class="value">{{ dialogForm.riskDesc }}</div>
        </div>
        <div class="content__item">
          <div class="label">危害因素：</div>
          <div class="value">{{ dialogForm.factor }}</div>
        </div>
      </div>
    </XW-dialog>
  </div>
</template>

<script>
export default {
  name: 'Journal',
  mixins: [],
  components: {},
  data() {
    return {
      total: 4,
      searchBy: {
        page: 1,
        pageSize: 10,
        riskType: '',
        factor: '',
        operationType: ''
      },
      tableData: [],
      dialogForm: {
        riskType: '',
        riskDesc: '',
        factor: ''
      },
      visible: {
        // 新增/编辑弹窗是否可见
        dialogVisible: false,
        // 查看弹窗是否可见
        viewData: false
      },
      loading: {
        saving: false
      },
      // 是否为编辑状态
      isEdit: false,
      dialogFormRules: {
        riskType: [{ required: true, message: '风险类型不能为空', trigger: 'blur' }],
        riskDesc: [{ required: true, message: '风险描述不能为空', trigger: 'blur' }],
        factor: [{ required: true, message: '危害因素不能为空', trigger: 'blur' }]
      },
      operationTypeOption: [
        {
          label: '数据填报',
          value: '1'
        },
        {
          label: '风险管控',
          value: '2'
        },
        {
          label: '数据更新',
          value: '3'
        },
        {
          label: '报表导出',
          value: '4'
        },
        {
          label: '数据归档',
          value: '5'
        }
      ]
    }
  },
  methods: {
    /**
     * 获取风险库列表数据
     */
    fetchData() {
      this.tableData = [
        {
          id: 'test1001',
          operationType: '1',
          operationDesc: '张三新增了xx风险xx危害因素',
          operationPerson: '张三',
          operationTime: '2021-12-25 00:00:00'
        },
        {
          id: 'test1002',
          operationType: '1',
          operationDesc: '张三新增了xx风险xx危害因素',
          operationPerson: '张三',
          operationTime: '2021-12-25 00:00:00'
        },
        {
          id: 'test1003',
          operationType: '1',
          operationDesc: '张三新增了xx风险xx危害因素',
          operationPerson: '张三',
          operationTime: '2021-12-25 00:00:00'
        },
        {
          id: 'test1004',
          operationType: '1',
          operationDesc: '张三新增了xx风险xx危害因素',
          operationPerson: '张三',
          operationTime: '2021-12-25 00:00:00'
        },

      ]
    },

    /**
     * 条件查询
     */
    handleSearch() {
      this.searchBy.page = 1;
      this.fetchData()
    },

    /**
     * 查询条件重置
     */
    handleReset() {
      this.searchBy = {
        page: 1,
        pageSize: 10,
        riskType: '',
        factor: ''
      }
      this.fetchData()
    },

    /**
     * 根据风险类型获取展示的名称
     * @param riskType
     */
    getRiskTypeShowName(riskType) {
      switch (riskType) {
        case '1':
          return '火灾'
        case '2':
          return '煤尘爆炸'
        case '3':
          return '触电'
      }
    },
    /**
     * 根据操作类型获取展示的名称
     * @param operationType
     */
    getOperationType(operationType) {
      switch (operationType) {
        case '1':
          return '数据填报'
        case '2':
          return '风险辨识'
        case '3':
          return '数据更新'
        case '4':
          return '报表导出'
      }
    },

    /**
     * 页码改变
     * @param page
     */
    handlePageChange(page) {
      this.searchBy.page = page
      this.fetchData()
    },

    /**
     * 每页展示条目数改变
     * @param pageSize
     */
    handlePageSizeChange(pageSize) {
      this.searchBy.page = 1
      this.searchBy.pageSize = pageSize
      this.fetchData()
    },

    /**
     * 新增/编辑保存
     */
    handleDialogConfirm() {},

    /**
     * 新增/编辑取消
     */
    handleDialogCancel() {
      this.isEdit = false;
      this.$clearForm('dialogForm')
    },

    /**
     * 打开新增弹窗
     */
    handleAdd() {
      this.visible.dialogVisible = true
      console.log('打开新增弹窗')
    },

    /**
     * 打开编辑弹窗
     * @param row
     */
    handleEdit(row) {
      this.isEdit = true
      this.dialogForm = {
        ...this.dialogForm,
        ...row
      }
      this.visible.dialogVisible = true
    },

    /**
     * 查看
     * @param row
     */
    handleView(row) {
      this.dialogForm = {
        ...row
      }
      this.visible.viewData = true
    },

    /**
     * 删除
     * @param row
     */
    handleDelete(row) {
      this.$confirm('您是否确认删除该数据?', '确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
      }).catch(e => {})
    }
  },
  computed: {
    dialogTitle() {
      return this.isEdit ? '编辑' : '新增'
    }
  },
  watch: {},
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.journal {

}
</style>
