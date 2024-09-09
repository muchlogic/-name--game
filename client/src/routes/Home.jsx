import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Home(){
    const [roomID, setroomID] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        

    }

    return(
        <>
        <nav>
            <Link to="/lobby">
            <button>
                Host Game
            </button>
            </Link>
        </nav>

        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="item" value={roomID} onChange={e => setroomID(e.target.value)}/>
                <button>Join Room</button>
            </form>
        </div>
        </>
    )
}