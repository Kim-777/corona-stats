import React, { useState, useEffect } from "react";
import { Card, CardContent, FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from './components/Table';
import {
  sortData,
  basisUrl,
} from './utils/utils';
import LineGraph from './components/LineGraph';
function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("All");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
      fetch(`${basisUrl}all`)
        .then(response => response.json())
        .then(data => {
          setCountryInfo(data);
        })
    }, [])

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));

                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setCountries(countries);
                });
        };

        getCountriesData();
    }, []);

    useEffect(() => {
      console.log('countryInfo >>>>>>', countryInfo)
    }, [countryInfo]);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        // console.log('value >>>>>>>', countryCode);
        setCountry(countryCode);

        const url = countryCode === "All" ? `${basisUrl}all` : `${basisUrl}countries/${countryCode}`
        // console.log('url >>>>>>>', url);
        await fetch(url)
          .then(response => response.json())
          .then(data => {
            setCountryInfo(data);
          });




        // https://disease.sh/v3/covid-19/all
        // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    };

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>CORANA STATS</h1>
                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {countries.map((country) => (
                                <MenuItem
                                    key={country.name}
                                    value={country.value}
                                >
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="app__stats">
                    <InfoBox 
                      title="코로나 현황" 
                      cases={countryInfo.todayCases} 
                      total={countryInfo.cases} 
                    />
                    <InfoBox 
                      title="회복자 수" 
                      cases={countryInfo.todayRecovered} 
                      total={countryInfo.recovered}
                    />
                    <InfoBox 
                      title="사망자 수" 
                      cases={countryInfo.todayDeaths} 
                      total={countryInfo.deaths} 
                    />
                </div>


                {/* Map */}
                <Map />
            </div>
            <Card className="app__right">
              <CardContent>
                <h3>Live Casesd by Countries</h3>
                <Table countries={tableData} />
                <h3>Worldwide new cases</h3>
                <LineGraph />
              </CardContent>
            </Card>
        </div>
    );
}

export default App;
