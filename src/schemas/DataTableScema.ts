import dayjs from "dayjs";
import { RouterLink } from "vue-router";
import type { DataTableColumns } from "naive-ui";
import { BusinessTableRowDataType, CampaignTableRowDataType } from "@/types/dataTableTypes";

export const BusinessDataTableSchema: DataTableColumns<BusinessTableRowDataType> = [
    {
        type: "selection",
    },
    {
        title: "Business Name",
        key: "name",
        defaultSortOrder: false,
        sorter: "default",
        render (row: BusinessTableRowDataType) {
        return h(
            RouterLink,
            {
            to: {
                name: "profile.businessItem",
                params: {
                businessId: row.id
                }
            }
            },
            { default: () => row.name }
        )
        }
    },
    {
        title: "Category Name",
        key: "category_name",
        defaultSortOrder: false,
        sorter: "default"
    },
    {
        title: "Campaigns",
        key: "campaign_num",
        defaultSortOrder: false,
        sorter: {
        compare: (a: { campaign_num: number; }, b: { campaign_num: number; }) => 
            a.campaign_num - b.campaign_num,
            multiple: 3
        }
    },
    {
        title: "Average Campaign Budget($)",
        defaultSortOrder: false,
        key: "average_budget",
        sorter: {
        compare: (a: { average_budget: number; }, b: { average_budget: number; }) => 
            a.average_budget - b.average_budget,
            multiple: 1
        }
    }
];

export const CampaignDataTableSchema: DataTableColumns<CampaignTableRowDataType> = [
    {
        title: "Campaign Name",
        key: "name",
        defaultSortOrder: false,
        sorter: "default"
    },
    {
        title: "Budget($)",
        key: "budget",
        defaultSortOrder: false,
        sorter: {
            compare: (a: { budget: number; }, b: { budget: number; }) => a.budget - b.budget,
            multiple: 3
        },
    },
    {
        title: "Created Date",
        key: "createdAt",
        defaultSortOrder: false,
        sorter: "default",
        render: (row: CampaignTableRowDataType) => dayjs(row.createdAt).format("YYYY-MM-DD"),
    },
    {
        title: "Updated Date",
        key: "updatedAt",
        defaultSortOrder: false,
        sorter: "default",
        render: (row: CampaignTableRowDataType) => dayjs(row.updatedAt).format("YYYY-MM-DD"),
    }
]