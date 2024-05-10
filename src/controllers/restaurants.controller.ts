import { Request, Response } from "express";
import { RestaurantService } from "../services";
import { pool } from "../database/connect";
import { RestaurantSchema } from "../database";

export const createRestaurants = async (req: Request, res: Response) => {
  try {
    await pool.query(RestaurantSchema.restaurantSchema);
    const restaurant = await RestaurantService.createRestaurants(req.body);
    res.status(200).json({
      message: "success",
      data: restaurant.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An error occured", error);
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantService.getAllRestaurant();
    res.status(200).json({
      message: "success",
      data: restaurant.rows,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An error occured", error);
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getOneRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await RestaurantService.getOneRestaurant(req.params.id);
    res.status(200).json({
      message: "succces",
      data: restaurant.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An error occured", error);
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
