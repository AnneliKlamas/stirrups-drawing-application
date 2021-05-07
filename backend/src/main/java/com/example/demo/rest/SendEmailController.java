package com.example.demo.rest;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import com.example.demo.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
public class SendEmailController {

    @Autowired
    EmailSender emailSender;

    @RequestMapping(value = "/sendEmailToCompany")
    public String send(@RequestParam(name = "senderEmail") String senderEmail,
                       @RequestParam(name = "description") String description,
                       @RequestParam(name = "companyName") String companyName,
                       @RequestParam(name = "message") String message,
                       @RequestParam(name = "personName") String personName,
                       @RequestParam(name = "phone") String phone) throws AddressException, MessagingException, IOException {
        emailSender.sendEmailToCompany(senderEmail, description, companyName, message, personName, phone);
        return "Email sent successfully to company";
    }

    @RequestMapping(value = "/sendEmailToClient")
    public String send(@RequestParam(name = "senderEmail") String senderEmail,
                       @RequestParam(name = "description") String description,
                       @RequestParam(name = "message") String message) throws AddressException, MessagingException, IOException {
        emailSender.sendEmailToClient(senderEmail, description, message);
        return "Email sent successfully to client";
    }
}
