# Weather Rent API

API Link: https://weather-rent-app.herokuapp.com

### Average weather query over a date range:

Questions:
1. What was the average rainfall in Houston in August 2017?
2. Average humidity in San Francisco in June 2019?

Example Query Strings:
1. **/api/weather-rent/YOURAPIKEY?city=Houston&state=tx&startDate=2017-08-01&endDate=2017-08-31&weatherCondition=precipIntensity**

#### Parameters
    
#### Result

```json
{
    "status": "success",
    "data": {
        "weather": "0.0343",
        "query": {
            "city": "Houston",
            "state": "tx",
            "startDate": "2017-08-01",
            "endDate": "2017-08-31",
            "weatherCondition": "precipIntensity"
        }
    }
}
```

<h3>Bonus:</h3>

Post direct question to DialogFlow and get a fully automated, human-like response!<br>
![](df.png) <br><br>

Use Postman or any... to make a POST request of any variation of the question below at the endpoint
<b>api/df_text_query<b>
    
```json
{
    "text": "What was the average rainfall in Houston in August 2017?"
}
```


<br> <br>
<hr>
<h3>Rent data based on city:</h3>

Questions:
1. Which cities have a rent lower than \$2000?
2. Cities that have rent equal $1500?

Example Query Strings:
1. /api/weather-rent/YOURAPIKEY?rent[gte]=1500&rent[lte]=2000
2. /api/weather-rent/YOURAPIKEY?rent=1500

#### Parameters
    
#### Result

```json
{
    "status": "success",
    "results": 5,
    "data": [
        {
            "_id": "5dabcaf3032ab97b9eff512e",
            "city": "West Jordan",
            "state": "UT",
            "rent": 1500
        },
        {
            "_id": "5dabcaf3032ab97b9eff621d",
            "city": "Morrisville",
            "state": "PA",
            "rent": 1500
        },
        {
            "_id": "5dabcaf3032ab97b9eff643a",
            "city": "Princeton",
            "state": "TX",
            "rent": 1500
        },
        {
            "_id": "5dabcaf4032ab97b9eff6b29",
            "city": "Fairfax",
            "state": "VT",
            "rent": 1500
        },
        {
            "_id": "5dabcaf4032ab97b9eff77fe",
            "city": "Ellenburg",
            "state": "NY",
            "rent": 1500
        }
    ]
}
```

<hr>
<h3>Average weather query over a date range and rent in city info:</h3>

Questions:
1. What cities have a rent less than $2000 but likely to be above 50 degrees Fahrenheit on New Year's Eve?<br>

Example Query Strings:
1. /api/weather-rent/YOURAPIKEY?date=2018-12-31&weatherCondition=temparature&rent[lt]=2000&page=1&limit=20

#### Parameters
    
#### Result

```json

{
    "status": "success",
    "results": 20,
    "data": [
        {
            "_id": "5dabcaf3032ab97b9eff4ffe",
            "city": "Houston",
            "state": "TX",
            "rent": 1430,
            "averageWeather": "52.1560",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5000",
            "city": "Chicago",
            "state": "IL",
            "rent": 1632,
            "averageWeather": "22.2540",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5001",
            "city": "Philadelphia",
            "state": "PA",
            "rent": 1212,
            "averageWeather": "34.6080",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5002",
            "city": "Phoenix",
            "state": "AZ",
            "rent": 1247,
            "averageWeather": "63.7040",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5003",
            "city": "Las Vegas",
            "state": "NV",
            "rent": 1239,
            "averageWeather": "51.3320",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5004",
            "city": "San Antonio",
            "state": "TX",
            "rent": 1250,
            "averageWeather": "50.7200",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5007",
            "city": "Dallas",
            "state": "TX",
            "rent": 1391,
            "averageWeather": "44.1460",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5009",
            "city": "Austin",
            "state": "TX",
            "rent": 1780,
            "averageWeather": "47.8220",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff500a",
            "city": "Fort Worth",
            "state": "TX",
            "rent": 1375,
            "averageWeather": "43.4940",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff500b",
            "city": "Detroit",
            "state": "MI",
            "rent": 750,
            "averageWeather": "26.1620",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff500c",
            "city": "Columbus",
            "state": "OH",
            "rent": 1116,
            "averageWeather": "28.2540",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff500d",
            "city": "Memphis",
            "state": "TN",
            "rent": 843,
            "averageWeather": "41.0560",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff500e",
            "city": "Jacksonville",
            "state": "FL",
            "rent": 1151,
            "averageWeather": "65.5760",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff500f",
            "city": "Charlotte",
            "state": "NC",
            "rent": 1294,
            "averageWeather": "47.7280",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5011",
            "city": "Indianapolis",
            "state": "IN",
            "rent": 1078,
            "averageWeather": "25.4780",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5012",
            "city": "El Paso",
            "state": "TX",
            "rent": 993,
            "averageWeather": "48.0580",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5014",
            "city": "Denver",
            "state": "CO",
            "rent": 1974,
            "averageWeather": "32.2700",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5015",
            "city": "Baltimore",
            "state": "MD",
            "rent": 1306,
            "averageWeather": "36.7680",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5018",
            "city": "Portland",
            "state": "OR",
            "rent": 1859,
            "averageWeather": "41.9960",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5019",
            "city": "Oklahoma City",
            "state": "OK",
            "rent": 1073,
            "averageWeather": "33.6640",
            "weatherType": "temparature",
            "fiveYearAvgOf": "2018-12-31"
        }
    ]
}
  
```

