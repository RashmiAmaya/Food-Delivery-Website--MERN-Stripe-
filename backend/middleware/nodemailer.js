import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeMail = async (email, name) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to Our App!!",
    text: `Greetings ${name}. We hope you will love our app. Stay safe and be happy.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Spice Route</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            animation: fadeIn 2s;
        }

        .email-header {
            background: #dcdcdc; /* Light gray color */
            color: #28791d;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .email-body {
            padding: 20px;
            background: #fff;
            border-radius: 0 0 10px 10px;
        }

        .email-body p {
            margin-bottom: 15px; /* Adding spacing between paragraphs */
        }

        .email-body ul {
            margin-bottom: 15px; /* Adding spacing above and below the list */
            padding-left: 20px; /* Indentation for list items */
        }

        .otp-code {
            font-size: 2em;
            font-weight: bold;
            margin: 20px 0;
            padding: 10px;
            background: #28791d; /* Green color */
            color: #fff;
            border-radius: 5px;
            display: inline-block;
            animation: fadeIn 2s;
        }

        .main-website-link {
            margin-top: 20px;
        }

        .main-website-link a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28791d; /* Green color */
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .main-website-link a:hover {
            background-color: #1e5811; /* Darker shade of green on hover */
        }

        .email-footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }

        .logo {
            max-width: 100px;
            margin: 10px auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }
        ul {
            list-style: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://res.cloudinary.com/dcjahe5lm/image/upload/v1749563685/SpiceRoute-Logo_mjz8g9.png" alt="Spice Route Logo" class="logo">
            <h1>Spice Route</h1>
        </div>
        <div class="email-body">
            <p>Dear ${name}❤️,</p>
            <p>Welcome to Spice Route🙌! We are thrilled to have you with us. We hope you will love our authentic Sri Lankan cuisine.👌</p>
            <p>As a valued member of the Spice Route community, you now can order online within our delivery radius, get exciting offers and much more. Here are a few things you can get started with:</p>
            <ul>
                <li>View menu</li>
                <li>Order now</li>
                <li>Show order status</li>
            </ul>
            <p>If you have any questions or need assistance, our support team is always here to help.</p>
            <div class="main-website-link">
                <a href="/" target="_blank">Log in to your account</a>
            </div>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>The Spice Route Team</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
            <div class="footer-links">
                <a href="unsubscribe_link_here" target="_blank">Unsubscribe</a> |
                <a href="privacy_policy_link_here" target="_blank">Privacy Policy</a>
            </div>
            <p>If you did not sign up for this email, please ignore this message.</p>
        </div>
    </div>
</body>
</html>`,
  });
};

