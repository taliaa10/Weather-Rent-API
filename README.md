# api-app

API Link: https://weather-rent-app.herokuapp.com

<h3>Average weather query over a date range:</h3>

<u>ex:</u><br>
What was the average rainfall in Houston in August 2017? <br>
Average humidity in San Francisco in June 2019? <br>

api/weather-rent?city=Houston&state=tx&startDate=2017-08-01&endDate=2017-08-31&weatherCondition=precipIntensity

```
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

Bonus:

Post question to DialogFlow and get a fully automated, human-like response!


<br> <br>
<hr>
<h3>Rent data based on city:</h3>

ex:<br>
Which cities have a rent lower than \$2000? <br>
Cities that have rent equal $1500? <br>

api/weather-rent?rent[gte]=1500&rent[lte]=2000 <br>
api/weather-rent?rent[lte]=600 <br>

<hr>
<h3>Average weather query over a date range and rent in city info:</h3>

ex:<br>
What cities have a rent less than $2000 but likely to be above 50 degrees Fahrenheit on New Year's Eve?<br>

api/weather-rent?city=Houston&state=tx&startDate=2017-08-01&endDate=2017-08-31&weatherCondition=precipIntensity
