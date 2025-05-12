package com.eshop.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailTemplateService {

    public String generatePasswordResetEmail(String resetUrl) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #007bff;
                        color: white;
                        padding: 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        font-size: 12px;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>We received a request to reset your password. Click the button below to reset your password:</p>
                        <p style="text-align: center;">
                            <a href="%s" class="button">Reset Password</a>
                        </p>
                        <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                        <p>This link will expire in 24 hours.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 E-Shop. All rights reserved.</p>
                        <p>This is an automated message, please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(resetUrl);
    }

    public String generatePasswordChangedEmail() {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Changed</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #28a745;
                        color: white;
                        padding: 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        font-size: 12px;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Password Changed Successfully</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>Your password has been successfully changed.</p>
                        <p>If you did not make this change, please contact our support team immediately.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 E-Shop. All rights reserved.</p>
                        <p>This is an automated message, please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
            """;
    }

    public String generatePasswordExpiryWarningEmail() {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Expiry Warning</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #ffc107;
                        color: #333;
                        padding: 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        font-size: 12px;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Password Expiry Warning</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>Your password will expire in 7 days. To maintain access to your account, please change your password before it expires.</p>
                        <p style="text-align: center;">
                            <a href="%s/change-password" class="button">Change Password</a>
                        </p>
                        <p>If you do not change your password before it expires, you will be required to reset your password.</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 E-Shop. All rights reserved.</p>
                        <p>This is an automated message, please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:3000"));
    }

    public String generateAccountLockoutEmail(String username, int minutesRemaining) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                    .content { padding: 20px; }
                    .button { 
                        display: inline-block; 
                        padding: 10px 20px; 
                        background-color: #007bff; 
                        color: white; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        margin-top: 20px; 
                    }
                    .footer { 
                        margin-top: 20px; 
                        padding-top: 20px; 
                        border-top: 1px solid #eee; 
                        font-size: 12px; 
                        color: #666; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Account Lockout Notification</h2>
                    </div>
                    <div class="content">
                        <p>Dear %s,</p>
                        <p>We noticed multiple failed login attempts on your account. For security reasons, your account has been temporarily locked.</p>
                        <p>Your account will be automatically unlocked in %d minutes.</p>
                        <p>If you did not attempt to log in, please contact our support team immediately.</p>
                        <p>For your security, we recommend:</p>
                        <ul>
                            <li>Using a strong, unique password</li>
                            <li>Enabling two-factor authentication if available</li>
                            <li>Regularly updating your password</li>
                        </ul>
                        <a href="%s/account/security" class="button">Manage Account Security</a>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                        <p>&copy; 2024 EShop. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                username,
                minutesRemaining,
                System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:3000")
            );
    }

    public String generateAdminIpUnlockEmail(String adminUsername, String ipAddress) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                    .content { padding: 20px; }
                    .footer { 
                        margin-top: 20px; 
                        padding-top: 20px; 
                        border-top: 1px solid #eee; 
                        font-size: 12px; 
                        color: #666; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>IP Address Unlocked</h2>
                    </div>
                    <div class="content">
                        <p>Dear %s,</p>
                        <p>You have successfully unlocked the IP address: %s</p>
                        <p>This action was performed at: %s</p>
                        <p>If you did not perform this action, please contact the system administrator immediately.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                        <p>&copy; 2024 EShop. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                adminUsername,
                ipAddress,
                LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
            );
    }

    public String generateAdminAccountUnlockEmail(String adminUsername, String username, String email) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                    .content { padding: 20px; }
                    .footer { 
                        margin-top: 20px; 
                        padding-top: 20px; 
                        border-top: 1px solid #eee; 
                        font-size: 12px; 
                        color: #666; 
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Account Unlocked</h2>
                    </div>
                    <div class="content">
                        <p>Dear %s,</p>
                        <p>You have successfully unlocked the following account:</p>
                        <ul>
                            <li>Username: %s</li>
                            <li>Email: %s</li>
                        </ul>
                        <p>This action was performed at: %s</p>
                        <p>If you did not perform this action, please contact the system administrator immediately.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                        <p>&copy; 2024 EShop. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                adminUsername,
                username,
                email,
                LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
            );
    }
} 