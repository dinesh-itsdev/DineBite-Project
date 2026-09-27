package com.dinebite.dinebite_backend.Service;

import com.dinebite.dinebite_backend.Entity.CartItem;
import com.dinebite.dinebite_backend.Entity.Food;
import com.dinebite.dinebite_backend.Entity.User;
import com.dinebite.dinebite_backend.Repository.CartRepository;
import com.dinebite.dinebite_backend.Repository.FoodRepository;
import com.dinebite.dinebite_backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final FoodRepository productRepository;

    public CartService(
            CartRepository cartRepository,
            UserRepository userRepository,
            FoodRepository productRepository) {

        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // =========================================
    // GET USER CART
    // =========================================

    public List<CartItem> getCart(Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + userId
                        )
                );

        return cartRepository.findByUserId(userId);
    }


    // =========================================
    // ADD PRODUCT TO CART
    // =========================================

    public CartItem addToCart(
            Long userId,
            Long productId,
            Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new RuntimeException(
                    "Quantity must be greater than 0"
            );
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + userId
                        )
                );

        Food product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Food not found with ID: " + productId
                        )
                );

        CartItem existingItem =
                cartRepository
                        .findByUserIdAndProductId(
                                userId,
                                productId
                        )
                        .orElse(null);

        // Product already exists in cart
        if (existingItem != null) {

            int newQuantity =
                    existingItem.getQuantity()
                            + quantity;

            existingItem.setQuantity(
                    newQuantity
            );

            return cartRepository.save(
                    existingItem
            );
        }

        // New cart item
        CartItem cartItem =
                new CartItem();

        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartRepository.save(
                cartItem
        );
    }


    // =========================================
    // UPDATE QUANTITY
    // =========================================

    public CartItem updateQuantity(
            Long userId,
            Long productId,
            Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new RuntimeException(
                    "Quantity must be greater than 0"
            );
        }

        CartItem cartItem =
                cartRepository
                        .findByUserIdAndProductId(
                                userId,
                                productId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cart item not found for user "
                                                + userId
                                                + " and product "
                                                + productId
                                )
                        );

        cartItem.setQuantity(
                quantity
        );

        return cartRepository.save(
                cartItem
        );
    }


    // =========================================
    // REMOVE PRODUCT FROM CART
    // =========================================

    public void removeFromCart(
            Long userId,
            Long productId) {

        CartItem cartItem =
                cartRepository
                        .findByUserIdAndProductId(
                                userId,
                                productId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cart item not found for user "
                                                + userId
                                                + " and product "
                                                + productId
                                )
                        );

        cartRepository.delete(
                cartItem
        );
    }


    // =========================================
    // CLEAR USER CART
    // =========================================

    public void clearCart(Long userId) {

        cartRepository.deleteByUserId(
                userId
        );
    }
}