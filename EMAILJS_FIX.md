# EmailJS Template Fix

Your email form is showing "TRANSMISSION_FAILED" because the template variables don't match.

## Fix Steps:

1. Go to https://dashboard.emailjs.com/
2. Login with your account
3. Go to "Email Templates"
4. Click on your template `template_npz79ig`
5. Update the template content to use these exact variable names:

```
Subject: New Contact from {{name}}

From: {{name}}
Email: {{email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

6. Make sure the variable names in the template are:
   - `{{name}}` (not {{from_name}})
   - `{{email}}` (not {{from_email}})
   - `{{message}}`

7. Click "Save"

## Test the Form

After updating the template:
1. Go to your portfolio
2. Fill out the contact form
3. Click "TRANSMIT_SIGNAL"
4. You should receive an email at akshayakumar8104@gmail.com

## If Still Not Working

Check these:
1. EmailJS service is connected to your Gmail
2. You haven't exceeded the 200 emails/month limit
3. Check EmailJS dashboard logs for errors
4. Make sure your public key is correct: `yaCZSozhro0uy8XBe`
