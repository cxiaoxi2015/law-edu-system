<!-- 风险汇总-风险预警 -->
<template>
  <div class="early-warning">
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
          <el-form-item label="预警厂">
            <el-select
              v-model="searchBy.riskType"
              placeholder="请选择"
              clearable
              maxlength="30">
              <el-option
                v-for="item in riskTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风险点">
            <el-input
              v-model="searchBy.factor"
              placeholder="请输入"
              clearable
              maxlength="30" />
          </el-form-item>
          <el-form-item label="排查人">
            <el-input
              v-model="searchBy.factor"
              placeholder="请输入"
              clearable
              maxlength="30" />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:headerRight>
        <Law-button type="primary">导出</Law-button>
      </template>
      <template v-slot:table>
        <el-table :data="tableData" stripe border height="100%">
          <el-table-column
            type="selection"
            width="60"
            align="center"></el-table-column>
          <el-table-column
            label="预警厂"
            prop="factory"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            label="风险点"
            prop="riskDesc"
            align="center"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="查阅状态"
            prop="consultState"
            align="center"
            show-overflow-tooltip>
            <template #default="{ row }">
              {{ getConsultState(row.consultState) }}
            </template>
          </el-table-column>
          <el-table-column
            label="风险类型"
            prop="riskType"
            align="center"
            show-overflow-tooltip>
            <template #default="{ row }">
              {{ getRiskTypeShowName(row.riskType) }}
            </template>
          </el-table-column>
          <el-table-column
            label="危害因素"
            prop="factor"
            align="center"
            width="250"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="风险等级"
            prop="riskLevel"
            align="center">
            <template #default="{ row }">
              {{ getRiskLevelShowName(row.riskLevel) }}
            </template>
          </el-table-column>
          <el-table-column
            label="排查人"
            prop="investigationPerson"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="日期"
            prop="time"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            type="action"
            label="操作"
            width="200"
            align="center"
            fixed="right">
            <template #default="{ row }">
              <Law-button type="primary" size="small" @click="">已查阅</Law-button>
              <Law-button type="primary" size="small" @click="handleDelete(row)">删除</Law-button>
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
    <Law-dialog
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
    </Law-dialog>

    <!-- 查看 -->
    <Law-dialog
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
    </Law-dialog>
  </div>
</template>

<script>
export default {
  name: 'earlyWarning',
  mixins: [],
  components: {},
  data() {
    return {
      total: 4,
      searchBy: {
        page: 1,
        pageSize: 10,
        riskType: '',
        factor: ''
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
      riskTypeOptions: [
        {
          label: '火灾',
          value: '1'
        },
        {
          label: '煤尘爆炸',
          value: '2'
        },
        {
          label: '触电',
          value: '3'
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
          factory: '沙章图洗煤厂',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          consultState: '1',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          riskLevel: '1',
          investigationPerson: '201皮带',
          time: '20201-10-25'
        },
        {
          id: 'test1002',
          factory: '沙章图洗煤厂',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          consultState: '1',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          riskLevel: '1',
          investigationPerson: '201皮带',
          time: '20201-10-25'
        },
        {
          id: 'test1003',
          factory: '沙章图洗煤厂',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          consultState: '1',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          riskLevel: '1',
          investigationPerson: '201皮带',
          time: '20201-10-25'
        },
        {
          id: 'test1004',
          factory: '沙章图洗煤厂',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          consultState: '1',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          riskLevel: '1',
          investigationPerson: '201皮带',
          time: '20201-10-25'
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
     * 根据查阅状态获取展示的名称
     * @param consultState
     */
    getConsultState(consultState) {
      switch (consultState) {
        case '1':
          return '未查阅'
        case '2':
          return '已查阅'
      }
    },

    /**
     * 根据风险等级获取展示的名称
     * @param riskLevel
     */
    getRiskLevelShowName(riskLevel) {
      switch (riskLevel) {
        case '1':
          return '较大'
        case '2':
          return '一般'
        case '3':
          return '低'
        case '4':
          return '重大'
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
      this.dialogForm = ''
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
.early-warning {

}
</style>
