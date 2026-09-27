package com.dinebite.dinebite_backend.Repository;

import com.dinebite.dinebite_backend.Entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
}