<!-- 风险管理-风险辨识清单 -->
<template>
  <div class="idenList">
    <TableContainer
      :config="searchBy"
      @search="handleSearch"
      @reset="handleReset">
      <template v-slot:headerLeft>
        <el-form
          class="law-form"
          :model="searchBy"
          inline
          @submit.native.prevent
          @keyup.native.enter="handleSearch">
          <el-form-item label="风险类型">
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
        </el-form>
      </template>
      <template v-slot:headerRight>
        <Law-button type="primary" @click="seniorSearch">高级检索</Law-button>
        <Law-button type="primary" @click="handleAdd">新增</Law-button>
        <Law-button type="primary">模板下载</Law-button>
        <Law-button type="primary">导入</Law-button>
        <Law-button type="primary">启用</Law-button>
        <Law-button type="primary">导出</Law-button>
      </template>
      <template v-slot:table>
        <el-table class="law-table" :data="tableData" stripe border height="100%">
          <el-table-column
            type="selection"
            width="60"
            align="center"></el-table-column>
          <el-table-column
            label="风险类型"
            prop="riskDesc"
            align="center"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="风险点"
            prop="riskType"
            align="center">
            <template #default="{ row }">
              {{ getRiskTypeShowName(row.riskType) }}
            </template>
          </el-table-column>
          <el-table-column
            label="风险描述"
            prop="riskDescribe"
            align="center"
            width="200"
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
            label="风险状态"
            prop="riskState"
            align="center">
            <template #default="{ row }">
              {{ getRiskStateShowName(row.riskState) }}
            </template>
          </el-table-column>
          <el-table-column
            label="危害因素"
            prop="factor"
            align="center"
            width="250">
          </el-table-column>
          <el-table-column
            label="管控措施"
            prop="measures"
            align="center"
            width="250">
          </el-table-column>
          <el-table-column
            label="评估日期"
            prop="assessmentTime"
            align="center"
            width="150">
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
            label="管控周期"
            prop="controlCycle"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            type="action"
            label="操作"
            width="300"
            align="center"
            fixed="right">
            <template #default="{ row }">
              <Law-button type="primary" size="small" @click="">启用</Law-button>
              <Law-button type="primary" size="small" @click="handleEdit(row)">编辑</Law-button>
              <Law-button type="primary" size="small" @click="handleView(row)">查看</Law-button>
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


    <!-- 新增 -->
    <LawDialog
      title="新增"
      :visible.sync="visible.dialogAddVisible"
      :loading="loading.saving"
      @confirm="handleDialogConfirm"
      @cancel="handleDialogCancel">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules">
        <el-form-item label="风险类型：" prop="riskType">
          <el-input
            v-model="dialogForm.riskType"
            clearable
            placeholder="请输入风险类型"
            :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="危害因素：" prop="factor">
          <el-input
            v-model="dialogForm.factor"
            clearable
            placeholder="请输入危害因素"
            :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="风险描述：" prop="riskDescribe">
          <el-input
            v-model="dialogForm.riskDescribe"
            clearable
            placeholder="请输入风险描述"
            :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="风险等级：" prop="riskLevel">
          <el-input
            v-model="dialogForm.riskLevel"
            clearable
            placeholder="请输入风险等级"
            :maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="">暂存</el-button>
        <el-button type="primary" @click="nextClick()">下一步</el-button>
      </div>
    </LawDialog>

    <!--  高级检索  -->
    <LawDialog
      width="50%"
      title="高级检索"
      :visible.sync="visible.dialogSeniorSearchVisible"
      :loading="loading.saving">

    </LawDialog>
    <!-- 编辑/查看 -->
    <LawDialog
      width="50%"
      :title="dialogTitle"
      :visible.sync="visible.dialogVisible"
      :loading="loading.saving"
      @confirm="handleDialogConfirm"
      @cancel="handleDialogCancel">
      <el-form :model="dialogFormEdit">
        <div class="content-wrap" style="">
          <div class="content__item">
            <div class="label">风险类型：</div>
            <div class="value">{{ getRiskTypeShowName(dialogForm.riskType) }}</div>
            <div class="label">风险等级：</div>
            <div class="value">{{ getRiskLevelShowName(dialogForm.riskLevel) }}</div>
          </div>
        </div>
        <div class="content-wrap" style="">
          <div class="content__item">
            <div class="label">风险描述：</div>
            <div class="value">{{ dialogForm.riskDescribe }}</div>
          </div>
        </div>
        <div class="content-wrap" style="">
          <div class="content__item">
            <div class="label">危害因素：</div>
            <div class="value">{{ dialogForm.factor }}</div>
          </div>
        </div>
        <div class="content-wrap" style="">
          <div class="content__item">
            <div class="label">
              风险点：
            </div>
            <div class="value">
              <el-input style="width: 50%" v-model="dialogFormEdit.riskType"></el-input>
            </div>
            <div class="label">
              具体位置：
            </div>
            <div class="value">
              <el-button size="small" type="primary" style="width: 150px">点击上传</el-button>
            </div>
          </div>
        </div>
        <div class="content-wrap" >
          <div class="content__item" style="line-height: 70px;height: 70px">
            <div class="label">
              管控周期：
              <el-radio-group v-model="radio">
              <el-radio label="1">固定提醒时间</el-radio>
              <el-radio label="2">固定时间段</el-radio>
              <el-radio label="3">每月</el-radio>
              <el-radio label="4">每周</el-radio>
              </el-radio-group>
            </div>
            <div class="value">
              有效时间：
              <el-input style="width: 20px" v-model="dialogFormEdit.effectiveTime"></el-input>
              <el-radio-group v-model="radio1">
              <el-radio-button  label="1" style="margin-left: 30px">日</el-radio-button>
              <el-radio-button  label="2">周</el-radio-button>
              <el-radio-button  label="3">月</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="content-wrap"  >
          <div class="content__item" style="line-height: 70px;height: 70px">
            <div class="label">
              生效日期：
            </div>
            <div class="value">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="value">
              负责角色：
              <el-input style="width: 100px" v-model="dialogFormEdit.responsible"></el-input>
            </div>
            <div class="value">
              负责人：
              <el-input style="width: 100px" v-model="dialogFormEdit.responsiblePerson"></el-input>
            </div>
          </div>
        </div>
        <div class="content-wrap"  >
          <div class="content__item" style="line-height: 70px;height: 70px">
            <div class="label">
              管控措施：
              <el-input style="width: 200px" v-model="dialogFormEdit.measures"></el-input>
            </div>
          </div>
        </div>
      </el-form>
    </LawDialog>

  </div>
