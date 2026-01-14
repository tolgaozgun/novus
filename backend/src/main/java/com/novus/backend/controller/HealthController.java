package com.novus.backend.controller;

import com.novus.backend.common.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/health")
@Tag(name = "Health", description = "Health Check Endpoint")
public class HealthController {

    @GetMapping
    @Operation(summary = "Check application health", description = "Returns UP if the application is running")
    public ApiResponse<String> health() {
        return ApiResponse.success("Application is running", "UP");
    }
}
