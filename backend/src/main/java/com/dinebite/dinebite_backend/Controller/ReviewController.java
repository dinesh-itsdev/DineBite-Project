package com.dinebite.dinebite_backend.Controller;

import com.dinebite.dinebite_backend.DTO.ReviewRequest;
import com.dinebite.dinebite_backend.DTO.ReviewResponse;
import com.dinebite.dinebite_backend.Service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:3000"
})
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(
            @RequestBody ReviewRequest request) {

        return ResponseEntity.ok(
                reviewService.addReview(request)
        );
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByProduct(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByProduct(productId)
        );
    }
}