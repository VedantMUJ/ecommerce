package com.eshop.controller;

import com.eshop.dto.CategoryDto;
import com.eshop.model.Category;
import com.eshop.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        Category category = categoryService.createCategory(categoryDto);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryDto categoryDto) {
        Category category = categoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ResponseEntity<Page<Category>> getAllCategories(Pageable pageable) {
        Page<Category> categories = categoryService.getAllCategories(pageable);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<Page<Category>> getSubCategories(
            @PathVariable Long parentId,
            Pageable pageable) {
        Page<Category> categories = categoryService.getSubCategories(parentId, pageable);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Category>> searchCategories(
            @RequestParam String keyword,
            Pageable pageable) {
        Page<Category> categories = categoryService.searchCategories(keyword, pageable);
        return ResponseEntity.ok(categories);
    }
} 