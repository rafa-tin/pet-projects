import { useState } from "react"

export default function AppAchievement({item}) {
    const noAchiev = "lock.svg"

    return (
        <div className="flex bg-stone-700 w-full m-auto p-5 gap-5 rounded-xs">
            <img src={item.unlocked ? item.icon : noAchiev} alt={item.title} className={`${item.unlocked ? "border-green-800" : "border-black bg-gray-500"} size-[80px] border-2  p-1`}/>
            <div className="grid">
                <h1>{item.title}</h1>
                <h3>{item.description}</h3>
                <p>{item.percent}% of people have this achievement.</p>
            </div>
        </div>
    )
}