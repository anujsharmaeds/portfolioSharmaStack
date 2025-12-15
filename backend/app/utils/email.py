import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Template
from typing import Dict, Any
import os

from app.core.config import settings

async def send_email(
    to_email: str,
    subject: str,
    template_name: str,
    context: Dict[str, Any]
):
    """Send email using template"""
    try:
        # Load template
        template_path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "templates",
            "email",
            f"{template_name}.html"
        )
        
        with open(template_path, "r") as f:
            template_content = f.read()
        
        template = Template(template_content)
        html_content = template.render(**context)
        
        # Create message
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = to_email
        
        # Create HTML part
        html_part = MIMEText(html_content, "html")
        msg.attach(html_part)
        
        # Send email
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
            
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False