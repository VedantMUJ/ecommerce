package com.eshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailTemplateService emailTemplateService;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        String emailContent = emailTemplateService.generatePasswordResetEmail(resetUrl);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request");
        helper.setText(emailContent, true);

        mailSender.send(message);
    }

    public void sendPasswordChangedEmail(String toEmail) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String emailContent = emailTemplateService.generatePasswordChangedEmail();

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Password Changed Successfully");
        helper.setText(emailContent, true);

        mailSender.send(message);
    }

    public void sendPasswordExpiryWarningEmail(String toEmail) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String emailContent = emailTemplateService.generatePasswordExpiryWarningEmail();

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Password Expiry Warning");
        helper.setText(emailContent, true);

        mailSender.send(message);
    }

    public void sendAdminIpUnlockEmail(String adminEmail, String adminUsername, String ipAddress) {
        String subject = "IP Address Unlocked - EShop Admin";
        String content = emailTemplateService.generateAdminIpUnlockEmail(adminUsername, ipAddress);
        sendEmail(adminEmail, subject, content);
    }

    public void sendAdminAccountUnlockEmail(String adminEmail, String adminUsername, String username, String email) {
        String subject = "Account Unlocked - EShop Admin";
        String content = emailTemplateService.generateAdminAccountUnlockEmail(adminUsername, username, email);
        sendEmail(adminEmail, subject, content);
    }

} 