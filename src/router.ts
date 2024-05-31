import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    routes: generatedRoutes,
    history: createWebHistory(),
});

// router.afterEach(() => {
// });

export default router;