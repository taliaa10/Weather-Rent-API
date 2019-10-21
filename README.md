# Weather Rent API

API Link: https://weather-rent-app.herokuapp.com

### Average weather query over a date range:

Questions:
1. What was the average rainfall in Houston in August 2017?
2. Average humidity in San Francisco in June 2019?

Example Query Strings:
1. **api/weather-rent/YOURAPIKEY?city=Houston&state=tx&startDate=2017-08-01&endDate=2017-08-31&weatherCondition=precipIntensity**

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
1. api/weather-rent/YOURAPIKEY?rent[gte]=1500&rent[lte]=2000
2. api/weather-rent/YOURAPIKEY?rent=1500

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
1. api/weather-rent/YOURAPIKEY?date=2018-12-31&weatherCondition=temparature&rent[lt]=2000

#### Parameters
    
#### Result

```json
{
  "status": "success",
  "data": [
    {
      "_id": "5dabcaf3032ab97b9eff50dc",
      "city": "Flint",
      "state": "MI",
      "rent": 549,
      "weatherResult": "23.7780",
      "weatherCondition": "temparature"
    },
    {
      "_id": "5dabcaf3032ab97b9eff5266",
      "city": "Youngstown",
      "state": "OH",
      "rent": 569,
      "weatherResult": "27.7620",
      "weatherCondition": "temparature"
    },
    {
      "_id": "5dabcaf3032ab97b9eff606c",
      "city": "Beecher",
      "state": "MI",
      "rent": 518,
      "weatherResult": "21.4860",
      "weatherCondition": "temparature"
    },
    {
      "_id": "5dabcaf4032ab97b9eff7105",
      "city": "West End-Cobb Town",
      "state": "AL",
      "rent": 590,
      "weatherResult": "46.2100",
      "weatherCondition": "temparature"
    },
    {
      "_id": "5dabcaf4032ab97b9eff78bd",
      "city": "Mount Morris",
      "state": "MI",
      "rent": 555,
      "weatherResult": "23.7240",
      "weatherCondition": "temparature"
    }
  ]
}
```

