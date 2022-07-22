<!-- 角色管理 -->
<template>
  <div class="role-manage">
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
          <el-form-item label="角色名称">
            <el-input
              v-model="searchBy.factor"
              placeholder="请输入"
              clearable
              maxlength="30" />
          </el-form-item>
          <el-form-item label="角色状态">
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

        </el-form>
      </template>
      <template v-slot:headerRight>
        <XW-button type="primary" @click="handleAdd">新增</XW-button>
        <XW-button type="primary">批量删除</XW-button>
      </template>
      <template v-slot:table>
        <el-table :data="tableData" stripe border height="100%">
          <el-table-column
            type="selection"
            width="60"
            align="center"></el-table-column>
          <el-table-column
            label="角色名称"
            prop="roleName"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            label="角色状态"
            prop="roleState"
            align="center"
            width="120"
            show-overflow-tooltip>
            <template #default="{ row }">
              {{ getRoleState(row.roleState) }}
            </template>
          </el-table-column>、
          <el-table-column
            label="排序号"
            prop="sortNumber"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="描述"
            prop="describe"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="operator"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="operatorTime"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            type="action"
            label="操作"
            width="300"
            align="center"
            fixed="right">
            <template #default="{ row }">
              <XW-button type="primary" size="small" @click="">禁用</XW-button>
              <XW-button type="primary" size="small" @click="handleEdit(row)">编辑</XW-button>
              <XW-button type="primary" size="small" @click="handleView(row)">查看</XW-button>
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
      @cancel="handleDialogCancel" >
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input
            v-model="dialogForm.roleName"
            clearable
            placeholder="请输入角色名称"
            :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="排序号：" prop="sortNumber">
          <el-input
            v-model="dialogForm.sortNumber"
            clearable
            placeholder="请输入排序号"
            :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="describe">
          <el-input
            v-model="dialogForm.describe"
            clearable
            placeholder="请输入角色描述内容"
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
          <div class="label">角色名称：</div>
          <div class="value">{{ dialogForm.roleName }}</div>
        </div>
        <div class="content__item">
          <div class="label">排序号：</div>
          <div class="value">{{ dialogForm.sortNumber }}</div>
        </div>
        <div class="content__item">
          <div class="label">描述：</div>
          <div class="value">{{ dialogForm.describe }}</div>
        </div>
        <div class="content__item">
          <div class="label">操作人：</div>
          <div class="value">{{ dialogForm.operator }}</div>
        </div>
        <div class="content__item">
          <div class="label">操作时间：</div>
          <div class="value">{{ dialogForm.operatorTime }}</div>
        </div>
      </div>
    </XW-dialog>
  </div>
</template>

<script>
export default {
  name: 'roleManage',
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
        roleName: '',
        riskType: '',
        riskDesc: '',
        factor: '',
        describe: '',
        sortNumber:'',
        operatorTime: ''
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
          roleName: '201皮带',
          roleState: '1',
          sortNumber: '1',
          describe: '描述内容',
          operator: '张三',
          operatorTime: '2021-12-05 00:00:00'
        },
        {
          id: 'test1002',
          roleName: '201皮带',
          roleState: '1',
          sortNumber: '1',
          describe: '描述内容',
          operator: '张三',
          operatorTime: '2021-12-05 00:00:00'
        },
        {
          id: 'test1003',
          roleName: '201皮带',
          roleState: '1',
          sortNumber: '1',
          describe: '描述内容',
          operator: '张三',
          operatorTime: '2021-12-05 00:00:00'
        },
        {
          id: 'test1004',
          roleName: '201皮带',
          roleState: '1',
          sortNumber: '1',
          describe: '描述内容',
          operator: '张三',
          operatorTime: '2021-12-05 00:00:00'
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
     * 根据角色状态获取展示的名称
     * @param roleState
     */
    getRoleState(roleState) {
      switch (roleState) {
        case '1':
          return '启用'
        case '2':
          return '禁用'
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
.role-manage {

}
</style>
