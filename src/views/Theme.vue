<template>
  <div>
    <h3> this is theme display page</h3>
    <div style="margin: 20px">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <div style="margin: 20px">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </div>

    <div style="margin: 20px">
      <el-button round>圆形按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </div>

    <div style="margin: 20px">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
    </div>

    <div style="margin: 20px">
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
    </div>

    <div style="margin: 20px">
        <el-alert
          title="成功提示的文案"
          type="success">
        </el-alert>
        <el-alert
          title="消息提示的文案"
          type="info">
        </el-alert>
        <el-alert
          title="警告提示的文案"
          type="warning">
        </el-alert>
        <el-alert
          title="错误提示的文案"
          type="error">
        </el-alert>
    </div>

    <div style="margin: 20px">
      <el-steps :active="1" simple>
        <el-step title="步骤 1" icon="el-icon-edit"></el-step>
        <el-step title="步骤 2" icon="el-icon-upload"></el-step>
        <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      </el-steps>

      <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
        <el-step title="步骤 1" ></el-step>
        <el-step title="步骤 2" ></el-step>
        <el-step title="步骤 3" ></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'theme'
  }
</script>

<style scoped>

</style>