</template>

<script>
export default {
  name: 'idenList',
  mixins: [],
  components: {},
  data() {
    return {
      input: '',
      radio: '1',
      radio1: '日',
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
        factor: '',
        riskDescribe: '',
        riskLevel: ''
      },
      dialogFormEdit:{
        riskType: '',
        effectiveTime: '',
        responsible: '',
        responsiblePerson: '',
        measures: ''
      },
      visible: {
        // 编辑/查看弹窗是否可见
        dialogVisible: false,
        dialogAddVisible: false,
        // 高级检索弹窗是否可见
        dialogSeniorSearchVisible: false
      },
      loading: {
        saving: false
      },
      // 是否为编辑状态
      isEdit: false,
      dialogFormRules: {
        riskType: [{ required: true, message: '风险类型不能为空', trigger: 'blur' }],
        riskDescribe: [{ required: true, message: '风险描述不能为空', trigger: 'blur' }],
        factor: [{ required: true, message: '危害因素不能为空', trigger: 'blur' }],
        riskLevel: [{ required: true, message: '风险不能为空', trigger: 'blur' }]
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
     * 获取风险辨识清单列表数据
     */
    fetchData() {
      this.tableData = [
        {
          id: 'test1001',
          riskType: '1',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          riskState: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
          assessmentTime: '2021-11-28',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          controlCycle: '2021-12'
        },
        {
          id: 'test1002',
          riskType: '1',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          riskState: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
          assessmentTime: '2021-11-28',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          controlCycle: '2021-12'
        },
        {
          id: 'test1003',
          riskType: '1',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          riskState: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
          assessmentTime: '2021-11-28',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          controlCycle: '2021-12'
        },
        {
          id: 'test1004',
          riskType: '1',
          riskDesc: '201皮带、204原煤转载皮带、205刮板',
          riskDescribe: '生产运行过程中存在煤气超限，电缆线路过载、高温等都可引发自然发火风险',
          riskLevel: '1',
          riskState: '1',
          factor: '现场无防尘、无降尘、抑尘安全设置或损坏不能正常使用，造成煤尘堆积，遇到明火',
          measures: '安装防尘、降尘、抑尘安全措施，有损坏的及时进行维修或更换',
          assessmentTime: '2021-11-28',
          responsible: '201皮带',
          responsiblePerson: '孙健',
          controlCycle: '2021-12'
        }
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
     * 根据风险状态获取展示的名称
     * @param riskLevel
     */
    getRiskStateShowName(riskState) {
      switch (riskState) {
        case '1':
          return '未启用'
        case '2':
          return '启用'
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
      this.visible.dialogAddVisible = true
      this.dialogForm = ''
    },
    /**
     * 打开高级检索弹窗
     */
    seniorSearch(){

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
      this.visible.dialogVisible = true
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
      return this.isEdit ? '风险管控' : '查看'
    }
  },
  watch: {},
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.idenList {

}
.el-input{
  position: relative;
  font-size: 14px;
  display: inline-block
}
</style>
