package com.dinebite.dinebite_backend.Controller;

import com.dinebite.dinebite_backend.Entity.Order;
import com.dinebite.dinebite_backend.Service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // GET ALL ORDERS
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    // GET USER ORDERS
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.getUserOrders(userId)
        );
    }

    // GET ORDER BY ID
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(
                orderService.getOrderById(orderId)
        );
    }

    // CREATE ORDER / CHECKOUT
    @PostMapping("/user/{userId}")
    public ResponseEntity<Order> createOrder(
            @PathVariable Long userId,
            @RequestBody Order order) {

        Order createdOrder =
                orderService.createOrder(userId, order);

        return ResponseEntity.ok(createdOrder);
    }

    // UPDATE ORDER STATUS
    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status) {

        Order updatedOrder =
                orderService.updateOrderStatus(
                        orderId,
                        status
                );

        return ResponseEntity.ok(updatedOrder);
    }

    // DELETE ORDER
    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(
            @PathVariable Long orderId) {

        orderService.deleteOrder(orderId);

        return ResponseEntity.ok(
                "Order deleted successfully"
        );
    }
}