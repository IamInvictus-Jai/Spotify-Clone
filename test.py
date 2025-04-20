import requests

url = "https://shazam-api6.p.rapidapi.com/shazam/recognize/"

payload = {}
headers = {
	"x-rapidapi-key": "fe9dcc1a02mshf78a4feed9bcba3p183633jsn099e04c7dcc2",
	"x-rapidapi-host": "shazam-api6.p.rapidapi.com",
	"Content-Type": "application/x-www-form-urlencoded"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())