package com.dinebite.dinebite_backend.Repository;

import com.dinebite.dinebite_backend.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {

    // Get all cart items for a specific user
    List<CartItem> findByUserId(Long userId);

    // Find a specific product in a user's cart
    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    // Delete a specific product from a user's cart
    void deleteByUserIdAndProductId(Long userId, Long productId);

    // Delete all cart items for a user
    void deleteByUserId(Long userId);
}