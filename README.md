# What is DriverAssistant?
DriverAssistant is a virtual assistant for truck drivers. It is a powerful tool that offers a variety of features that contribute to the driver's security and physical and emotional well-being during their travel. It aims to prevent road accidents and minimize negative psychological effects using emerging tech like big data analysis and generative artificial intelligence.

# Our proposal

### Android application
Portable devices such as smartphones and tablets have ideal hardware features for DriverAssistant. Their geolocation capabilities, mobile data access and integrated microphone make them perfect for this.
Furthermore, Android versions like Android Automotive, which have direct access to vehicle indicators such as gas level, geolocalization and air pressure level on tires, further expand what's possible when developing for this platform.

### Features
DriverAssistant is a multipurpose assistant. In the future with due work, it can be equipped with all the features a truck driver ever needs during their travel. The proposal presented here includes the following features:
- Smart Companion that reads messages to the driver by using TTS to provide important information and company during travel.
- Road alerts over a database of risk points on the road, such as sections in poor condition or dangerous curves.
- Driver Location Monitoring, so that his authorized family members and personnel within the company can observe his travel.
- Directions, a fundamental feature for driving that calculates the optimal route for the desired destination.
- Physical Indicators Monitoring using data obtained by external devices. Heart rate is useful for detecting the driver's sleepiness and acting accordingly to prevent him from falling asleep.
- Place Search, the driver can get directions for a food business, convenience store, pharmacy, hotel, or other relevant places, chosen for him given the current location and conditions.

### Microservices architecture
This distributed architecture, where system functionalities are divided into multiple services, each responsible for a limited set of responsibilities, gives valuable attributes like availability and scalability, which are critical for a system like DriverAssistant.

### Emerging technologies
DriverAssistant's AI-powered smart companion gives personalized messages, generated for the driver in real-time, considering relevant factors such as location, climate, size and weight of cargo, hours of travel and rest, and other data.
There's a great opportunity to integrate big data analysis so that DriverAssistant can know road conditions and be aware of risk points such as dangerous curves or sections prone to rockfall. With this data, the Smart Companion can promptly warn the driver about these dangers, thus avoiding accidents and saving lives. 

# Tecnical details

### Microservices and their responsibilities
Microservice name | Description | Interface
:--- | :--- | :---
Storage | Stores data related to drivers, companies, vehicles, and driver's family members in a relational database. | REST
Auth | Verifies access credentials and generates access tokens for clients. | REST
Location Monitoring | The service receives the driver's location and sends it to interested parties, such as the driver's family members and company personnel. | WebSockets
Map Data | Provides the data needed to display a map on the Client Application. Google Maps Platform tools are used. | REST
Directions | Gets the optimal route and sends it to the Client Application. It reacts to Place Search requests and chooses a new route. Google Maps Platform tools are used internally. | WebSockets
Smart Companion | Regularly receives data from the driver, such as location, climate, cargo size and weight, hours of travel and rest, and others. With the power of AI, it generates and sends messages to the driver when it deems appropriate, intending to maintain the driver's physical and mental well-being. The OpenAI API is used. | WebSockets
Road Alerts | With an extensive record of dangerous road points, such as dangerous curves or sections prone to rockfall, this service triggers alerts for the driver, warning about hazards. Drivers can contribute by generating reports about road anomalies, such as plotholes, traffic accidents, objects obstructing the road, and other hazards. | REST<br>WebSockets
Physical Indicators Monitoring | Receives physical indicators from the driver and analyzes them, in case of anomalies, it sends a warning to the Client Application. | WebSockets
Places | Provides data of businesses and places of interest. Google Maps Platform tools are used internally. | REST
Place Search | When requested, it finds nearby places such as gas stations, convenience stores, or food businesses. It chooses the best option for the driver and sends it to the Directions microservice which provides the new route. | REST<br>WebSockets

The following diagram illustrates the microservices and applications that form part of the system.

![DriverAssistant architecture](https://github.com/gerardoarzate55/hackathon-troyano-24/assets/116304288/6576a89e-8658-4e71-9477-4308c7863124)

# Implementation
The code included in this repository was developed in under 30 hours during Hackathon Troyano 2024. A showcase of the implementation progress achieved during the event can be found in the PDF at the root of this repository.

# Team members

Member | Contribution
:-- | :--
Gerardo Arzate Paredes | Team organization<br>Architecture design<br>Client Application<br>Smart Companion microservice
Abel Pintor García | Auth microservice<br>Directions microservice<br>Places microservice<br>Place Search microservice
Fernanda Daniela Pérez Álvarez | Location Monitoring microservice<br>Location Monitoring client<br>Physical Indicators Monitoring client<br>Simulated Physical Indicators device
Edgar Hernández Galindo | Storage microservice<br>Presentation video
Francisco Luna Fernández | Location Monitoring microservice<br>Location Monitoring client
