
export const Stats = async (playerName) => {

    try {
        
        const nba = await fetch(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`)

        if (!nba.ok) {
            console.log('Server Error')
        }
        else {
            const data = await nba.json()
            console.log(data.results)
            return data
        }
    }
    catch(err) {
        console.error(err)
    }

}
