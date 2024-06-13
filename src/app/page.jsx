'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { Stats } from "@/service/StatsAPI";

export default function Home() {

  const [nbaData, setNbaData] = useState([])
  const [player, findPlayer] = useState('')
  const [hasResult, setHasResult] = useState(false)

  const FetchPlayerStats = async (e) => {

    try {
      if (e.key === 'Enter') {
        e.preventDefault()
        const nba = await Stats(player)
        setNbaData(nba)

        if (nba && nba.count > 0) {
          setHasResult(true)
        }

        else {
          setHasResult(false)
        }

        console.log(hasResult)
      }
    }
    catch(error) {
      console.error(error)
      setHasResult(false)
    }
  }

  const ConverToPercent = (number) => {
    return (number * 100).toFixed(2) + '%'
  }

  useEffect(()=> {

    FetchPlayerStats()

  }, [])

  return (
    <main className="flex justify-center items-center py-10 px-4">
      <div className="flex flex-col items-center gap-4 w-full md:w-[80%] lg:w-[60%]">
        <h1 className="text-lg md:text-xl lg:text-[2.25rem] font-bold text-center">NBA PLAYER STATUS</h1>
        <h2 className="text-sm md:text-base lg:text-lg text-gray-400 text-center lg:mb-4">by NBA STATS API</h2>
        <input 
          type="text" 
          placeholder="Search player (First Name and Last Name)" 
          className="bg-gray-200 px-4 py-3 rounded-[4px] w-full"
          onChange={(e) => findPlayer(e.target.value)}
          onKeyDown={FetchPlayerStats}
        />
        <div className="bg-gray-200 rounded-[4px] text-center p-10 w-full">
          {
            nbaData.results && nbaData.count > 0 ? (
             <div>
               <h1 className="text-lg font-bold">{nbaData.results[0].player_name}</h1>
               <h2 className="text-gray-400">Player name</h2>
             </div>
            )
            : 
            (
              <div>
                <h1>No results found</h1>
              </div>
            )
          }
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {
            nbaData.results && (
              nbaData.results.map((data, index) => (
                <div key={index} className="bg-gray-200 rounded-[4px] p-4 text-xs flex flex-col gap-2 lg:text-base">
                  <h1>Season: {data.season}</h1>
                  <h1>Team: {data.team}</h1>
                  <h1>Min. Played: {data.minutes_played}</h1>
                  <h1>FG%: {ConverToPercent(data.field_percent)}</h1>
                  <h1>3FG%: {ConverToPercent(data.three_percent)}</h1>
                  <h1>FT%: {ConverToPercent(data.ft_percent)}</h1>
                  <h1>REB: {data.TRB}</h1>
                  <h1>AST: {data.AST}</h1>
                  <h1>STL: {data.STL}</h1>
                  <h1>BLK: {data.BLK}</h1>
                </div>
              ))
            )
          }
        </div>
      </div>
    </main>
  );
}
