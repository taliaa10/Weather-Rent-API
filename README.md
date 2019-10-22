# Weather Rent API

API Link: https://weather-rent-app.herokuapp.com

## API Request Types

### Average weather over a date range request:

Questions:
1. What was the average rainfall in Houston in August 2017?
2. Average humidity in San Francisco in June 2019?

This request returns the average weather over the specified date range for a specified weather type and city.
Temperatures are in Fahrenheit.

https://<span></span>weather-rent-app.herokuapp.com/api/weather-rent/[YOURAPIKEY]?city=[city]&state=[state]&startDate=[startDate]&endDate=[endDate]&weatherCondition=[weatherCondition]

#### Parameters

- **YOURAPIKEY** - provided upon request.

- **city** - city of location as a string.

- **state** - state of location as a string.

- **startDate** - start date of date range. Must be in YYYY-MM-DD format.

- **endDate** - end date of date range. Must be in YYYY-MM-DD format.

- **weatherCondition** - The type of weather you would like to query.

Common weather conditions include:
`temperature`
`precipIntensity`
`humidity`

#### Example Query Strings:
1. https://<span></span>weather-rent-app.herokuapp.com/api/weather-rent/[YOURAPIKEY]?city=Houston&state=TX&startDate=2017-08-01&endDate=2017-08-31&weatherCondition=precipIntensity
    
#### Result

```json
{
    "status": "success",
    "data": {
        "weather": 0.0343,
        "query": {
            "city": "Houston",
            "state": "TX",
            "startDate": "2017-08-01",
            "endDate": "2017-08-31",
            "weatherCondition": "precipIntensity"
        }
    }
}
```

### Bonus:

Post direct question to DialogFlow and get a fully automated, human-like response!<br>
![](df.png) <br><br>

Use Postman or any API dev tool to make a POST request of any variation of the question below at the endpoint
**api/df_text_query**
    
```json
{
    "text": "What was the average rainfall in Houston in August 2017?"
}
```



<hr>
<h3>Cities based on rent request:</h3>

Questions:
1. Cities with rent between $1500 and $2000?
2. Which cities have a rent lower than $2000?
3. Cities that have rent equal $1500?

This request returns a list of cities based on the specified rent amount. Rent is in USD.

https://<span></span>weather-rent-app.herokuapp.com/api/weather-rent/[YOURAPIKEY]?rent[lt]=[rentcost]

#### Parameters

- **YOURAPIKEY** - provided upon request.

- **rent** - integer of the desired rent.

valid query keys for the rent parameter include:
```
rent=2000 rent equals 2000
rent[lt]=2000 rent is less than 2000
rent[gt]=2000 rent is greater than 2000
rent[lte]=2000 rent is less than or equal to 2000
rent[gte]=2000 rent is greater or equal to than 2000
```

#### Example Query Strings:
1. https://<span></span>weather-rent-app.herokuapp.com/api/weather-rent/[YOURAPIKEY]?rent[lt]=1000
2. https://<span></span>weather-rent-app.herokuapp.com/api/weather-rent/[YOURAPIKEY]?rent=1500
3. https://<span></span>weather-rent-app.herokuapp.com/api/weather-rent/[YOURAPIKEY]?rent[lt]=3000&rent[gte]=2000
    
#### Result

```json
{
    "status": "success",
    "results": 1342,
    "data": [
        {
            "_id": "5dabcaf3032ab97b9eff4fff",
            "city": "New York",
            "state": "NY",
            "rent": 2322
        },
        {
            "_id": "5dabcaf3032ab97b9eff5006",
            "city": "Los Angeles",
            "state": "CA",
            "rent": 2753
        },
        {
            "_id": "5dabcaf3032ab97b9eff5082",
            "city": "Oceanside",
            "state": "CA",
            "rent": 2354
        },
        {
            "_id": "5dabcaf3032ab97b9eff5114",
            "city": "Murrieta",
            "state": "CA",
            "rent": 2047
        },
        {
            "_id": "5dabcaf3032ab97b9eff5150",
            "city": "South Gate",
            "state": "CA",
            "rent": 2171
        }
    ]
}
```

<hr>
<h3>Average weather over a date range and rent request:</h3>

Questions:
1. What cities have a rent less than $2000 but likely to be above 50 degrees Fahrenheit on New Year's Eve?

This request returns a list of cities based on the specified rent, and specified weather and weather type, with the average of that weather of a date from the last 5 years.

https://<span></span>weather-rent-app.herokuapp.com/api/weather-rent/[YOURAPIKEY]?date=2018-12-31&weatherCondition=dewPoint&weather[gt]=20&rent=1000&page=1&limit=20

#### Parameters

- **YOURAPIKEY** - provided upon request.

- **date** -  Must be in YYYY-MM-DD format.

- **weatherCondition** - The type of weather you would like to query.

Common weather conditions include: 
`temperature`
`precipIntensity`
`humidity`

- **weather** - integer of the desired weatherCondition.

- **city** - city of location as a string.

- **state** - state of location as a string.

- **rent** - integer of the desired rent.

valid query keys for the rent and weather parameter include:
```
rent=2000 rent equals 2000
rent[lt]=2000 rent is less than 2000
rent[gt]=2000 rent is greater than 2000
rent[lte]=2000 rent is less than or equal to 2000
rent[gte]=2000 rent is greater or equal to than 2000

weather[lt]=50 weather is less than 50
weather[gt]=50 weather is greater than 50

```

The results are limited to 20 per page and the page parameter can be used to go to different pages to see more results.

Example Query Strings:
1. /api/weather-rent/YOURAPIKEY?date=2018-12-31&weatherCondition=temperature&weather[gt]=50&rent[lt]=2000&page=1&limit=20
    
#### Result

```json
{
    "status": "success",
    "results": 13,
    "data": [
        {
            "_id": "5dabcaf3032ab97b9eff500e",
            "city": "Jacksonville",
            "state": "FL",
            "rent": 1151,
            "averageWeather": 65.566,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5002",
            "city": "Phoenix",
            "state": "AZ",
            "rent": 1247,
            "averageWeather": 63.7,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5003",
            "city": "Las Vegas",
            "state": "NV",
            "rent": 1239,
            "averageWeather": 51.314,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5096",
            "city": "Columbus",
            "state": "GA",
            "rent": 813,
            "averageWeather": 54.136,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff50bc",
            "city": "Yuma",
            "state": "AZ",
            "rent": 933,
            "averageWeather": 63.02,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff50c0",
            "city": "Visalia",
            "state": "CA",
            "rent": 1236,
            "averageWeather": 51.826,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff50c1",
            "city": "Charleston",
            "state": "SC",
            "rent": 1794,
            "averageWeather": 54.04,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff50de",
            "city": "Metairie",
            "state": "LA",
            "rent": 1525,
            "averageWeather": 57.36,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff50df",
            "city": "McAllen",
            "state": "TX",
            "rent": 1200,
            "averageWeather": 58.854,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5149",
            "city": "Madera",
            "state": "CA",
            "rent": 1189,
            "averageWeather": 52.694,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5158",
            "city": "Vero Beach",
            "state": "FL",
            "rent": 1443,
            "averageWeather": 65.806,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff515c",
            "city": "Davie",
            "state": "FL",
            "rent": 1953,
            "averageWeather": 69.786,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        },
        {
            "_id": "5dabcaf3032ab97b9eff5173",
            "city": "Rialto",
            "state": "CA",
            "rent": 1699,
            "averageWeather": 58.786,
            "weatherType": "temperature",
            "fiveYearAvgFrom": "2018-12-31"
        }
    ]
}
  
```

