<!-- 风险管理-风险台账 -->
<template>
  <div class="account">
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
          <el-form-item label="风险点">
            <el-input
              v-model="searchBy.riskType"
              placeholder="请输入"
              clearable
              maxlength="30" />
          </el-form-item>
          <el-form-item label="排查状态">
            <el-select
              style="width: 150px"
              v-model="searchBy.troubleShootingStatus"
              placeholder="请选择"
              clearable
              maxlength="30">
              <el-option
                v-for="item in troubleShootingStatusOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排查结果">
            <el-select
              style="width: 150px"
              v-model="searchBy.troubleShootingRuslt"
              placeholder="请选择"
              clearable
              maxlength="30">
              <el-option
                v-for="item in troubleShootingRusltOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input
              v-model="searchBy.responsiblePerson"
              placeholder="请输入"
              clearable
              maxlength="30" />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:headerRight>
        <XW-button type="primary">导出</XW-button>
      </template>
      <template v-slot:table>
        <el-table :data="tableData" stripe border height="100%">
          <el-table-column
            type="selection"
            width="60"
            align="center"></el-table-column>
          <el-table-column
            label="风险点"
            prop="riskDesc"
            width="200"
            align="center">
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
            label="排查状态"
            prop="troubleShootingStatus"
            align="center">
            <template #default="{ row }">
              {{ getTroubleshootingStatus(row.troubleShootingStatus) }}
            </template>
          </el-table-column>
          <el-table-column
            label="排查结果"
            prop="troubleShootingRuslt"
            align="center">
            <template #default="{ row }">
              {{ getTroubleShootingRuslt(row.troubleShootingRuslt) }}
            </template>
          </el-table-column>
          <el-table-column
            label="排查日期"
            prop="troubleShootingTime"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="负责角色"
            prop="responsible"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            label="负责人"
            prop="responsiblePerson"
            align="center">
          </el-table-column>
          <el-table-column
            label="风险描述"
            prop="riskDescribe"
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
            label="管控措施"
            prop="measures"
            align="center"
            width="250">
          </el-table-column>
          <el-table-column
            type="action"
            label="操作"
            width="230"
            align="center"
            fixed="right">
            <template #default="{ row }">
              <XW-button type="primary" size="small" @click="handleShow(row)">详情</XW-button>
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

    <!-- 详情 -->
    <XW-dialog
      width="50%"
      title="排查结果"
      :visible.sync="visible.viewData"
      :show-footer="false">
      <div class="content-wrap">
        <div class="content__item">
          <div class="label">风险类型：</div>
          <div class="value">{{ getRiskTypeShowName(dialogForm.riskType) }}</div>
        </div>
        <div class="content__item">
          <div class="label">风险等级：</div>
          <div class="value">{{ getRiskLevelShowName(dialogForm.riskLevel) }}</div>
        </div>
        <div class="content__item">
          <div class="label">风险点：</div>
          <div class="value">{{ dialogForm.riskDesc }}</div>
          <div class="label">具体位置：</div>
          <div class="value">
            <el-button size="small" type="primary" style="width: 150px">查看已上传图片</el-button>
          </div>
        </div>
        <div class="content__item">
          <div class="label">危害因素：</div>
          <div class="value">{{ dialogForm.factor }}</div>
        </div>
        <div class="content__item">
          <div class="label">管控措施：</div>
          <div class="value">{{ dialogForm.measures }}</div>
        </div>
        <div class="content__item">
          <div class="label">备注：</div>
          <div class="value">
            <el-input
              v-model="dialogShow.remarks"
              clearable
              type="textarea"
              :placeholder='dialogForm.measures'
              :maxlength="100"></el-input>
          </div>
        </div>
        <div class="content__item">
          <div class="label">上传图片：</div>
          <div class="value">
            <el-button size="small" type="primary" style="width: 150px">查看已上传图片</el-button>
          </div>
        </div>
        <div class="content__item">
          <div class="label">上传视频：</div>
          <div class="value">
            <el-button size="small" type="primary" style="width: 150px">查看已上传视频</el-button>
          </div>
        </div>
      </div>
    </XW-dialog>
  </div>
</template>

<script>
export default {
  name: 'account',
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
        troubleShootingStatus: '',
        troubleShootingRuslt:'',
        responsiblePerson: ''
      },
      tableData: [],
      dialogForm: {
        riskType: '',
        riskDesc: '',
        factor: '',
        riskLevel: '',
        measures: ''
      },
      dialogShow: {
        remarks: ''
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
      ],
      troubleShootingStatusOption: [
        {
          label: '已排查',
          value: '1'
        },
        {
          label: '未排查',
          value: '2'
        }
      ],
      troubleShootingRusltOption: [
        {
          label: '已上报',
          value: '1'
        },
        {
          label: '无隐患',
          value: '2'
        }
      ]
    }
  },
  methods: {
    /**
     * 获取风险台账列表数据
     */
    fetchData() {
      this.tableData = [
        {
          id: 'test1001',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          troubleShootingStatus: '1',
          troubleShootingRuslt: '1',
          troubleShootingTime: '2021-10-25',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
        },
        {
          id: 'test1002',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          troubleShootingStatus: '1',
          troubleShootingRuslt: '1',
          troubleShootingTime: '2021-10-25',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
        },
        {
          id: 'test1003',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          troubleShootingStatus: '1',
          troubleShootingRuslt: '1',
          troubleShootingTime: '2021-10-25',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
        },
        {
          id: 'test1004',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskType: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          troubleShootingStatus: '1',
          troubleShootingRuslt: '1',
          troubleShootingTime: '2021-10-25',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
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
     * 根据排查状态获取展示的名称
     * @param troubleShootingStatus
     */
    getTroubleshootingStatus(troubleShootingStatus) {
      switch (troubleShootingStatus) {
        case '1':
          return '已排查'
        case '2':
          return '未排查'
      }
    },

    /**
     * 根据排查状态获取展示的名称
     * @param troubleShootingStatus
     */
    getTroubleShootingRuslt(troubleShootingRuslt) {
      switch (troubleShootingRuslt) {
        case '1':
          return '已上报'
        case '2':
          return '无隐患'
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
     * 详情
     * @param row
     */
    handleShow(row) {
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
.account {

}
</style>
