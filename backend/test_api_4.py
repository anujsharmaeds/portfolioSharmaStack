import requests
import io

url = "http://localhost:8000/api/contact/"
data = {
    "name": "Test Career",
    "email": "career@test.com",
    "subject": "Career Opportunity",
    "message": "I am applying for Frontend Developer",
    "inquiryType": "career",
    "role": "Frontend Developer",
    "linkedin": "https://linkedin.com",
    "website": "https://github.com"
}
files = {
    "resume": ("test_resume.pdf", b"dummy pdf content", "application/pdf")
}

try:
    response = requests.post(url, data=data, files=files)
    print("Status:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print('Error:', e)
