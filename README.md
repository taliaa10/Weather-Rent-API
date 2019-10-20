# Weather Rent API

API Link: https://weather-rent-app.herokuapp.com

### Average weather query over a date range:

ex:


What was the average rainfall in Houston in August 2017?
Average humidity in San Francisco in June 2019?

api/weather-rent?city=Houston&state=tx&startDate=2017-08-01&endDate=2017-08-31&weatherCondition=precipIntensity

#### Parameters
    

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

ex:<br>
Which cities have a rent lower than \$2000? <br>
Cities that have rent equal $1500? <br>

api/weather-rent?rent[gte]=1500&rent[lte]=2000 <br>
api/weather-rent?rent=1500 <br>

```json
{
    "status": "success",
    "data": {
        "results": 5,
        "rent": [
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
        ],
        "query": {
            "rent": "1500"
        }
    }
}
```

<hr>
<h3>Average weather query over a date range and rent in city info:</h3>

ex:<br>
What cities have a rent less than $2000 but likely to be above 50 degrees Fahrenheit on New Year's Eve?<br>

api/weather-rent?date=2018-12-31&weatherCondition=temparature&rent[lt]=2000

```json
{
    "status": "success",
    "data": {
        "city": {
            "_id": "5dabcaf4032ab97b9eff78bd",
            "city": "Mount Morris",
            "state": "MI",
            "rent": 555
        },
        "weather": {
            "weather": "23.7240",
            "weatherCondition": "temparature"
        }
    }
}
```

