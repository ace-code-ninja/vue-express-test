<script setup lang="ts">
    import Loading from "../../components/Loading.vue";
    import { DataTableController } from "../../api/controllers";
    import { CampaignDataTableSchema } from "@/schemas/DataTableScema";

    const route = useRoute();
    const isLoading = ref<boolean>(true);
    const currentBusiness = ref<any>({});
    const campaigns = ref<any[]>([]);
    const tableData = ref<any[]>([]);
    const dataTableInstRef = ref(null);
    const inputValue = ref<string>("");
    const pagination = ref({ pageSize: 5 });
    const currentBusinessId = computed(() => route.params.businessId);

    async function getBusinessDataById(id: string) {
        const currentBusinessData = await DataTableController.getBusinessDataById(parseInt(id));
        currentBusiness.value = currentBusinessData;
        campaigns.value = currentBusinessData.campaigns;
        tableData.value = currentBusinessData.campaigns;
        isLoading.value = false;
    }

    watchEffect(() => {
        getBusinessDataById(currentBusinessId.value as string)
    });

    watchEffect(() => {
        if (inputValue.value.length > 0) {
            const filtered = campaigns.value.filter(item => item.name.toLowerCase().includes(inputValue.value));
            tableData.value = filtered;
        } else {
            tableData.value = campaigns.value;
        }
    });
</script>

<template>
    <Loading :isLoading="isLoading" />
    <div class="cardContainer">
        <n-space vertical :size="'large'">
            <n-card
                :title="currentBusiness.name"
                :segmented="{
                    content: true,
                    footer: 'soft'
                }"
            >
                <div class="details">Category Name: 
                    <span :style="{ marginLeft: '20px', fontWeight: 400 }">{{ currentBusiness.category_name }}</span>
                </div>
                <div class="details">Average Budget: 
                    <span :style="{ marginLeft: '20px', fontWeight: 400}">{{ `$${currentBusiness.average_budget}` }}</span>
                </div>
                <div class="details">Campaign Number: 
                    <span :style="{ marginLeft: '20px', fontWeight: 400}">{{ currentBusiness.campaign_num }}</span>
                </div>
            </n-card>
            <n-input-group>
                <n-input :style="{ width: '50%' }" v-model:value="inputValue"  />
                <n-button type="primary" ghost>
                    Search
                </n-button> 
            </n-input-group>
            <n-data-table
                ref="dataTableInstRef"
                :columns="CampaignDataTableSchema"
                :data="tableData"
                :pagination="pagination"
                :size="'large'"
            />
        </n-space>
    </div>
</template>

<style scoped>
    .cardContainer {
        width: 100%;
        height: 100vh;
        padding: 2rem;
    }
    .n-card {
        min-width: 600px;
    }     
    .details {
        font-size: 14px;
        font-weight: 500;
        padding-bottom: 10px;
    }
</style>

<route lang="yaml">
    name: "profile.businessItem"
</route>