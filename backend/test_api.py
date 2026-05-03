import requests

url = "http://localhost:8000/api/contact/"
data = {
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Plan Inquiry: Startup Package",
    "message": "New plan selection inquiry for: Startup Package",
    "inquiryType": "plan"
}

try:
    response = requests.post(url, data=data)
    print("Status:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("Error:", e)
