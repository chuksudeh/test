import express from "express";
import { RestaurantController } from "../../controllers";
const router = express.Router();

router.get("/", RestaurantController.getAllRestaurants);
router.post("/", RestaurantController.createRestaurants);
router.get("/:id", RestaurantController.getOneRestaurant);

export default router;
