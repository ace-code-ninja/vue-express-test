import { ApiInstance } from "../instance";

export const DataTableController = {
    getAllBusinessData: () => ApiInstance.get("/getAllBusinessData").then((res) => res.data),
    getBusinessDataById: (id: number) => ApiInstance.get(`/profile/${id}`).then((res) => res.data),
}