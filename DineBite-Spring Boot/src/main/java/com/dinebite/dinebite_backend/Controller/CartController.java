package com.dinebite.dinebite_backend.Controller;

import com.dinebite.dinebite_backend.Entity.CartItem;
import com.dinebite.dinebite_backend.Service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // GET USER CART
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCart(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                cartService.getCart(userId)
        );
    }

    // ADD TO CART
    @PostMapping("/{userId}/add")
    public ResponseEntity<CartItem> addToCart(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {

        return ResponseEntity.ok(
                cartService.addToCart(
                        userId,
                        productId,
                        quantity
                )
        );
    }

    // UPDATE QUANTITY
    @PutMapping("/{userId}/update")
    public ResponseEntity<CartItem> updateQuantity(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {

        return ResponseEntity.ok(
                cartService.updateQuantity(
                        userId,
                        productId,
                        quantity
                )
        );
    }

    // REMOVE FROM CART
    @DeleteMapping("/{userId}/remove")
    public ResponseEntity<String> removeFromCart(
            @PathVariable Long userId,
            @RequestParam Long productId) {

        cartService.removeFromCart(userId, productId);

        return ResponseEntity.ok(
                "Product removed from cart"
        );
    }

    // CLEAR CART
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<String> clearCart(
            @PathVariable Long userId) {

        cartService.clearCart(userId);

        return ResponseEntity.ok(
                "Cart cleared successfully"
        );
    }
}