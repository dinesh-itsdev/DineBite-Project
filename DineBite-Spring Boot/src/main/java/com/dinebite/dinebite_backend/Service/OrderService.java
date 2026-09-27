package com.dinebite.dinebite_backend.Service;

import com.dinebite.dinebite_backend.Entity.Order;
import com.dinebite.dinebite_backend.Entity.User;
import com.dinebite.dinebite_backend.Repository.OrderRepository;
import com.dinebite.dinebite_backend.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(
            OrderRepository orderRepository,
            UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // GET ALL ORDERS
    // =========================
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    // =========================
    // GET USER ORDERS
    // =========================
    public List<Order> getUserOrders(Long userId) {

        return orderRepository.findByUserId(userId);
    }

    // =========================
    // GET ORDER BY ID
    // =========================
    public Order getOrderById(Long orderId) {

        return orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found: " + orderId));
    }

    // =========================
    // CREATE ORDER
    // =========================
    @Transactional
    public Order createOrder(Long userId, Order order) {

        if (userId == null) {
            throw new RuntimeException("User ID is required");
        }

        if (order == null) {
            throw new RuntimeException("Order data is required");
        }

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found: " + userId
                        ));

        // Attach user to order
        order.setUser(user);

        // Default status
        if (order.getStatus() == null ||
                order.getStatus().trim().isEmpty()) {

            order.setStatus("PLACED");
        }

        // Save order into Oracle
        return orderRepository.save(order);
    }

    // =========================
    // UPDATE ORDER STATUS
    // =========================
    @Transactional
    public Order updateOrderStatus(
            Long orderId,
            String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found: " + orderId
                        ));

        if (status == null ||
                status.trim().isEmpty()) {

            throw new RuntimeException(
                    "Order status is required"
            );
        }

        order.setStatus(status);

        return orderRepository.save(order);
    }

    // =========================
    // DELETE ORDER
    // =========================
    @Transactional
    public void deleteOrder(Long orderId) {

        if (!orderRepository.existsById(orderId)) {

            throw new RuntimeException(
                    "Order not found: " + orderId
            );
        }

        orderRepository.deleteById(orderId);
    }
}