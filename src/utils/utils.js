export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if(a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })

    return sortedData;
}

export const basisUrl = "https://disease.sh/v3/covid-19/";