const sendOrderConfirmNotif = async (
  email,
  name,
  address,
  phno,
  amount,
  cod
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your order has been placed",
    text: `Greetings ${name}. Order has been placed from Spice Route. `,
    html: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Spice Route</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            animation: fadeIn 2s;
        }

        .email-header {
            background: #dcdcdc; /* Light gray color */
            color: #28791d;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .email-body {
            padding: 20px;
            background: #fff;
            border-radius: 0 0 10px 10px;
        }

        .email-body p {
            margin-bottom: 15px; /* Adding spacing between paragraphs */
        }

        .order-details {
            text-align: left;
            margin-bottom: 20px;
        }

        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .order-details th, .order-details td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        .order-description {
            font-weight: bold;
            margin-top: 20px;
            padding: 10px;
            color: #000;
            border-radius: 5px;
            display: inline-block;
        }

        .main-website-link {
            margin-top: 20px;
        }

        .main-website-link a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28791d; /* Green color */
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }

        .main-website-link a:hover {
            background-color: #1e5811; /* Darker shade of green on hover */
        }

        .email-footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #555;
        }

        .logo {
            max-width: 100px;
            margin: 10px auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        .footer-links {
            margin-top: 20px;
        }

        .footer-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }

        ul {
            list-style: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://res.cloudinary.com/dcjahe5lm/image/upload/v1749563685/SpiceRoute-Logo_mjz8g9.png" alt="Spice Route Logo" class="logo">
            <h1>Spice Route</h1>
        </div>
        <div class="email-body">
            <div class="order-details">
                <h2>Order Placed</h2>
                <table>
                    <tr>
                        <th>Name:</th>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <th>Address:</th>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th>
                        <td>${phno}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <th>Amount:</th>
                        <td>${amount}</td>
                    </tr>
                    <tr>
                    ${
                      cod
                        ? `
                        
                          <th>Payment Method:</th>
                          <td>Cash on delivery</td>
                          
                        `
                        : `<th>Payment Method:</th>
                          <td>Online</td>
                          `
                    } 
                    </tr>
                    <tr>
                    ${
                      cod
                        ? `
                        
                         <th>Payment Status:</th>
                          <td>Pending</td>
                          
                        `
                        : `<th>Payment Status:</th>
                          <td>Paid</td>`
                    } 
                   </tr>
                </table>
            </div>
            <div class="order-description">
                <strong>Order confirmed from Spice Route!<br>
                Food will be delivered within 30-40min depending on the traffic.</strong>
            </div>
            <div class="main-website-link">
                <a href="/" target="_blank">Check order status</a>
            </div>
        </div>
        <div class="email-footer">
            <p>Best regards,<br>The Spice Route Team</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
            <div class="footer-links">
                <a href="unsubscribe_link_here" target="_blank">Unsubscribe</a> |
                <a href="privacy_policy_link_here" target="_blank">Privacy Policy</a>
            </div>
            <p>If you did not place this order, please contact us immediately.</p>
        </div>
    </div>
</body>
</html>`,
  });
};

const sendOrderStatusNotif = async (
  email,
  name,
  address,
  phno,
  amount,
  cod,
  status
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Order status updated.",
    text: `Greetings ${name}. Order status Updated. `,
    html: `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - Spice Route</title>
      <style>
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
  
          .email-container {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              background: #f9f9f9;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: center;
              animation: fadeIn 2s;
          }
  
          .email-header {
              background: #dcdcdc; /* Light gray color */
              color: #28791d;
              padding: 10px;
              border-radius: 10px 10px 0 0;
          }
  
          .email-body {
              padding: 20px;
              background: #fff;
              border-radius: 0 0 10px 10px;
          }
  
          .email-body p {
              margin-bottom: 15px; /* Adding spacing between paragraphs */
          }
  
          .order-details {
              text-align: left;
              margin-bottom: 20px;
          }
  
          .order-details table {
              width: 100%;
              border-collapse: collapse;
          }
  
          .order-details th, .order-details td {
              padding: 8px;
              border-bottom: 1px solid #ddd;
          }
  
          .order-description {
              font-weight: bold;
              margin-top: 20px;
              padding: 10px;
              color: #000;
              border-radius: 5px;
              display: inline-block;
          }
  
          .main-website-link {
              margin-top: 20px;
          }
  
          .main-website-link a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #28791d; /* Green color */
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
          }
  
          .main-website-link a:hover {
              background-color: #1e5811; /* Darker shade of green on hover */
          }
  
          .email-footer {
              margin-top: 20px;
              font-size: 0.9em;
              color: #555;
          }
  
          .logo {
              max-width: 100px;
              margin: 10px auto;
          }
  
          .social-links {
              margin: 20px 0;
          }
  
          .social-links a {
              margin: 0 10px;
              color: #333;
              text-decoration: none;
          }
  
          .footer-links {
              margin-top: 20px;
          }
  
          .footer-links a {
              margin: 0 10px;
              color: #333;
              text-decoration: none;
          }
  
          ul {
              list-style: none;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <img src="https://res.cloudinary.com/dcjahe5lm/image/upload/v1749563685/SpiceRoute-Logo_mjz8g9.png" alt="Spice Route Logo" class="logo">
              <h1>Spice Route</h1>
          </div>
          <div class="email-body">
              <div class="order-details">
                  <h2>Order Status updated.</h2>
                  <table>
                      <tr>
                          <th>Name:</th>
                          <td>${name}</td>
                      </tr>
                      <tr>
                          <th>Address:</th>
                          <td>${address}</td>
                      </tr>
                      <tr>
                          <th>Phone Number:</th>
                          <td>${phno}</td>
                      </tr>
                      <tr>
                          <th>Email:</th>
                          <td>${email}</td>
                      </tr>
                      <tr>
                          <th>Amount:</th>
                          <td>${amount}</td>
                      </tr>
                      ${
                        cod
                          ? `
                          <tr>
                            <th>Payment Method:</th>
                            <td>Cash on delivery</td>
                            </tr>
                          `
                          : `
                          <tr>
                          <th>Payment Method:</th>
                            <td>Online</td>
                            </tr>`
                      } 
                      ${
                        cod
                          ? `
                          
                            <tr>
                            <th>Payment Status:</th>
                            <td>Pending</td></tr>
                          `
                          : `
                          <tr>
                            <th>Payment Status:</th>
                            <td>Paid</td>
                            </tr>`
                      } 
                     
                  </table>
              </div>
              ${
                status === "Out for Delivery"
                  ? `<div class="order-description">
                  <strong>Order is out for Delivery!!<br>
                  Our rider is trying his best to deliver the food as soon as possible</strong>
              </div>`
                  : `<div class="order-description">
                  <strong>Order has been Delivered!!<br>
                  Hope the food is still warm. Don't forget to review us :)</strong>
              </div>`
              }
              
              <div class="main-website-link">
                  <a href="/" target="_blank">Check order status</a>
              </div>
          </div>
          <div class="email-footer">
              <p>Best regards,<br>The Spice Route Team</p>
              <div class="social-links">
                  <p>Follow us on:</p>
                  <a href="https://www.facebook.com" target="_blank">Facebook</a> |
                  <a href="https://www.twitter.com" target="_blank">Twitter</a> |
                  <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
                  <a href="https://www.instagram.com" target="_blank">Instagram</a>
              </div>
              <div class="footer-links">
                  <a href="unsubscribe_link_here" target="_blank">Unsubscribe</a> |
                  <a href="privacy_policy_link_here" target="_blank">Privacy Policy</a>
              </div>
              <p>If you did not place this order, please contact us immediately.</p>
          </div>
      </div>
  </body>
  </html>`,
  });
};

export { sendWelcomeMail, sendOrderConfirmNotif, sendOrderStatusNotif };
