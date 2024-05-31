<script setup lang="ts">
  import Loading from "../components/Loading.vue";
  import type { DataTableRowKey } from 'naive-ui';
  import { DataTableController } from "@/api/controllers";
  import { BusinessTableRowDataType } from "@/types/dataTableTypes";
  import { BusinessDataTableSchema } from "@/schemas/DataTableScema";

  const isLoading = ref<boolean>(true);
  const businesses = ref<any[]>([]);
  const tableData = ref<any[]>([]);
  const dataTableInstRef = ref(null);
  const inputValue = ref<string>("");
  const pagination = ref({ pageSize: 10 });
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);

  const rowKey = (row: BusinessTableRowDataType) => row.name;
  
  function handleCheck (rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys;
  }

  async function getAllBusinesses() {
    const businessData = await DataTableController.getAllBusinessData();
    tableData.value = businessData;
    businesses.value = businessData;
    isLoading.value = false;
  }

  onMounted(() => {
    getAllBusinesses();
  });

  watchEffect(() => {
    if (inputValue.value.length > 0) {
      const filtered = businesses.value.filter(item => item.name.toLowerCase().includes(inputValue.value));
      tableData.value = filtered;
    } else {
      tableData.value = businesses.value;
    }
  });
</script>

<template>
  <Loading :isLoading="isLoading" />
  <div class="tableContainer">
    <n-space vertical :size="'large'">
      <n-input-group>
        <n-input :style="{ width: '50%' }" v-model:value="inputValue"  />
        <n-button type="primary" ghost>
          Search
        </n-button> 
      </n-input-group>
      <n-data-table
        ref="dataTableInstRef"
        :columns="BusinessDataTableSchema"
        :data="tableData"
        :row-key="rowKey"
        :pagination="pagination"
        :size="'large'"
        @update:checked-row-keys="handleCheck"
      />
    </n-space>
  </div>
</template>

<style scoped>
.tableContainer {
  height: 100vh;
  padding: 2rem;
}
.n-data-table {
  min-width: 1000px;
}
</style>

<route lang="yaml">
  name: "home"
</route>
