package com.dinebite.dinebite_backend.Service;

import com.dinebite.dinebite_backend.DTO.ReviewRequest;
import com.dinebite.dinebite_backend.DTO.ReviewResponse;
import com.dinebite.dinebite_backend.Entity.Food;
import com.dinebite.dinebite_backend.Entity.Review;
import com.dinebite.dinebite_backend.Entity.User;
import com.dinebite.dinebite_backend.Repository.FoodRepository;
import com.dinebite.dinebite_backend.Repository.ReviewRepository;
import com.dinebite.dinebite_backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            FoodRepository foodRepository) {

        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
    }

    public ReviewResponse addReview(ReviewRequest request) {

        if (request.getUserId() == null) {
            throw new RuntimeException("User ID is required");
        }

        if (request.getProductId() == null) {
            throw new RuntimeException("Product ID is required");
        }

        if (request.getRating() == null ||
                request.getRating() < 1 ||
                request.getRating() > 5) {

            throw new RuntimeException("Rating must be between 1 and 5");
        }

        if (request.getReviewComment() == null ||
                request.getReviewComment().trim().isEmpty()) {

            throw new RuntimeException("Review comment is required");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + request.getUserId()
                        ));

        Food food = foodRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Food not found with ID: " + request.getProductId()
                        ));

        Review review = new Review();

        review.setUser(user);
        review.setProduct(food);
        review.setRating(request.getRating());
        review.setReviewComment(request.getReviewComment().trim());

        Review savedReview = reviewRepository.save(review);

        return convertToResponse(savedReview);
    }

    public List<ReviewResponse> getReviewsByProduct(Long productId) {

        return reviewRepository
                .findByProductIdOrderByCreatedAtDesc(productId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private ReviewResponse convertToResponse(Review review) {

        ReviewResponse response = new ReviewResponse();

        response.setId(review.getId());
        response.setReviewComment(review.getReviewComment());
        response.setCreatedAt(review.getCreatedAt());
        response.setRating(review.getRating());

        if (review.getProduct() != null) {
            response.setProductId(review.getProduct().getId());
        }

        if (review.getUser() != null) {
            response.setUserId(review.getUser().getId());
            response.setUserName(review.getUser().getName());
        }

        return response;
    }
}