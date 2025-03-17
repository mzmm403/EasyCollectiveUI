<script setup lang="ts">

</script>

<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <ec-tooltip
        class="box-item"
        content="Top Left prompts info"
        placement="top-start"
      >
        <ec-button>top-start</ec-button>
      </ec-tooltip>
      <ec-tooltip
        class="box-item"
        content="Top Center prompts info"
        placement="top"
      >
        <ec-button>top</ec-button>
      </ec-tooltip>
      <ec-tooltip
        class="box-item"
        content="Top Right prompts info"
        placement="top-end"
      >
        <ec-button>top-end</ec-button>
      </ec-tooltip>
    </div>
    <div class="row">
      <ec-tooltip
        class="box-item"
        content="Left Top prompts info"
        placement="left-start"
      >
        <ec-button>left-start</ec-button>
      </ec-tooltip>
      <ec-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <ec-button>right-start</ec-button>
      </ec-tooltip>
    </div>
    <div class="row">
      <ec-tooltip
        class="box-item"
        content="Left Center prompts info"
        placement="left"
      >
        <ec-button class="mt-3 mb-3">left</ec-button>
      </ec-tooltip>
      <ec-tooltip
        class="box-item"
        content="Right Center prompts info"
        placement="right"
      >
        <ec-button>right</ec-button>
      </ec-tooltip>
    </div>
    <div class="row">
      <ec-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <ec-button>left-end</ec-button>
      </ec-tooltip>
      <ec-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <ec-button>right-end</ec-button>
      </ec-tooltip>
    </div>
    <div class="row center">
      <ec-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <ec-button>bottom-start</ec-button>
      </ec-tooltip>
      <ec-tooltip
        class="box-item"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <ec-button>bottom</ec-button>
      </ec-tooltip>
      <ec-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <ec-button>bottom-end</ec-button>
      </ec-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>


