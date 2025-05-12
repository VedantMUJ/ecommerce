package com.eshop.service;

import com.eshop.dto.CategoryDto;
import com.eshop.model.Category;
import com.eshop.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public Category createCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category.setActive(true);

        if (categoryDto.getParentId() != null) {
            Category parent = categoryRepository.findById(categoryDto.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found"));
            category.setParent(parent);
        }

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        category.setCreatedAt(timestamp);
        category.setUpdatedAt(timestamp);

        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(Long id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        if (categoryDto.getParentId() != null) {
            Category parent = categoryRepository.findById(categoryDto.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found"));
            category.setParent(parent);
        } else {
            category.setParent(null);
        }

        category.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getProducts().isEmpty()) {
            throw new RuntimeException("Cannot delete category with associated products");
        }

        category.setActive(false);
        categoryRepository.save(category);
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public Page<Category> getAllCategories(Pageable pageable) {
        return categoryRepository.findAllByActiveTrue(pageable);
    }

    public Page<Category> getSubCategories(Long parentId, Pageable pageable) {
        return categoryRepository.findAllByParentIdAndActiveTrue(parentId, pageable);
    }

    public Page<Category> searchCategories(String keyword, Pageable pageable) {
        return categoryRepository.findByNameContainingIgnoreCaseAndActiveTrue(keyword, pageable);
    }
} 