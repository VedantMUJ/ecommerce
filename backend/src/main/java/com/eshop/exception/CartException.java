package com.eshop.exception;

public class CartException extends RuntimeException {
    public CartException(String message) {
        super(message);
    }

    public CartException(String message, Throwable cause) {
        super(message, cause);
    }
} 