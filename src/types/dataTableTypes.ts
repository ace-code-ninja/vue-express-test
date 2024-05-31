export type BusinessTableRowDataType = {
    key: number
    id: number
    name: string
    category_name: string
    campaign_num: number
    average_budget: number
}

export type CampaignTableRowDataType = {
    key: number
    id: number
    name: string
    budget: number
    createdAt: Date
    updatedAt: Date
}