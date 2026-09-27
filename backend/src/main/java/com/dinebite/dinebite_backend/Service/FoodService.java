package com.dinebite.dinebite_backend.Service;

import com.dinebite.dinebite_backend.Entity.Food;
import com.dinebite.dinebite_backend.Repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // Get all foods
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // Get food by ID
    public Optional<Food> getFoodById(Long id) {
        return foodRepository.findById(id);
    }

    // Add food
    public Food addFood(Food food) {
        return foodRepository.save(food);
    }

    // Update food
    public Food updateFood(Long id, Food food) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        existingFood.setName(food.getName());
        existingFood.setDescription(food.getDescription());
        existingFood.setPrice(food.getPrice());
        existingFood.setCategory(food.getCategory());
        existingFood.setImageUrl(food.getImageUrl());
        existingFood.setStock(food.getStock());

        return foodRepository.save(existingFood);
    }

    // Delete food
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}