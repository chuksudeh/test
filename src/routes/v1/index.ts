import express from "express";
const router = express.Router();
import RestaurantRoute from "./restaurant.routes";

const defaultRoutes = [
  {
    path: "/restaurant",
    route: RestaurantRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
