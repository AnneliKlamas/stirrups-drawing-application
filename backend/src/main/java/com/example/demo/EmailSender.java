package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;

@Service
public class EmailSender {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmailToCompany(String senderEmail, String description, String companyName, String message,
                                   String personName, String phone) throws MessagingException, IOException {

        MimeMessage msg = javaMailSender.createMimeMessage();

        // true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);

        helper.setTo(senderEmail);
        helper.setSubject("Testing from Spring Boot");

        // true = text/html
        if(companyName.equals("")){
            helper.setText("<h1>You have got a new price inquiry!</h1>" +
                    "<p>Sender is  "+personName+" and email is "+senderEmail+" and phonenumber is "+phone+"</p>" +
                    "<p>"+message+"</p>" +
                    "<p>"+description+"</p>", true);
        }
        else{
            helper.setText("<h1>You have got a new price inquiry!</h1>" +
                    "<p>Sender is  "+personName+"from company"+companyName+" and email is "+senderEmail+
                    " and phonenumber is "+phone+"</p>" +
                    "<p>"+message+"</p>" +
                    "<p>"+description+"</p>", true);
        }


        // hard coded a file path
        //FileSystemResource file = new FileSystemResource(new File("C:/Users\\1302143\\Desktop\\ssl4.png"));
        //helper.addAttachment("ssl4.png", file);

        javaMailSender.send(msg);
    }

    public void sendEmailToClient(String senderEmail, String description, String message) throws MessagingException, IOException {

        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);

        helper.setTo(senderEmail);
        helper.setSubject("Testing Spring Boot to client");

        helper.setText("<h1>Your price inquiry was sent!</h1>"  +
                "<p>Your message: "+message+"</p>" +
                "<p>Your products: "+description+"</p>", true);

        javaMailSender.send(msg);
    }
}
