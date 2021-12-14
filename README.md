A simple stock calculator, consisting of the following three services:
1. _Data provider_. A service generates stock prices (Facebook, Google, and Twitter) randomly every minute.
2. _Data processor_. A service stores prices into a proper storage/database.
3. _UI_. A service shows the users the current stock price and the average price for the last day/month/year.

![image](https://user-images.githubusercontent.com/2155546/146096991-163c7971-ddf3-4e14-92e9-240b9ef18229.png)

# Settings
Set ```INTERVAL``` in ```docker-compose.yaml``` in ```services/provider/environment``` section to change interval of generating prices.

# Requirements
Docker with docker-compose.

# Deploy
Run ```docker-compose -f docker-compose.yaml up -d --build``` from root directory.

Open ```http://localhost:9000```

# Run tests
A unit-tests added for the app. To start ```npm run test``` in ```app/```.
