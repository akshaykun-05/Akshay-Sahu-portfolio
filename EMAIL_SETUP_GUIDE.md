# Email Setup Guide for Contact Form

Your contact form is now configured to send emails using EmailJS. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email (akshayakumar8104@gmail.com)
5. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key** (also called User ID)

## Step 5: Update Your Code

Open `index.html` and replace these placeholders:

**Line ~930** (in the EmailJS initialization):
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
```

Open `script.js` and replace these placeholders:

**Around line 120** (in the emailjs.send function):
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

Replace:
- `YOUR_SERVICE_ID` with your Service ID from Step 2
- `YOUR_TEMPLATE_ID` with your Template ID from Step 3

## Step 6: Test Your Form

1. Open your portfolio in a browser
2. Fill out the contact form
3. Click "TRANSMIT_SIGNAL"
4. Check your email (akshayakumar8104@gmail.com)

## Example Configuration

After setup, your code should look like this:

```javascript
// In index.html
emailjs.init("abc123XYZ"); // Your actual public key

// In script.js
emailjs.send('service_xyz123', 'template_abc456', {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'akshayakumar8104@gmail.com'
})
```

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- No credit card required
- Perfect for portfolio contact forms

## Troubleshooting

If emails aren't sending:
1. Check browser console for errors
2. Verify all IDs are correct
3. Make sure your email service is connected in EmailJS dashboard
4. Check EmailJS dashboard logs for delivery status

## Alternative: Formspree

If you prefer Formspree instead:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create account and get your form endpoint
3. Update the form action attribute

Let me know if you need help with the setup!
